import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function AppLayout() {
  const { dbUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/home" aria-label="RRC 홈">
          <span className="brand-mark">🍯</span>
          RRC
        </Link>
        <nav className="nav">
          <NavLink to="/home">홈</NavLink>
          <NavLink to="/board">게시판</NavLink>
        </nav>
        <div className="account">
          <span>{dbUser?.nickname || "사용자"}</span>
          <button className="ghost-button" type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>
      <main className="page-wrap">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
