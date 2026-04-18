import { formatDate } from "../../../shared/lib/utils";

export default function AuditTrailPanel({ audits }) {
  return (
    <article className="content-card">
      <div className="section-head">
        <div>
          <h2>Audit Trail</h2>
          <p>Team-visible operational history for accountability and handovers.</p>
        </div>
      </div>

      {!audits.length ? (
        <div className="empty-state">
          <i className="fa-regular fa-file-lines" />
          <p>No audit events yet.</p>
        </div>
      ) : (
        <div className="audit-list">
          {audits.slice(0, 20).map((audit) => (
            <div key={audit.id} className="audit-item">
              <strong>{audit.action}</strong>
              <p className="muted">{audit.detail}</p>
              <small>
                {audit.actorName} | {audit.targetType}:{audit.targetId} | {formatDate(audit.createdAt)}
              </small>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
