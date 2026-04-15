import { analyticsCards, branchPerformance } from "../placement/data";

export default function AnalyticsSection({ currentUser, applications, drives }) {
  return (
    <section className="panel-stack">
      <div className="metrics-grid analytics-grid">
        {analyticsCards.map((card) => (
          <article key={card.label} className="metric-card accent-slate">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </article>
        ))}
      </div>

      <div className="dual-grid">
        <article className="content-card">
          <div className="section-head">
            <div>
              <h2>Student Snapshot</h2>
              <p>A concise readiness overview for the logged-in student.</p>
            </div>
          </div>
          <div className="details-grid compact-grid">
            <div>
              <span>Profile Health</span>
              <strong>{currentUser.profileHealth}</strong>
            </div>
            <div>
              <span>Applications Tracked</span>
              <strong>{applications.length}</strong>
            </div>
            <div>
              <span>Dream Applications Left</span>
              <strong>{currentUser.dreamApplicationsLeft}</strong>
            </div>
            <div>
              <span>Open Drives</span>
              <strong>{drives.length}</strong>
            </div>
          </div>
        </article>

        <article className="content-card">
          <div className="section-head">
            <div>
              <h2>Coordinator View</h2>
              <p>What a placement office dashboard would typically highlight.</p>
            </div>
          </div>
          <div className="chart-list">
            <div className="chart-bar">
              <span>Eligibility Coverage</span>
              <div><i style={{ width: "86%" }} /></div>
              <strong>86%</strong>
            </div>
            <div className="chart-bar">
              <span>Interview Readiness</span>
              <div><i style={{ width: "74%" }} /></div>
              <strong>74%</strong>
            </div>
            <div className="chart-bar">
              <span>Offer Conversion</span>
              <div><i style={{ width: "68%" }} /></div>
              <strong>68%</strong>
            </div>
          </div>
        </article>
      </div>

      <article className="content-card">
        <div className="section-head">
          <div>
            <h2>Branch Performance Summary</h2>
            <p>Representative institutional metrics included to make the product feel complete.</p>
          </div>
        </div>
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Registered</th>
                <th>Eligible</th>
                <th>Placed</th>
                <th>Average Package</th>
              </tr>
            </thead>
            <tbody>
              {branchPerformance.map((row) => (
                <tr key={row.branch}>
                  <td>{row.branch}</td>
                  <td>{row.registered}</td>
                  <td>{row.eligible}</td>
                  <td>{row.placed}</td>
                  <td>{row.avgPackage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
