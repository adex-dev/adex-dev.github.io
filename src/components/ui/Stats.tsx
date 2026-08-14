import { useResponsive } from "@responsive/useResponsive";
import React, { useEffect, useRef } from "react";

const stats = [
  {
    value: "6",
    label: "Years Experience",
    operator: "+",
    color: "stat-item--cyan",
    bg: "#38bdf8",
  },
  {
    value: "10",
    label: "Systems Delivered",
    operator: "+",
    color: "stat-item--orange",
    bg: "#f97316",
  },
  {
    value: "30",
    label: "HR Workload Reduced",
    operator: "%",
    color: "stat-item--teal",
    bg: "#2dd4bf",
  },
  {
    value: "15",
    label: "Load Time Improved",
    operator: "%",
    color: "stat-item--purple",
    bg: "#a78bfa",
  },
];

const Stats: React.FC = () => {
  const { config } = useResponsive();
  const previous = new Date("2019-12-25");
  const dateNow = new Date();

  let years = dateNow.getFullYear() - previous.getFullYear();

  const hasPassedAnniversary =
    dateNow.getMonth() > previous.getMonth() ||
    (dateNow.getMonth() === previous.getMonth() &&
      dateNow.getDate() >= previous.getDate());

  if (!hasPassedAnniversary) {
    years--;
  }
  const statsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statsGrid = statsGridRef.current;
    if (!statsGrid) return;

    // ============ STATS ANIMATION ============
    const animateCount = (el: HTMLElement, target: number, duration: number) => {
      const start = 0;
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * ease);
        el.textContent = String(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = String(target);
        }
      };

      requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const digits = statsGrid.querySelectorAll<HTMLElement>('.digit');
            digits.forEach((digit, index) => {
              const target = parseInt(digit.dataset.count || '0', 10);
              setTimeout(() => {
                animateCount(digit, target, 1800);
              }, index * 200);
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statsObserver.observe(statsGrid);

    // ============ REVEAL ANIMATION ============
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with .reveal class
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    // ============ CLEANUP ============
    return () => {
      statsObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className={`stats-grid reveal reveal-delay-3 ${config.stats.box}`} ref={statsGridRef}>
      {stats.map((stat, index) => (
        <div key={index} className={`stat-item ${config.stats.items} ${stat.color}`}>
          {/* <div className={`${config.stats.glow} bg-[${stat.bg}]`}></div> */}
          <div style={{ color: stat.bg }} className={`stat-number ${config.stats.number}`}>
            <span className='digit' data-count={stat.value}>
              0
            </span>
            <span style={{ color: stat.bg }} className='suffix'>
              {stat.operator}
            </span>
          </div>
          <div className={`stat-label`}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
