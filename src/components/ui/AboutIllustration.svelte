<script lang="ts">
  export let ctaHovered = false;

  function faceTracking(node: HTMLElement, initialCtaHover: boolean) {
    const left = node.querySelector<SVGEllipseElement>('[data-eye="left"]');
    const right = node.querySelector<SVGEllipseElement>('[data-eye="right"]');
    const mouth = node.querySelector<SVGPathElement>('[data-mouth]');
    const current = { left: { x: 120, y: 50 }, right: { x: 140, y: 50 }, mouth: { leftY: 62, centerY: 70, rightY: 62 } };
    const target = { left: { ...current.left }, right: { ...current.right }, mouth: { ...current.mouth } };
    let buttonHovered = initialCtaHover;
    const lerp = (from: number, to: number) => from + (to - from) * 0.12;
    let frame = 0;

    const animate = () => {
      current.left.x = lerp(current.left.x, target.left.x);
      current.left.y = lerp(current.left.y, target.left.y);
      current.right.x = lerp(current.right.x, target.right.x);
      current.right.y = lerp(current.right.y, target.right.y);
      current.mouth.leftY = lerp(current.mouth.leftY, target.mouth.leftY);
      current.mouth.centerY = lerp(current.mouth.centerY, target.mouth.centerY);
      current.mouth.rightY = lerp(current.mouth.rightY, target.mouth.rightY);
      left?.setAttribute('cx', String(current.left.x));
      left?.setAttribute('cy', String(current.left.y));
      right?.setAttribute('cx', String(current.right.x));
      right?.setAttribute('cy', String(current.right.y));
      mouth?.setAttribute('d', `M 120 ${current.mouth.leftY} Q 130 ${current.mouth.centerY} 140 ${current.mouth.rightY}`);
      frame = requestAnimationFrame(animate);
    };

    const onMove = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      let dx = ((event.clientX - bounds.left) / bounds.width) * 240 - 130;
      let dy = ((event.clientY - bounds.top) / bounds.height) * 100 - 50;
      const distance = Math.hypot(dx, dy);
      if (distance) { dx /= distance; dy /= distance; }
      target.left = { x: 120 + dx * 3, y: 50 + dy * 3 };
      target.right = { x: 140 + dx * 3, y: 50 + dy * 3 };
    };
    const onEnter = () => { target.mouth = { leftY: 62, centerY: 70, rightY: 62 }; };
    const onLeave = () => {
      target.left = { x: 120, y: 50 };
      target.right = { x: 140, y: 50 };
      target.mouth = { leftY: 63, centerY: 61, rightY: 63 };
    };
    const setButtonMood = (hovered: boolean) => {
      buttonHovered = hovered;
      target.left = hovered ? { x: 122, y: 51 } : { x: 120, y: 50 };
      target.right = hovered ? { x: 142, y: 51 } : { x: 140, y: 50 };
      target.mouth = hovered ? { leftY: 62, centerY: 70, rightY: 62 } : { leftY: 63, centerY: 61, rightY: 63 };
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerenter', onEnter);
    node.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(animate);
    if (buttonHovered) setButtonMood(true);
    return {
      update(nextCtaHover: boolean) {
        if (nextCtaHover !== buttonHovered) setButtonMood(nextCtaHover);
      },
      destroy() {
        cancelAnimationFrame(frame);
        node.removeEventListener('pointermove', onMove);
        node.removeEventListener('pointerenter', onEnter);
        node.removeEventListener('pointerleave', onLeave);
      },
    };
  }
</script>

