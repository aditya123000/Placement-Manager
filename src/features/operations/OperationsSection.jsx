import AuditTrailPanel from "./components/AuditTrailPanel";
import DriveOperationsPanel from "./components/DriveOperationsPanel";
import OperationsOverviewCards from "./components/OperationsOverviewCards";
import StudentsOperationsTable from "./components/StudentsOperationsTable";

export default function OperationsSection({
  management,
  onToggleStudentPlacement,
  onCreateDrive,
  onUpdateDrive,
}) {
  const metrics = management?.metrics || {};
  const students = management?.students || [];
  const drives = management?.drives || [];
  const audits = management?.audits || [];

  return (
    <section className="panel-stack">
      <OperationsOverviewCards metrics={metrics} />
      <div className="dual-grid operations-dual-grid">
        <StudentsOperationsTable students={students} onTogglePlaced={onToggleStudentPlacement} />
        <DriveOperationsPanel
          drives={drives}
          onCreateDrive={onCreateDrive}
          onUpdateDrive={onUpdateDrive}
        />
      </div>
      <AuditTrailPanel audits={audits} />
    </section>
  );
}
