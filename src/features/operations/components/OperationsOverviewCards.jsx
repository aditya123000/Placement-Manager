export default function OperationsOverviewCards({ metrics }) {
  const cards = [
    { label: "Students", value: metrics.totalStudents || 0, tone: "accent-green" },
    { label: "Placed", value: metrics.placedStudents || 0, tone: "accent-blue" },
    { label: "Placement Rate", value: `${metrics.placementRate || 0}%`, tone: "accent-amber" },
    { label: "Active Drives", value: metrics.activeDrives || 0, tone: "accent-slate" },
  ];

  return (
    <div className="metrics-grid operations-metrics-grid">
      {cards.map((card) => (
        <article key={card.label} className={`metric-card ${card.tone}`}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </div>
  );
}
