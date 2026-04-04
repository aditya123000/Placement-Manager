import { formatDate } from "../../shared/lib/utils";

function getEligibility(currentUser, drive) {
  if (!currentUser) {
    return { eligible: false, reason: "Login required." };
  }

  if (currentUser.jobsOffered >= 2) {
    return { eligible: false, reason: "Already placed in 2 companies." };
  }

  const categoryRank = { Mass: 1, Core: 2, Dream: 3 };

  if (
    currentUser.isPlaced &&
    categoryRank[currentUser.placedCategory] > categoryRank[drive.category]
  ) {
    return {
      eligible: false,
      reason: `Placed in ${currentUser.placedCategory}, cannot apply for ${drive.category}.`,
    };
  }

  if (Number(currentUser.academicCGPA) < Number(drive.eligibility)) {
    return {
      eligible: false,
      reason: `CGPA below required ${drive.eligibility}.`,
    };
  }

  return { eligible: true, reason: "" };
}

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
        </article>
        <article className="metric-card accent-slate">
          <span>Academic CGPA</span>
          <strong>{currentUser.academicCGPA || "0.0"} CGPA</strong>
        </article>
      </div>

      <div className="content-card">
        <div className="section-head">
          <div>
            <h2>Live Recruitment Drives</h2>
            <p>Dream &gt; Core &gt; Mass placement order is enforced automatically.</p>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drives.map((drive) => {
                const eligibility = getEligibility(currentUser, drive);
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
                    <td>{drive.eligibility}+ CGPA</td>
                    <td>
                      {!eligibility.eligible ? (
                        <button className="table-button muted" type="button" disabled>
                          {eligibility.reason}
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
