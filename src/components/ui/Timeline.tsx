import { Sections } from "@components/atom";
import RevealSection from "@components/atom/RevealSection";
import { Beam } from "@components/beam";
import type { TimelineInterface } from "@components/types/Interface";
import { useResponsive } from "@responsive/useResponsive";
import { useState } from "react";
import RichText from "@components/atom/RichText";
interface TimelineProps {
  initialTimeline: TimelineInterface[];
}
const Timeline: React.FC<TimelineProps> = ({
initialTimeline
}) => {
  const timelineList = initialTimeline;
  const { config } = useResponsive();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <Sections
      id='process'
      className={`default-section ${config.section.default}`}
    >
      <div className={`section-tag`}>
        <span className={`section-tag-text`}>Project engagement</span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={config.standard.header}>
        A clear process,
        <br />
        <span className='highlight'>from scope to handover</span>
      </h2>{" "}
      <p className={`${config.standard.desc} ${config.standard.timelineSubtitle} timeline-SubTitle`}>
        We agree on goals, scope, timeline, and cost before implementation.
        Progress updates keep decisions visible through delivery and handover.
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
              <RichText className='tl-desc' content={item.desc} />
            </div>
          </div>
        ))}
      </div>
      </RevealSection>
    </Sections>
  );
};
export default Timeline;
