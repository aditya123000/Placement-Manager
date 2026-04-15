import { formatDate } from "../../shared/lib/utils";

export default function DrivesSection({ drives, onSelectDrive, onToggleWishlist }) {
  return (
    <section className="content-card">
      <div className="section-head">
        <div>
          <h2>All Company Recruitment Drives</h2>
          <p>Browse open on-campus opportunities and inspect details before applying.</p>
        </div>
      </div>
      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Category</th>
              <th>Eligibility</th>
              <th>Smart Score</th>
              <th>Package</th>
              <th>Mode</th>
              <th>Saved</th>
              <th>Last Date</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr key={drive.id}>
                <td>
                  <button
                    className="link-button"
                    type="button"
                    onClick={() => onSelectDrive(drive)}
                  >
                    {drive.company}
                  </button>
                </td>
                <td>{drive.role}</td>
                <td>
                  <span className={`pill ${drive.category.toLowerCase()}`}>
                    {drive.category}
                  </span>
                </td>
                <td>
                  <strong>{drive.eligibilityDetail?.summary || `${drive.eligibility}+ CGPA / ${drive.maxBacklogs} backlog`}</strong>
                </td>
                <td>{drive.matchScore ? `${drive.matchScore}% match` : "Pending resume"}</td>
                <td>{drive.package}</td>
                <td>{drive.mode}</td>
                <td>
                  <button className="ghost-button" type="button" onClick={() => onToggleWishlist(drive.id)}>
                    {drive.isSaved ? "Saved" : "Save"}
                  </button>
                </td>
                <td>{formatDate(drive.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
