import { CardAurora, Divider,Sections } from '@components/atom';

import { Beam } from "@components/beam";
import React from "react";
import { useResponsive } from "@responsive/useResponsive";
const Term: React.FC = () => {
   const { config } = useResponsive();
  const termMaps = [
    {
      num: "50/50",
      label: "Payment",
      desc: "50% deposit to start, 50% on delivery. Bank transfer to Akmad Nudin.",
      'tl':'',
      'iconclass':'',
      'variant':'teal'
    },
    {
      num: "2x",
      label: "Revisions",
      desc: "Up to 2 minor revisions included. Major scope changes quoted separately.",
      'tl':'bg-rust',
      'iconclass':'text-rust',
      'variant':'rust'
    },
    {
      num: "14d",
      label: "Bug Warranty",
      desc: "14 days post-handover for bug fixes within the delivered code.",
      'tl':'bg-bt-primary',
      'iconclass':'text-bt-primary',
      'variant':'dual'
    },
    {
      num: "©",
      label: "Ownership",
      desc: "Full source code ownership transfers to you upon final payment.",
      'tl':'bg-string',
      'iconclass':'text-string',
      'variant':'rust'
    },
  ];
   type BeamVariant = React.ComponentProps<typeof Beam>["variant"];
  return (
    <Sections id="terms-section"  className={`service ${config.section.service}`}>
       <div
          className={`section-tag reveal justify-center ${config.section.tag}`}>
          <span className={`section-tag-icon ${config.section.icon}`}>📩</span>
          <span className={`section-tag-text ${config.section.text}`}>
            policy
          </span>
          <span className="section-tag-line"></span>
        </div>
         <h2 className={`contact-big ${config.contact.big}`}>
          Terms & <span className="text-rust!">Conditions</span>
        </h2>
      <div className={`terms-grid ${config.term.box}`}>
        {termMaps.map((tmp, i) => (
           <Beam classBeam='rounded-[16px] w-full!' key={i} variant={tmp.variant as BeamVariant} radius={16}>
            <CardAurora card={`term ${config.term.terms}`} tl={tmp.tl} iconclass={tmp.iconclass} icon={`[${tmp.num}]`} title={tmp.label} desc={tmp.desc}/>
          </Beam>
        ))}
      </div>
      <Divider/>
    </Sections>
  );
};

export default Term;
