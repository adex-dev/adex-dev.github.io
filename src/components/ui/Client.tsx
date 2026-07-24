import { CardGlass, Sections, Divider } from "@components/atom";
import { Beam } from "@components/beam";
import type {
  ClientInterface,
  TestimonialInterface,
  TimelineInterface,
} from "@components/types/Interface";
import clientdata from "@data/client.json";
import testimonialData from "@data/testimonial.json";
import timelineData from "@data/timeline.json";
import React, { useState } from "react";
const Client: React.FC = () => {
  const clientList = clientdata as ClientInterface[];
  const testimonialList = testimonialData as TestimonialInterface[];
  const timelineList = timelineData as TimelineInterface[];
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <>
      <Sections id="clients" className="">
        <div className="card-box before:grid-bg bg-primary">
          <div className="card-eyebrow">Client Portfolio</div>
          <h2 className="card-title">Freelance & Contract Work</h2>
          <p className="card-sub">
            Each engagement below represents a real production system — built,
            deployed, and maintained for active business use.
          </p>
        </div>

        <div className="clients-grid">
          {[...clientList]
            .sort((a, b) => b.id - a.id)
            .map((cc, cci) => (
              <CardGlass key={cci} className='glass-client'>
                <div className={`cc ${cc.color}-accent`}>
                  <div className={`cc-logo ${cc.color}`}>
                    {cc.logotype === "text" ? (
                      <span className="uppercase">{cc.logo}</span>
                    ) : (
                      <img src={cc.logo} alt={cc.company} />
                    )}
                  </div>
                  <div className="card-name capitalize!">{cc.company}</div>
                  <div className="cc-industry">{cc.industry}</div>
                  <div
                    className="card-desc mb-5!"
                    dangerouslySetInnerHTML={{ __html: cc.desc }}
                  />
                  <div className="cc-built">
                    <div className="cc-built-label">{cc.buildlabel}</div>
                    <div className="card-stack cc-built-items">
                      {cc.builditem.map((bt, ib) => (
                        <span
                          key={ib}
                          className={`tag uppercase ${bt.tagcolor}`}>
                          {bt.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="cc-result">
                    <span className="cc-result-icon">{cc.resulticon}</span>
                    <span className="cc-result-text">
                      {cc.resulttext.length > 0 && (
                        <>
                          <strong>{cc.resulttext[0].strong}</strong>{" "}
                          {cc.resulttext[0].normal}
                        </>
                      )}
                    </span>
                  </div>
                  <Divider />
                  <div className="cc-footer">
                    <span className="cc-year">{cc.year}</span>
                    <span className={`cc-status ${cc.status} capitalize`}>
                      {cc.status}
                    </span>
                  </div>
                </div>
              </CardGlass>
            ))}
        </div>
      </Sections>
      <Sections id="testimonials" className="relative bg-surface">
        <div className="card-eyebrow mb-2!">Testimonials</div>
        <h2 className="card-title">What Clients Say</h2>
        <p className="card-sub">
          Feedback from people I've worked with directly — in their own words.
        </p>
        <div className="testimonials-grid">
          {[...testimonialList]
            .sort((t, l) => l.id - t.id)
            .map((ts) => (
              <div key={ts.id} className={`tcard ${ts.variant}`}>
                <div
                  className="tcard-quote"
                  dangerouslySetInnerHTML={{ __html: `"${ts.quote}"` }}
                />
                <div className="tcard-author">
                  <div className="tcard-avatar uppercase">{ts.avatar}</div>
                  <div>
                    <div className="tcard-name capitalize">{ts.name}</div>
                    <div className="tcard-role capitalize">{ts.role}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Sections>
      <Sections id="timeline">
        <div className="card-box before:grid-bg bg-primary">
          <span className="card-eyebrow">Engagement Process</span>
          <h2 className="card-title mb-3!">How We Work Together</h2>
          <p className="card-sub">
            From first message to live system — a straightforward process with
            no surprises.
          </p>
        </div>
        <div className="timeline">
          {[...timelineList].map((tl) => (
            <div key={tl.id.toString()} className="tl-item">
              <Beam
                key={tl.id.toString()}
                variant="dual"
                radius={50}
                classBeam="rounded-full!"
                className={hoveredId === tl.id ? "beam-active" : ""}>
                <div className="tl-dot">
                  <span className="absolute">{tl.dot}</span>
                </div>
              </Beam>
              <div
                className="tl-content"
                onMouseEnter={() => setHoveredId(tl.id)}
                onMouseLeave={() => setHoveredId(null)}>
                <div className="tl-label uppercase">{tl.label}</div>
                <div className="tl-title capitalize">{tl.title}</div>
                <div
                  className="tl-desc"
                  dangerouslySetInnerHTML={{ __html: tl.desc }}
                />
              </div>
            </div>
          ))}
        </div>
      </Sections>
    </>
  );
};
export default Client;
