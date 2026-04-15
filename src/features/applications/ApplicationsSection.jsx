import { formatDate } from "../../shared/lib/utils";

export default function ApplicationsSection({
  applications,
  onAdvanceApplication,
  onSelectApplication,
}) {
  return (
    <section className="content-card">
      <div className="section-head">
        <div>
          <h2>My Application Status</h2>
          <p>Track submitted applications and revisit company details whenever needed.</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <i className="fa-regular fa-folder-open" />
          <p>No applications yet. Apply to a drive or an off-campus job to see it here.</p>
        </div>
      ) : (
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Source</th>
                <th>Status</th>
                <th>Stage</th>
                <th>Next Step</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <button
                      className="link-button"
                      type="button"
                      onClick={() => onSelectApplication(application)}
                    >
                      {application.company}
                    </button>
                  </td>
                  <td>{application.role}</td>
                  <td>{application.source}</td>
                  <td>{application.status}</td>
                  <td>{application.stage || "Profile Review"}</td>
                  <td>{application.nextStepDate ? formatDate(application.nextStepDate) : "Awaited"}</td>
                  <td>
                    <button className="ghost-button" type="button" onClick={() => onAdvanceApplication(application.id)}>
                      Advance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
