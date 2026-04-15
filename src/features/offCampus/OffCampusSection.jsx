import { formatDate } from "../../shared/lib/utils";

export default function OffCampusSection({ jobs, applications, onApply }) {
  const hasApplied = (job) =>
    applications.some(
      (application) =>
        application.company === job.company &&
        application.role === job.role &&
        application.source === "off-campus",
    );

  return (
    <section className="content-card">
      <div className="section-head">
        <div>
          <h2>Off-Campus Jobs</h2>
          <p>External opportunities that students can explore directly through company links.</p>
        </div>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Location</th>
              <th>Compensation</th>
              <th>Apply By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.location}</td>
                <td>{job.compensation}</td>
                <td>{formatDate(job.applyBy)}</td>
                <td>
                  <button
                    className={hasApplied(job) ? "table-button muted" : "table-button success"}
                    type="button"
                    disabled={hasApplied(job)}
                    onClick={() => onApply(job)}
                  >
                    {hasApplied(job) ? "Applied" : "Apply"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
