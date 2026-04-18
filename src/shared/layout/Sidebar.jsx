export default function Sidebar({
  navItems,
  activeSection,
  isMobileOpen,
  onSectionChange,
  onLogoutClick,
}) {
  return (
    <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-brand">
        <span className="eyebrow">Campus Console</span>
        <h2>Placement Portal</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activeSection === item.id ? "nav-item active" : "nav-item"}
            type="button"
            onClick={() => onSectionChange(item.id)}
          >
            <i className={`fa-solid ${item.icon}`} />
            <span>{item.label}</span>
          </button>
        ))}

        <button className="nav-item logout" type="button" onClick={onLogoutClick}>
          <i className="fa-solid fa-right-from-bracket" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
