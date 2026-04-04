export default function Header({ userName, onMenuToggle }) {
  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">Student Dashboard</span>
        <h1>
          Welcome back, <strong>{userName}</strong>
        </h1>
      </div>
      <button className="ghost-button mobile-only" type="button" onClick={onMenuToggle}>
        <i className="fa-solid fa-bars" />
        Menu
      </button>
    </header>
  );
}
