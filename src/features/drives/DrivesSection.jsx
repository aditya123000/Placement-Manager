import { formatDate, packageByCategory } from "../../shared/lib/utils";

export default function DrivesSection({ drives, onSelectDrive }) {
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
              <th>Package</th>
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
                <td>{drive.eligibility}+ CGPA</td>
                <td>{packageByCategory[drive.category]}</td>
                <td>{formatDate(drive.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
