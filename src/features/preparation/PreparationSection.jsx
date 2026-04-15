import { formatDate } from "../../shared/lib/utils";
import { preparationModules } from "../placement/data";

export default function PreparationSection() {
  return (
    <section className="panel-stack">
      <div className="section-head">
        <div>
          <h2>Placement Preparation Hub</h2>
          <p>Interview readiness, aptitude practice, and communication support in one place.</p>
        </div>
      </div>

      <div className="triple-grid">
        {preparationModules.map((module) => (
          <article key={module.title} className="content-card prep-card">
            <span className="eyebrow">Readiness Module</span>
            <h3>{module.title}</h3>
            <p className="muted">{module.focus}</p>
            <div className="progress-shell">
              <div className="progress-track">
                <i style={{ width: `${module.progress}%` }} />
              </div>
              <strong>{module.progress}% complete</strong>
            </div>
            <p className="muted">Next session: {formatDate(module.nextSession)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
