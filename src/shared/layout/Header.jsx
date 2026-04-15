export default function Header({
  userName,
  onMenuToggle,
  onNotificationsClick,
  summary,
  unreadCount,
}) {
  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">Student Dashboard</span>
        <h1>
          Welcome back, <strong>{userName}</strong>
        </h1>
        {summary ? <p className="muted topbar-copy">{summary}</p> : null}
      </div>
      <div className="header-actions">
        <button className="ghost-button notification-button" type="button" onClick={onNotificationsClick}>
          <i className="fa-solid fa-bell" />
          Alerts
          {unreadCount ? <span className="notification-badge">{unreadCount}</span> : null}
        </button>
        <button className="ghost-button mobile-only" type="button" onClick={onMenuToggle}>
          <i className="fa-solid fa-bars" />
          Menu
        </button>
      </div>
    </header>
  );
}
