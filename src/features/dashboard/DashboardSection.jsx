import { formatDate, getEligibility } from "../../shared/lib/utils";
import { announcements, timelineMilestones } from "../placement/data";

export default function DashboardSection({
  currentUser,
  drives,
  onApplyClick,
  onUndoApply,
}) {
  const appliedCount = drives.filter((drive) => drive.status === "Applied").length;

  return (
    <section className="panel-stack">
      <div className="metrics-grid">
        <article className="metric-card accent-green">
          <span>Status</span>
          <strong>
            {currentUser.isPlaced
              ? `Placed (${currentUser.placedCategory})`
              : "Unplaced"}
          </strong>
        </article>
        <article className="metric-card accent-amber">
          <span>Companies Applied</span>
          <strong>{appliedCount}</strong>
        </article>
        <article className="metric-card accent-blue">
          <span>Ongoing Drives</span>
          <strong>{drives.length}</strong>
          <small>{drives.filter((drive) => getEligibility(currentUser, drive).eligible).length} eligible right now</small>
        </article>
        <article className="metric-card accent-slate">
          <span>Profile Completion</span>
          <strong>{currentUser.profileCompletion || 0}%</strong>
          <small>{currentUser.profileHealth} profile quality</small>
        </article>
      </div>

      <div className="dual-grid">
        <article className="content-card">
          <div className="section-head">
            <div>
              <h2>Operational Announcements</h2>
              <p>The dashboard now includes noticeboard-style updates and action prompts.</p>
            </div>
          </div>
          <div className="announcement-stack">
            {announcements.map((item) => (
              <div key={item.title} className={`announcement-card tone-${item.tone}`}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="content-card">
          <div className="section-head">
            <div>
              <h2>Placement Timeline</h2>
              <p>Important operational milestones for the current cycle.</p>
            </div>
          </div>
          <div className="timeline-list">
            {timelineMilestones.map((item) => (
              <div key={item.title} className="timeline-item">
                <strong>{item.title}</strong>
                <span>{item.owner}</span>
                <small>{item.status} • {formatDate(item.date)}</small>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="content-card">
        <div className="section-head">
          <div>
            <h2>Live Recruitment Drives</h2>
            <p>Dream &gt; Core &gt; Mass placement order, CGPA, and backlog rules are enforced automatically.</p>
          </div>
        </div>

        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Category</th>
                <th>Last Date</th>
                <th>Eligibility</th>
                <th>Match</th>
                <th>Package</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drives.map((drive) => {
                const policyEligibility = getEligibility(currentUser, drive);
                const smartEligibilitySummary = drive.eligibilityDetail?.summary;
                const isApplied = drive.status === "Applied";

                return (
                  <tr key={drive.id}>
                    <td>{drive.company}</td>
                    <td>{drive.role}</td>
                    <td>
                      <span className={`pill ${drive.category.toLowerCase()}`}>
                        {drive.category}
                      </span>
                    </td>
                    <td>{formatDate(drive.date)}</td>
                    <td>{smartEligibilitySummary || `${drive.eligibility}+ CGPA / ${drive.maxBacklogs} backlog`}</td>
                    <td>{drive.matchScore ? `${drive.matchScore}%` : "Pending"}</td>
                    <td>{drive.package}</td>
                    <td>
                      {!policyEligibility.eligible ? (
                        <button className="table-button muted" type="button" disabled>
                          {policyEligibility.reason}
                        </button>
                      ) : isApplied ? (
                        <div className="inline-actions">
                          <button className="table-button muted" type="button" disabled>
                            Applied
                          </button>
                          <button
                            className="table-button danger"
                            type="button"
                            onClick={() => onUndoApply(drive.id)}
                          >
                            Undo
                          </button>
                        </div>
                      ) : (
                        <button
                          className="table-button success"
                          type="button"
                          onClick={() => onApplyClick(drive)}
                        >
                          Apply
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
