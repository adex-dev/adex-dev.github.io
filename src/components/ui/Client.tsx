import { CardGlass, Divider, Sections } from "@components/atom";
import { Beam } from "@components/beam";
import useEmblaCarousel from "embla-carousel-react";
import { useResponsive } from "@responsive/useResponsive";
import type {
  ClientInterface,
  TestimonialInterface,
  TimelineInterface,
} from "@components/types/Interface";
import React, { useState, useEffect } from "react";
import { supabase } from "@utils/supabase";
const Client: React.FC = () => {
  const { config } = useResponsive();
  const [clientList, setClientList] = useState<ClientInterface[]>([]);
  const [timelineList, setTimelineList] = useState<TimelineInterface[]>([]);
  const [testimonialList, setTestimonialList] = useState<
    TestimonialInterface[]
  >([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const fetchData = async () => {
    try {
      const [clients, testimonials, timelineList] = await Promise.all([
        supabase.rpc<ClientInterface[]>("get_clients"),
        supabase.from("testimonials").select("*"),
        supabase.from("timelines").select("*"),
      ]);

      if (clients.error) throw clients.error;
      if (testimonials.error) throw testimonials.error;
      if (timelineList.error) throw timelineList.error;

      setClientList(clients.data ?? []);
      setTestimonialList((testimonials.data ?? []) as TestimonialInterface[]);
      setTimelineList((timelineList.data ?? []) as TimelineInterface[]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Sections id="clients" className={config.section.client}>
        <div className="card-box before:grid-bg bg-primary">
          <div className={`eyebrow ${config.standard.eyebrow}`}>
            Client Portfolio
          </div>
          <h2 className={config.standard.header}>Freelance & Contract Work</h2>
          <p className={config.standard.desc}>
            Each engagement below represents a real production system — built,
            deployed, and maintained for active business use.
          </p>
        </div>

        <div className={`clients ${config.clients.box}`}>
          {clientList.map((cc) => {
            const stacks = cc.stacks.split(";");
            const colors = cc.stack_colors.split(";");

            return (
              <CardGlass key={cc.id} className="glass-client">
                <div className={`cc ${config.clients.cc} ${cc.color}-accent`}>
                  <div className={`cc-logo ${cc.color}`}>
                    {cc.is_logo ? (
                      <span className="uppercase">{cc.logo}</span>
                    ) : (
                      <img src={cc.logo} alt={cc.company} />
                    )}
                  </div>
                  <div className={`capitalize! ${config.standard.header}`}>
                    {cc.company}
                  </div>
                  <div className={`cc-industry ${config.clients.industry}`}>
                    {cc.industry}
                  </div>
                  <div
                    className={config.standard.desc}
                    dangerouslySetInnerHTML={{ __html: cc.desc }}
                  />
                  <div className="cc-built">
                    <div className={config.services.label}>{cc.labels}</div>
                    <div className={`card-stack ${config.standard.stack} mt-2`}>
                      {stacks.map((stack, ib) => (
                        <span
                          key={ib}
                          className={`tag uppercase ${colors[ib]}`}>
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`cc-result ${config.clients.result}`}>
                    <span className={`icon ${config.standard.icon}`}>
                      {cc.icon}
                    </span>
                    <span className={`cc-built-label ${config.clients.label}`}>
                      {cc.strongs && (
                        <>
                          <strong>{cc.strongs}</strong> {cc.normals}
                        </>
                      )}
                    </span>
                  </div>
                  <Divider />
                  <div className="cc-footer">
                    <span className="cc-year">{cc.period}</span>
                    <span className={`cc-status ${cc.status} capitalize`}>
                      {cc.status}
                    </span>
                  </div>
                </div>
              </CardGlass>
            );
          })}
        </div>
      </Sections>
      <Sections
        id="testimonials"
        className={` relative ${config.section.client}`}>
        <div className={`eyebrow ${config.standard.eyebrow}`}>Testimonials</div>
        <h2 className={config.standard.header}>What Clients Say</h2>
        <p className={config.standard.desc}>
          Feedback from people I've worked with directly — in their own words.
        </p>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container ">
            {[...testimonialList]
              .sort((t, l) => l.id - t.id)
              .map((ts) => (
                <div
                  key={ts.id}
                  className={`embla__slide ${config.standard.slide}`}>
                  <div className={`tcard ${config.clients.tcard} ${ts.types}`}>
                    <div
                      className={`tcard-quote ${config.clients.quote}`}
                      dangerouslySetInnerHTML={{ __html: `"${ts.quote}"` }}
                    />
                    <div className={`tcard-author`}>
                      <div
                        className={`tcard-avatar uppercase ${config.clients.avatar}`}>
                        {ts.avatar}
                      </div>
                      <div>
                        <div
                          className={`tcard-name capitalize ${config.clients.name}`}>
                          {ts.name}
                        </div>
                        <div
                          className={`tcard-role capitalize ${config.clients.role}`}>
                          {ts.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="embla">
          <button className="embla-btn" onClick={() => emblaApi?.scrollPrev()}>
            ←
          </button>
          <button className="embla-btn" onClick={() => emblaApi?.scrollNext()}>
            →
          </button>
        </div>
      </Sections>
      <Sections id="timeline" className={` relative ${config.section.client}`}>
        <div className="card-box before:grid-bg bg-primary">
          <span className={`eyebrow ${config.standard.eyebrow}`}>
            Engagement Process
          </span>
          <h2 className={`${config.standard.header} mb-3!`}>
            How We Work Together
          </h2>
          <p className={config.standard.desc}>
            From first message to live system — a straightforward process with
            no surprises.
          </p>
        </div>
        <div className="timeline">
          {[...timelineList].map((tl) => (
            <div
              key={tl.id.toString()}
              className={`tl-item ${config.clients.tlItem}`}>
              <Beam
                key={tl.id.toString()}
                variant="dual"
                radius={50}
                classBeam="rounded-full!"
                className={hoveredId === tl.id ? "beam-active" : ""}>
                <div className={`tl-dot ${config.clients.tlDot}`}>
                  <span className="absolute">{tl.dot}</span>
                </div>
              </Beam>
              <div
                className={`tl-content ${config.clients.tlContent}`}
                onMouseEnter={() => setHoveredId(tl.id)}
                onMouseLeave={() => setHoveredId(null)}>
                <div className={`tl-label uppercase ${config.clients.tlLabel}`}>
                  {tl.labels}
                </div>
                <div
                  className={`tl-title capitalize ${config.standard.header}`}>
                  {tl.name}
                </div>
                <div
                  className={config.standard.desc}
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
