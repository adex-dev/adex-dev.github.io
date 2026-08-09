import { Sections } from "@components/atom";
import type { TestimonialInterface } from "@components/types/Interface";
import { useResponsive } from "@responsive/useResponsive";
import { supabase } from "@utils/supabase";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
const Testimonials: React.FC = () => {
  const { config } = useResponsive();
  const [testimonialList, setTestimonialList] = useState<
    TestimonialInterface[]
  >([]);
  //   const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const fetchData = async () => {
    try {
      const [testimonials] = await Promise.all([
        supabase.from("testimonials").select("*"),
      ]);

      if (testimonials.error) throw testimonials.error;

      setTestimonialList((testimonials.data ?? []) as TestimonialInterface[]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Sections
      id='testimonial'
      className={`default-section ${config.section.default} h-[60vh]!`}
    >
      <div className={`section-tag`}>
        <span className='section-tag-icon'>🤝</span>
        <span className={`section-tag-text`}>Testimonials</span>
        <span className='section-tag-line'></span>
      </div>
      <h2 className={config.standard.header}>What Clients Say</h2>
      <p className={config.standard.desc}>
        Feedback from people I've worked with directly — in their own words.
      </p>

      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container '>
          {[...testimonialList]
            .sort((t, l) => l.id - t.id)
            .map((ts) => (
              <div
                key={ts.id}
                className={`embla__slide ${config.standard.slide}`}
              >
                <div className={`testimonial-card group ${ts.types}`}>
                  <div
                    className={`testimonial-quote `}
                    dangerouslySetInnerHTML={{ __html: `"${ts.quote}"` }}
                  />
                  <div className={`testimonial-author`}>
                    <div className={`author-avatar`}>{ts.avatar}</div>
                    <div>
                      <div className={`author-name`}>{ts.name}</div>
                      <div className={`author-role`}>{ts.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='embla'>
        <button className='embla-arrow' onClick={() => emblaApi?.scrollPrev()}>
          ‹
        </button>
        <button className='embla-arrow' onClick={() => emblaApi?.scrollNext()}>
          ›
        </button>
      </div>
    </Sections>
  );
};
export default Testimonials;
