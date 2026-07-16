import React from "react";
import clients from "@data/client.json";
import type { ClientInterface } from "@types/client";
import { Beam } from "@components/beam";
const Client: React.FC = () => {
  const clientList = clients as ClientInterface[];
  return (
    <section id="clients" className="bg-primary!">
      <div className="section-eyebrow">Client Portfolio</div>
      <h2 className="section-title">Freelance & Contract Work</h2>
      <p className="section-sub">
        Each engagement below represents a real production system — built,
        deployed, and maintained for active business use.
      </p>

      <div className="clients-grid">
        {[...clientList]
          .sort((a, b) => b.id - a.id)
          .map((cc) => (
            <Beam  key={cc.id} variant={cc.color} radius={0}>
            <div
              className={`cc ${cc.color}-accent beam ${cc.animation}`}>
              <div className={`cc-logo ${cc.color}`}>
                {cc.logotype === "text" ? (
                  <span className="uppercase">{cc.logo}</span>
                ) : (
                  <img src={cc.logo} alt={cc.company} />
                )}
              </div>
              <div className="cc-name capitalize">{cc.company}</div>
              <div className="cc-industry capitalize">{cc.industry}</div>
              <div
                className="cc-desc"
                dangerouslySetInnerHTML={{ __html: cc.desc }}
              />
              <div className="cc-built">
                <div className="cc-built-label capitalize">{cc.buildlabel}</div>
                <div className="cc-built-items">
                  {cc.builditem.map((bt, ib) => (
                    <span key={ib} className={`tag uppercase ${bt.tagcolor}`}>
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
              <div className="cc-footer">
                <span className="cc-year">{cc.year}</span>
                <span className={`cc-status ${cc.status} capitalize`}>{cc.status}</span>
              </div>
            </div>
            </Beam>
          ))}
      </div>
    </section>
  );
};
export default Client;
