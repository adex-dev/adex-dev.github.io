import { useResponsive } from "@responsive/useResponsive";
export default function ComingSoon(){
      const { config } = useResponsive();
    return (
      <div className={`es-box ${config.cson.ebox}`}>
        <div className={`es-icon ${config.cson.eicon}`}>
          <svg viewBox="0 0 24 24">
            <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14.5 12l-2.5-2.5 2.7-3.2z" />
          </svg>
        </div>
        <div className={`es-eyebrow ${config.cson.ebrow}`}>
          <span className="es-dot"></span> COMING SOON
        </div>
        <h3 className={`es-title ${config.cson.etitle}`}>
          There are no projects <em>here yet.</em>
        </h3>
        <p className={`es-sub ${config.cson.esub}`}>
          This category is still under construction — related projects are being forged and will be featured on this page soon.
        </p>
      </div>
    );
};