import { Sections } from "@components/atom";
import RevealSection from "@components/atom/RevealSection";
import { Beam } from "@components/beam";
import type { TimelineInterface } from "@components/types/Interface";
import { useResponsive } from "@responsive/useResponsive";
import { useEffect, useState } from "react";
interface TimelineProps {
  initialTimeline: TimelineInterface[];
}
const Timeline: React.FC<TimelineProps> = ({
initialTimeline
}) => {
  const [timelineList, setTimelineList] = useState(initialTimeline);
  const { config } = useResponsive();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <Sections
      id='testimonial'
      className={`default-section ${config.section.default}`}
    >
      <div className={`section-tag`}>
        <span className={`section-tag-text`}>
          How I work & Engagement Process
        </span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={config.standard.header}>
        Clear steps,
        <br />
        <span className='highlight'>full transparency</span>
      </h2>{" "}
      <p className={`${config.standard.desc} ${config.standard.timelineSubtitle} timeline-SubTitle`}>
        Every project follows the same four phases — so you know exactly what's
        happening, what's next, and what it costs. I don't write a single line
        of code until we both agree on the scope.
      </p>
      <RevealSection selector='.timeline' threshold={0.2} delay={150}>
      <div className='timeline'>
        {[...timelineList].map((item, i) => (
          <div
            className={`tl-item group ${config.clients.tlItem}`}
            key={item.id}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Beam
              key={item.id.toString()}
              variant='rust'
              radius={50}
              classBeam={`rounded-full! `}
              className={hoveredId === item.id ? "beam-active border-0!" : ""}
            >
              <div className={`tl-dot ${hoveredId === item.id ? "border-0!" : ""} ${config.clients.tlDot}`}>
                <span className='absolute'>{item.dot}</span>
              </div>
            </Beam>
            <div
              className={`tl-content  ${config.clients.tlContent}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span className={`tl-label  ${config.clients.tlLabel}`}>{item.labels}</span>
              <h3 className='tl-title'>{item.name}</h3>
              <p
                className='tl-desc'
                dangerouslySetInnerHTML={{ __html: item.desc }}
              />
            </div>
          </div>
        ))}
      </div>
      </RevealSection>
    </Sections>
  );
};
export default Timeline;
