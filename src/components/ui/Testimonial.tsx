import { Sections } from "@components/atom";
import type { TestimonialInterface } from "@components/types/Interface";
import { useResponsive } from "@responsive/useResponsive";
import RichText from "@components/atom/RichText";
import useEmblaCarousel from "embla-carousel-react";
interface TestimonialProps {
  initialTestimonials: TestimonialInterface[];
}
const Testimonials: React.FC<TestimonialProps> = ({initialTestimonials}) => {
  const { config } = useResponsive();
  const testimonialList = initialTestimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  return (
    <Sections
      id='testimonial'
      className={`default-section ${config.section.default} h-[60vh]!`}
      role="region"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
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

      <div className={`embla__viewport  ${config.standard.viewport}`} ref={emblaRef}>
        <div className='embla__container '>
          {[...testimonialList]
            .sort((t, l) => l.id - t.id)
            .map((ts) => (
              <div
                key={ts.id}
                className={`embla__slide ${config.standard.slide}`}
                aria-roledescription="slide"
              >
                <div className={`testimonial-card group ${ts.types}`}>
                  <blockquote className="testimonial-quote">
                    <span aria-hidden="true">“</span>
                    <RichText content={ts.quote} />
                    <span aria-hidden="true">”</span>
                  </blockquote>
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
        <button type="button" aria-label="Previous testimonial" className='embla-arrow' onClick={() => emblaApi?.scrollPrev()}>
          ‹
        </button>
        <button type="button" aria-label="Next testimonial" className='embla-arrow' onClick={() => emblaApi?.scrollNext()}>
          ›
        </button>
      </div>
    </Sections>
  );
};
export default Testimonials;
