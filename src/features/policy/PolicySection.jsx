import { policySections } from "../placement/data";

export default function PolicySection({ onDownload }) {
  return (
    <section className="panel-stack">
      <article className="content-card">
        <div className="section-head">
          <div>
            <h2>Privacy Policy</h2>
            <p>The current demo keeps student data inside the browser only.</p>
          </div>
          <button className="ghost-button" type="button" onClick={onDownload}>
            Download Policy
          </button>
        </div>

        <div className="policy-stack">
          {policySections.map((section) => (
            <article key={section.title} className="policy-block">
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </article>

      <div className="dual-grid">
        <article className="content-card">
          <h2>Compliance Checklist</h2>
          <div className="checklist">
            <div>Student consent captured for profile data</div>
            <div>Placement policy visible before applying</div>
            <div>Application history retained for reporting</div>
            <div>Recommended production controls documented</div>
          </div>
        </article>
        <article className="content-card">
          <h2>Production Recommendations</h2>
          <p className="muted">
            If you want to take this beyond a frontend demo, the next step is a backend
            with RBAC, secure file uploads, email notifications, and reporting exports.
          </p>
        </article>
      </div>
    </section>
  );
}
