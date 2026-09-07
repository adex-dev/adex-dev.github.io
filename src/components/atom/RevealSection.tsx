
import { useRevealOnScroll } from '@hooks/useRevealOnScroll';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  selector?: string | string[];
  delay?: number;
}

const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  selector = '.reveal-item',
  delay = 0
}) => {
  const containerRef = useRevealOnScroll({
    selector,
    threshold,
    delay,
    className: 'visible'
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default RevealSection;

// Usage:
{/* <RevealSection selector=".service-card" threshold={0.2} delay={150}>
  <div className="service-card">Card 1</div>
  <div className="service-card">Card 2</div>
  <div className="service-card">Card 3</div>
</RevealSection> */}