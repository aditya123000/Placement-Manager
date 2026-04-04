import { policySections } from "../placement/data";

export default function PolicySection({ onDownload }) {
  return (
    <section className="content-card">
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
    </section>
  );
}
