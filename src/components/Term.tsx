import React from "react";

const Term: React.FC = () => {
  const termMaps = [
    {
      num: "50/50",
      label: "Payment",
      desc: "50% deposit to start, 50% on delivery. Bank transfer to Akmad Nudin.",
    },
    {
      num: "2x",
      label: "Revisions",
      desc: "Up to 2 minor revisions included. Major scope changes quoted separately.",
    },
    {
      num: "14d",
      label: "Bug Warranty",
      desc: "14 days post-handover for bug fixes within the delivered code.",
    },
    {
      num: "©",
      label: "Ownership",
      desc: "Full source code ownership transfers to you upon final payment.",
    },
  ];
  return (
    <section id='terms-section'>
      <div className='section-eyebrow'>Terms & Conditions</div>
      <div className='terms-grid'>
        {termMaps.map((tmp, i) => (
          <div key={i} className='term-item beam beam-slow'>
            <div className='term-icon'>[{tmp.num}]</div>
            <div className='term-title'>{tmp.label}</div>
            <div className='term-desc'>
              {tmp.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Term;
