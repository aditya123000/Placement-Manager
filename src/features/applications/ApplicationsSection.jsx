export default function ApplicationsSection({ applications, onSelectApplication }) {
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
                <th>Status</th>
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
                  <td>{application.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
