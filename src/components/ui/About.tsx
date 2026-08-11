import { Sections } from "@components/atom";
import { useResponsive } from "@responsive/useResponsive";
import React, { useEffect, useRef } from "react";

const About: React.FC = () => {
  const { config } = useResponsive();
  const svgRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<number | null>(null);

  const current = useRef({
    left: { x: 120, y: 50 },
    right: { x: 140, y: 50 },
    mouth: {
      leftY: 62,
      centerY: 70,
      rightY: 62,
    },
  });

  const target = useRef({
    left: { x: 120, y: 50 },
    right: { x: 140, y: 50 },
    mouth: {
      leftY: 62,
      centerY: 70,
      rightY: 62,
    },
  });

  useEffect(() => {
    const animate = () => {
      const lerp = (current: any, target: any, speed = 0.12) => {
        return current + (target - current) * speed;
      };

      current.current.left.x = lerp(
        current.current.left.x,
        target.current.left.x,
      );

      current.current.left.y = lerp(
        current.current.left.y,
        target.current.left.y,
      );

      current.current.right.x = lerp(
        current.current.right.x,
        target.current.right.x,
      );

      current.current.right.y = lerp(
        current.current.right.y,
        target.current.right.y,
      );
      current.current.mouth.leftY = lerp(
        current.current.mouth.leftY,
        target.current.mouth.leftY,
      );

      current.current.mouth.centerY = lerp(
        current.current.mouth.centerY,
        target.current.mouth.centerY,
      );

      current.current.mouth.rightY = lerp(
        current.current.mouth.rightY,
        target.current.mouth.rightY,
      );

      if (leftEyeRef.current) {
        leftEyeRef.current.setAttribute("cx", `${current.current.left.x}`);

        leftEyeRef.current.setAttribute("cy", `${current.current.left.y}`);
      }

      if (rightEyeRef.current) {
        rightEyeRef.current.setAttribute("cx", `${current.current.right.x}`);

        rightEyeRef.current.setAttribute("cy", `${current.current.right.y}`);
      }

      if (mouthRef.current) {
        const { leftY, centerY, rightY } = current.current.mouth;

        mouthRef.current.setAttribute(
          "d",
          `M 120 ${leftY} Q 130 ${centerY} 140 ${rightY}`,
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  const handleMouseMove = (e: any) => {
    const svg = svgRef.current;

    if (!svg) return;

    const rect = svg.getBoundingClientRect();

    // Posisi cursor relatif terhadap SVG
    const mouseX = ((e.clientX - rect.left) / rect.width) * 240;

    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    // Titik tengah wajah
    const centerX = 130;
    const centerY = 50;

    // Arah cursor
    let dx = mouseX - centerX;
    let dy = mouseY - centerY;

    // Normalisasi arah
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      dx /= distance;
      dy /= distance;
    }

    // Seberapa jauh mata boleh bergerak
    const maxMove = 3;

    target.current.left.x = 120 + dx * maxMove;
    target.current.left.y = 50 + dy * maxMove;

    target.current.right.x = 140 + dx * maxMove;
    target.current.right.y = 50 + dy * maxMove;
  };

  const handleMouseLeave = () => {
    // Kembali ke posisi awal
    target.current.left = {
      x: 120,
      y: 50,
    };

    target.current.right = {
      x: 140,
      y: 50,
    };
    target.current.mouth = {
      leftY: 63,
      centerY: 61,
      rightY: 63,
    };
  };
  const handleMouseEnter = () => {
    target.current.mouth = {
      leftY: 62,
      centerY: 70,
      rightY: 62,
    };
  };
  const handleButtonEnter = () => {
    target.current.left.x = 122;
    target.current.left.y = 51;

    target.current.right.x = 142;
    target.current.right.y = 51;
    target.current.mouth = {
      leftY: 62,
      centerY: 70,
      rightY: 62,
    };
  };

  const handleButtonLeave = () => {
    target.current.left = {
      x: 120,
      y: 50,
    };

    target.current.right = {
      x: 140,
      y: 50,
    };
    target.current.mouth = {
      leftY: 63,
      centerY: 61,
      rightY: 63,
    };
  };
  return (
    <Sections id='about' className={`about-section ${config.section.about}`}>
      <div className={`about-left`}>
        <div
          ref={svgRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`illustration-wrapper ${config.about.photoFrame}`}
        >
          <div className='avatar'>
            <svg
              width='260'
              height='300'
              viewBox='0 0 260 300'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='260' height='300' fill='#161D2F' />
              <rect
                x='20'
                y='220'
                width='220'
                height='12'
                rx='3'
                fill='#1F2D45'
              />
              <rect
                x='115'
                y='192'
                width='30'
                height='30'
                rx='2'
                fill='#1F2D45'
              />
              <rect
                x='60'
                y='130'
                width='140'
                height='90'
                rx='6'
                fill='#0B0F1A'
                stroke='#1F2D45'
                strokeWidth='2'
              />
              <rect
                x='68'
                y='138'
                width='124'
                height='74'
                rx='3'
                fill='#111827'
              />
              <rect
                x='76'
                y='148'
                width='50'
                height='4'
                rx='2'
                fill='#C85E3A'
                opacity='0.8'
              />
              <rect
                x='132'
                y='148'
                width='30'
                height='4'
                rx='2'
                fill='#2DD4BF'
                opacity='0.6'
              />
              <rect
                x='80'
                y='158'
                width='70'
                height='4'
                rx='2'
                fill='#8B98B0'
                opacity='0.5'
              />
              <rect
                x='76'
                y='168'
                width='40'
                height='4'
                rx='2'
                fill='#2DD4BF'
                opacity='0.8'
              />
              <rect
                x='122'
                y='168'
                width='50'
                height='4'
                rx='2'
                fill='#C85E3A'
                opacity='0.5'
              />
              <rect
                x='80'
                y='178'
                width='60'
                height='4'
                rx='2'
                fill='#8B98B0'
                opacity='0.4'
              />
              <rect
                x='76'
                y='188'
                width='45'
                height='4'
                rx='2'
                fill='#2DD4BF'
                opacity='0.6'
              />
              <rect
                x='70'
                y='234'
                width='120'
                height='18'
                rx='3'
                fill='#1F2D45'
              />
              <rect
                x='76'
                y='238'
                width='14'
                height='6'
                rx='1'
                fill='#0B0F1A'
              />
              <rect
                x='94'
                y='238'
                width='14'
                height='6'
                rx='1'
                fill='#0B0F1A'
              />
              <rect
                x='112'
                y='238'
                width='14'
                height='6'
                rx='1'
                fill='#0B0F1A'
              />
              <rect
                x='130'
                y='238'
                width='14'
                height='6'
                rx='1'
                fill='#0B0F1A'
              />
              <rect
                x='148'
                y='238'
                width='14'
                height='6'
                rx='1'
                fill='#0B0F1A'
              />
              <rect
                x='80'
                y='246'
                width='100'
                height='4'
                rx='1'
                fill='#0B0F1A'
              />
              <rect
                x='100'
                y='60'
                width='60'
                height='75'
                rx='8'
                fill='#1F2D45'
                stroke='#2D3B55'
                strokeWidth='1.5'
              />
              <ellipse cx='130' cy='52' rx='28' ry='30' fill='#D4A574' />
              <ellipse cx='130' cy='30' rx='28' ry='15' fill='#2C1810' />
              <rect
                x='102'
                y='22'
                width='56'
                height='20'
                rx='8'
                fill='#2C1810'
              />
              <ellipse cx='102' cy='52' rx='6' ry='8' fill='#C49060' />
              <ellipse cx='158' cy='52' rx='6' ry='8' fill='#C49060' />
              <ellipse cx='120' cy='50' rx='5' ry='6' fill='white' />
              <ellipse cx='140' cy='50' rx='5' ry='6' fill='white' />
              <ellipse
                ref={leftEyeRef}
                cx='120'
                cy='50'
                rx='3'
                ry='3.5'
                fill='#2C1810'
              />
              <ellipse
                ref={rightEyeRef}
                cx='140'
                cy='50'
                rx='3'
                ry='3.5'
                fill='#2C1810'
              />
              <rect
                x='112'
                y='44'
                width='16'
                height='13'
                rx='4'
                fill='none'
                stroke='#2DD4BF'
                strokeWidth='1.5'
              />
              <rect
                x='132'
                y='44'
                width='16'
                height='13'
                rx='4'
                fill='none'
                stroke='#2DD4BF'
                strokeWidth='1.5'
              />
              <line
                x1='128'
                y1='50'
                x2='132'
                y2='50'
                stroke='#2DD4BF'
                strokeWidth='1.5'
              />
              <line
                x1='112'
                y1='50'
                x2='108'
                y2='48'
                stroke='#2DD4BF'
                strokeWidth='1.5'
              />
              <line
                x1='148'
                y1='50'
                x2='152'
                y2='48'
                stroke='#2DD4BF'
                strokeWidth='1.5'
              />
              <path
                ref={mouthRef}
                d='M 120 62 Q 130 70 140 62'
                stroke='#8B5E3C'
                strokeWidth='1.5'
                fill='none'
                strokeLinecap='round'
              />
              <path
                d='M 90 130 L 85 95 Q 100 85 130 83 Q 160 85 175 95 L 170 130 Z'
                fill='#1F3864'
              />
              <circle
                cx='130'
                cy='108'
                r='8'
                fill='none'
                stroke='#C85E3A'
                strokeWidth='1.5'
              />
              <text
                x='126'
                y='112'
                fontFamily='monospace'
                fontSize='8'
                fill='#C85E3A'
              >
                ⚙
              </text>
              <path
                d='M 85 95 L 72 125 Q 68 130 75 132 L 92 115 Z'
                fill='#1F3864'
              />
              <path
                d='M 175 95 L 188 125 Q 192 130 185 132 L 168 115 Z'
                fill='#1F3864'
              />
              <ellipse cx='76' cy='133' rx='9' ry='7' fill='#D4A574' />
              <ellipse cx='184' cy='133' rx='9' ry='7' fill='#D4A574' />
              <rect
                x='196'
                y='210'
                width='24'
                height='26'
                rx='3'
                fill='#C85E3A'
              />
              <path
                d='M 220 218 Q 228 218 228 223 Q 228 228 220 228'
                stroke='#8A3D22'
                strokeWidth='2'
                fill='none'
              />
              <rect
                x='200'
                y='206'
                width='16'
                height='4'
                rx='1'
                fill='#8A3D22'
              />
              <path
                d='M 204 202 Q 206 196 204 190'
                stroke='#8B98B0'
                strokeWidth='1.5'
                fill='none'
                strokeLinecap='round'
                opacity='0.5'
              />
              <path
                d='M 210 200 Q 212 194 210 188'
                stroke='#8B98B0'
                strokeWidth='1.5'
                fill='none'
                strokeLinecap='round'
                opacity='0.4'
              />
              <text
                x='20'
                y='80'
                fontFamily='monospace'
                fontSize='11'
                fill='#C85E3A'
                opacity='0.6'
              >
                fn()
              </text>
              <text
                x='210'
                y='70'
                fontFamily='monospace'
                fontSize='10'
                fill='#2DD4BF'
                opacity='0.6'
              >
                {}
              </text>
              <text
                x='15'
                y='170'
                fontFamily='monospace'
                fontSize='9'
                fill='#2DD4BF'
                opacity='0.4'
              >
                async
              </text>
              <text
                x='218'
                y='160'
                fontFamily='monospace'
                fontSize='9'
                fill='#C85E3A'
                opacity='0.4'
              >
                ⚡
              </text>
            </svg>
          </div>
          <div className='corner-accent top-left'></div>
          <div className='corner-accent bottom-right'></div>
          <div className='about-badge'>
            <div className='about-badge-label'>Status</div>
            <div className='about-badge-val'>Open to work</div>
          </div>
        </div>
      </div>
      <div className={`about-right`}>
        <div className='section-tag'>
          <span className='section-tag-icon'>👤</span>
          <span className={`section-tag-text`}>About Me </span>
          <span className='section-tag-line'></span>
        </div>
        <h2 className={config.standard.header}>
          Engineer who ships,
          <br />
          <span className='highlight'>not just codes</span>
        </h2>
        <p className={`${config.standard.desc}`}>
          I'm Akmad Nudin, a <strong>Full Stack Engineer</strong> based in
          Indonesia with <span className='keyword'>5+ years</span> of experience
          building systems that run in production for real businesses — not just
          demos.
        </p>
        <p className={`${config.standard.desc}`}>
          I started my career as a Senior Programmer at{" "}
          <span className='keyword'>PT. Jaygee Group</span> in 2019, building{" "}
          <span className='tech-keyword'>attendance and web systems</span>. From
          there I grew into leading full product development —{" "}
          <span className='tech-keyword'>POS systems</span> for restaurants,{" "}
          <span className='tech-keyword'>HRIS</span> for HR automation, and
          real-time data pipelines across multi-branch companies. Today I work
          at <span className='keyword'>PT. Indobara Bahana</span> managing
          internal systems and{" "}
          <span className='tech-keyword'>Oracle NetSuite ERP</span> integration.
        </p>
        <p className={`${config.standard.desc}`}>
          Outside of work hours, I'm deep in{" "}
          <span className='tech-keyword'>Rust</span> and{" "}
          <span className='tech-keyword'>Axum</span> — building type-safe,
          performant REST APIs. That's the direction I'm deliberately heading
          next.
        </p>
        <div className='info-grid'>
          <div className='info-item'>
            <span className='info-bullet'></span>
            <span>Based in Indonesia</span>
          </div>
          <div className='info-item'>
            <span className='info-bullet'></span>
            <span>Available for remote freelance</span>
          </div>
          <div className='info-item'>
            <span className='info-bullet'></span>
            <span>Speaks Indonesian & English</span>
          </div>
          <div className='info-item'>
            <span className='info-bullet'></span>
            <span>Currently learning Rust/Axum</span>
          </div>
        </div>
        <a
          href='#contact'
          className='about-cta'
          ref={ctaRef}
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
        >
          See my track record
          <span className='about-cta-arrow'>→</span>
        </a>
      </div>
    </Sections>
  );
};

export default About;