<div class="avatar" use:faceTracking={ctaHovered} aria-label="Animated illustration of a developer working at a computer">
<svg
              width="260"
              height="300"
              viewBox="0 0 260 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect width="260" height="300" fill="#161D2F" />
              <rect
                x="20"
                y="220"
                width="220"
                height="12"
                rx="3"
                fill="#1F2D45"
              />
              <rect
                x="115"
                y="192"
                width="30"
                height="30"
                rx="2"
                fill="#1F2D45"
              />
              <rect
                x="60"
                y="130"
                width="140"
                height="90"
                rx="6"
                fill="#0B0F1A"
                stroke="#1F2D45"
                stroke-width="2"
              />
              <rect
                x="68"
                y="138"
                width="124"
                height="74"
                rx="3"
                fill="#111827"
              />
              <rect
                x="76"
                y="148"
                width="50"
                height="4"
                rx="2"
                fill="#C85E3A"
                opacity="0.8"
              />
              <rect
                x="132"
                y="148"
                width="30"
                height="4"
                rx="2"
                fill="#2DD4BF"
                opacity="0.6"
              />
              <rect
                x="80"
                y="158"
                width="70"
                height="4"
                rx="2"
                fill="#8B98B0"
                opacity="0.5"
              />
              <rect
                x="76"
                y="168"
                width="40"
                height="4"
                rx="2"
                fill="#2DD4BF"
                opacity="0.8"
              />
              <rect
                x="122"
                y="168"
                width="50"
                height="4"
                rx="2"
                fill="#C85E3A"
                opacity="0.5"
              />
              <rect
                x="80"
                y="178"
                width="60"
                height="4"
                rx="2"
                fill="#8B98B0"
                opacity="0.4"
              />
              <rect
                x="76"
                y="188"
                width="45"
                height="4"
                rx="2"
                fill="#2DD4BF"
                opacity="0.6"
              />
              <rect
                x="70"
                y="234"
                width="120"
                height="18"
                rx="3"
                fill="#1F2D45"
              />
              <rect
                x="76"
                y="238"
                width="14"
                height="6"
                rx="1"
                fill="#0B0F1A"
              />
              <rect
                x="94"
                y="238"
                width="14"
                height="6"
                rx="1"
                fill="#0B0F1A"
              />
              <rect
                x="112"
                y="238"
                width="14"
                height="6"
                rx="1"
                fill="#0B0F1A"
              />
              <rect
                x="130"
                y="238"
                width="14"
                height="6"
                rx="1"
                fill="#0B0F1A"
              />
              <rect
                x="148"
                y="238"
                width="14"
                height="6"
                rx="1"
                fill="#0B0F1A"
              />
              <rect
                x="80"
                y="246"
                width="100"
                height="4"
                rx="1"
                fill="#0B0F1A"
              />
              <rect
                x="100"
                y="60"
                width="60"
                height="75"
                rx="8"
                fill="#1F2D45"
                stroke="#2D3B55"
                stroke-width="1.5"
              />
              <ellipse cx="130" cy="52" rx="28" ry="30" fill="#D4A574" />
              <ellipse cx="130" cy="30" rx="28" ry="15" fill="#2C1810" />
              <rect
                x="102"
                y="22"
                width="56"
                height="20"
                rx="8"
                fill="#2C1810"
              />
              <ellipse cx="102" cy="52" rx="6" ry="8" fill="#C49060" />
              <ellipse cx="158" cy="52" rx="6" ry="8" fill="#C49060" />
              <ellipse cx="120" cy="50" rx="5" ry="6" fill="white" />
              <ellipse cx="140" cy="50" rx="5" ry="6" fill="white" />
              <ellipse
                data-eye="left"
                cx="120"
                cy="50"
                rx="3"
                ry="3.5"
                fill="#2C1810"
              />
              <ellipse
                data-eye="right"
                cx="140"
                cy="50"
                rx="3"
                ry="3.5"
                fill="#2C1810"
              />
              <rect
                x="112"
                y="44"
                width="16"
                height="13"
                rx="4"
                fill="none"
                stroke="#2DD4BF"
                stroke-width="1.5"
              />
              <rect
                x="132"
                y="44"
                width="16"
                height="13"
                rx="4"
                fill="none"
                stroke="#2DD4BF"
                stroke-width="1.5"
              />
              <line
                x1="128"
                y1="50"
                x2="132"
                y2="50"
                stroke="#2DD4BF"
                stroke-width="1.5"
              />
              <line
                x1="112"
                y1="50"
                x2="108"
                y2="48"
                stroke="#2DD4BF"
                stroke-width="1.5"
              />
              <line
                x1="148"
                y1="50"
                x2="152"
                y2="48"
                stroke="#2DD4BF"
                stroke-width="1.5"
              />
              <path
                data-mouth="true"
                d="M 120 62 Q 130 70 140 62"
                stroke="#8B5E3C"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
              />
              <path
                d="M 90 130 L 85 95 Q 100 85 130 83 Q 160 85 175 95 L 170 130 Z"
                fill="#1F3864"
              />
              <circle
                cx="130"
                cy="108"
                r="8"
                fill="none"
                stroke="#C85E3A"
                stroke-width="1.5"
              />
              <text
                x="126"
                y="112"
                font-family="monospace"
                font-size="8"
                fill="#C85E3A">
                ⚙
              </text>
              <path
                d="M 85 95 L 72 125 Q 68 130 75 132 L 92 115 Z"
                fill="#1F3864"
              />
              <path
                d="M 175 95 L 188 125 Q 192 130 185 132 L 168 115 Z"
                fill="#1F3864"
              />
              <ellipse cx="76" cy="133" rx="9" ry="7" fill="#D4A574" />
              <ellipse cx="184" cy="133" rx="9" ry="7" fill="#D4A574" />
              <rect
                x="196"
                y="210"
                width="24"
                height="26"
                rx="3"
                fill="#C85E3A"
              />
              <path
                d="M 220 218 Q 228 218 228 223 Q 228 228 220 228"
                stroke="#8A3D22"
                stroke-width="2"
                fill="none"
              />
              <rect
                x="200"
                y="206"
                width="16"
                height="4"
                rx="1"
                fill="#8A3D22"
              />
              <path
                d="M 204 202 Q 206 196 204 190"
                stroke="#8B98B0"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                opacity="0.5"
              />
              <path
                d="M 210 200 Q 212 194 210 188"
                stroke="#8B98B0"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                opacity="0.4"
              />
              <text
                x="20"
                y="80"
                font-family="monospace"
                font-size="11"
                fill="#C85E3A"
                opacity="0.6">
                fn()
              </text>
              <text
                x="210"
                y="70"
                font-family="monospace"
                font-size="10"
                fill="#2DD4BF"
                opacity="0.6">
                {'{}'}
              </text>
              <text
                x="15"
                y="170"
                font-family="monospace"
                font-size="9"
                fill="#2DD4BF"
                opacity="0.4">
                async
              </text>
              <text
                x="218"
                y="160"
                font-family="monospace"
                font-size="9"
                fill="#C85E3A"
                opacity="0.4">
                ⚡
              </text>
            </svg>
</div>
