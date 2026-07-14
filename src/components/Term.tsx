import React from "react";

const Term: React.FC = () => {
  return (
    <section id="terms-section">
      <div className="section-eyebrow">Terms & Conditions</div>
      <div className="terms-grid">
        <div className="term-item">
          <div className="term-icon">[50/50]</div>
          <div className="term-title">Payment</div>
          <div className="term-desc">
            50% deposit to start, 50% on delivery. Bank transfer to Akmad Nudin.
          </div>
        </div>
        <div className="term-item">
          <div className="term-icon">[2x]</div>
          <div className="term-title">Revisions</div>
          <div className="term-desc">
            Up to 2 minor revisions included. Major scope changes quoted
            separately.
          </div>
        </div>
        <div className="term-item beam-card rust-beam">
          <div className="term-icon">[14d]</div>
          <div className="term-title">Bug Warranty</div>
          <div className="term-desc">
            14 days post-handover for bug fixes within the delivered code.
          </div>
        </div>
        <div className="term-item">
          <div className="term-icon">[©]</div>
          <div className="term-title">Ownership</div>
          <div className="term-desc">
            Full source code ownership transfers to you upon final payment.
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Term;
