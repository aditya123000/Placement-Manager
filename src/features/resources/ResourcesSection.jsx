import { supportResources, techStack } from "../placement/data";

export default function ResourcesSection() {
  return (
    <section className="panel-stack">
      <div className="dual-grid">
        <article className="content-card">
          <div className="section-head">
            <div>
              <h2>Student Support Resources</h2>
              <p>Operational sections that strong portfolio projects usually include.</p>
            </div>
          </div>
          <div className="resource-stack">
            {supportResources.map((resource) => (
              <div key={resource.title} className="resource-card">
                <div>
                  <h3>{resource.title}</h3>
                  <p className="muted">{resource.description}</p>
                  <small>{resource.owner}</small>
                </div>
                <button className="ghost-button" type="button">
                  {resource.action}
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="content-card">
          <div className="section-head">
            <div>
              <h2>Tech Stack</h2>
              <p>The current implementation stack and how the project is organized.</p>
            </div>
          </div>
          <div className="tag-grid">
            {techStack.map((item) => (
              <span key={item} className="stack-pill">
                {item}
              </span>
            ))}
          </div>
          <div className="callout">
            <strong>Production upgrade path</strong>
            <p className="muted">
              Next natural steps are a real backend, authentication, role-based access,
              file uploads, notifications, and test coverage.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
