export default function StudentsOperationsTable({ students, onTogglePlaced }) {
  return (
    <article className="content-card">
      <div className="section-head">
        <div>
          <h2>Student Operations</h2>
          <p>Action center for placement outcomes and profile readiness tracking.</p>
        </div>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Applications</th>
              <th>Profile</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <strong>{student.name}</strong>
                  <div className="muted">{student.roll}</div>
                </td>
                <td>{student.branch || "N/A"}</td>
                <td>{student.academicCGPA || 0}</td>
                <td>{student.applicationsCount || 0}</td>
                <td>{student.profileCompletion || 0}%</td>
                <td>
                  <span className={`pill ${student.isPlaced ? "core" : "mass"}`}>
                    {student.isPlaced ? `Placed (${student.placedCategory || "N/A"})` : "Unplaced"}
                  </span>
                </td>
                <td>
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() => onTogglePlaced(student)}
                  >
                    {student.isPlaced ? "Mark Unplaced" : "Mark Placed"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
