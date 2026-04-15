import { formatDate } from "../../shared/lib/utils";

export default function CalendarSection({ events }) {
  return (
    <section className="content-card">
      <div className="section-head">
        <div>
          <h2>Placement Calendar</h2>
          <p>Track test dates, interview schedules, and next-step timelines.</p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <p>No scheduled events yet.</p>
        </div>
      ) : (
        <div className="timeline-list">
          {events.map((event) => (
            <div key={event.id} className="timeline-item">
              <strong>{event.title}</strong>
              <span>{event.type === "drive" ? "Drive schedule" : "Application milestone"}</span>
              <small>{formatDate(event.date)}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
