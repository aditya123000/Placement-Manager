import { formatDate } from "../../shared/lib/utils";

export default function NotificationsPanel({ notifications, onRead }) {
  const unreadNotifications = notifications.filter((item) => !item.read);

  return (
    <section className="content-card">
      <div className="section-head">
        <div>
          <h2>Notifications</h2>
          <p>Real-time in-app alerts with backend-generated email log events.</p>
        </div>
      </div>
      <div className="notification-stack">
        {unreadNotifications.length ? unreadNotifications.map((item) => (
          <div key={item.id} className={`notification-card ${item.read ? "is-read" : ""}`}>
            <div>
              <strong>{item.title}</strong>
              <p className="muted">{item.message}</p>
              <small>{formatDate(item.createdAt)}</small>
            </div>
            {!item.read ? (
              <button className="ghost-button" type="button" onClick={() => onRead(item.id)}>
                Mark read
              </button>
            ) : null}
          </div>
        )) : (
          <div className="empty-state">
            <i className="fa-regular fa-bell-slash" />
            <p>All caught up. No unread alerts right now.</p>
          </div>
        )}
      </div>
    </section>
  );
}
