import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ── Icons ──────────────────────────────────────────────────────────────────

function BusIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="12" rx="3" fill="white" fillOpacity="0.9" />
      <circle cx="7" cy="19" r="2.5" fill="white" />
      <circle cx="17" cy="19" r="2.5" fill="white" />
      <rect x="5" y="4" width="14" height="5" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="5" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.8)" />
      <rect x="10" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.6)" />
      <rect x="15" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.5)" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Remixicon SVG equivalents
const ICONS = {
  "ri-home-line": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  "ri-file-list-line": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h4M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  "ri-user-line": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  "ri-logout-box-line": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "ri-bus-line": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="19" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="19" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 11h20M12 6v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  "<ri-home-line": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
};

// ── Main Component ─────────────────────────────────────────────────────────

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);

  const userMenu = [
    { name: "Home",     icon: "ri-home-line",      path: "/" },
    { name: "Bookings", icon: "ri-file-list-line",  path: "/bookings" },
    
    { name: "Logout",   icon: "ri-logout-box-line", path: "/logout" },
  ];

  const adminMenu = [
    { name: "Home",     path: "/",              icon: "<ri-home-line" },
    { name: "Buses",    path: "/admin/buses",   icon: "ri-bus-line" },
    { name: "Users",    path: "/admin/users",   icon: "ri-user-line" },
    { name: "Bookings", path: "/admin/bookings",icon: "ri-file-list-line" },
    { name: "Logout",   path: "/logout",        icon: "ri-logout-box-line" },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  // ── Role badge colour
  const roleBg = user?.isAdmin
    ? "bg-teal-400/10 text-teal-300/80 border-teal-400/20"
    : "bg-sky-400/10 text-sky-300/80 border-sky-400/20";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <div
        className="flex min-h-screen w-full"
        style={{
          fontFamily: "'Sora', sans-serif",
          backgroundColor: "#030d1a",
          backgroundImage: [
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(0,80,180,0.45) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,160,140,0.35) 0%, transparent 55%)",
            "radial-gradient(ellipse 50% 40% at 60% 20%, rgba(0,120,200,0.2) 0%, transparent 50%)",
            "radial-gradient(ellipse 40% 60% at 10% 80%, rgba(0,60,140,0.25) 0%, transparent 55%)",
          ].join(", "),
        }}
      >
        {/* ════════════════ SIDEBAR ════════════════ */}
        <div
          className="relative flex flex-col flex-shrink-0 min-h-screen transition-all duration-300 ease-in-out"
          style={{
            width: collapsed ? "72px" : "240px",
            background: "rgba(255,255,255,0.03)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Ambient orb */}
          <div
            className="absolute w-64 h-64 rounded-full -top-10 -left-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,120,220,0.12) 0%, transparent 70%)" }}
          />

          {/* ── Brand header ── */}
          <div
            className="flex items-center gap-3 px-4 py-5 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                boxShadow: "0 4px 16px rgba(14,165,233,0.4)",
              }}
            >
              <BusIcon size={18} />
            </div>
            {!collapsed && (
              <span
                className="text-white font-semibold tracking-tight text-base truncate"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                BookMyBus
              </span>
            )}
          </div>

          {/* ── User info ── */}
          {!collapsed && (
            <div className="px-4 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.6), rgba(20,184,166,0.6))" }}
                >
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-[0.8rem] font-medium text-white/90 m-0 truncate leading-tight">
                    {user?.name ?? "Guest"}
                  </p>
                  <span
                    className={`inline-block mt-1 text-[0.6rem] tracking-[0.12em] uppercase font-medium px-2 py-0.5 rounded-full border ${roleBg}`}
                  >
                    {user?.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed avatar */}
          {collapsed && (
            <div className="px-4 py-4 flex justify-center flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.6), rgba(20,184,166,0.6))" }}
              >
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
            </div>
          )}

          {/* ── Nav menu ── */}
          <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
            {menuToBeRendered.map((item, index) => {
              const isActive = activeRoute === item.path;
              const isLogout = item.path === "/logout";

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (isLogout) {
                      localStorage.removeItem("token");
                      navigate("/login");
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(14,165,233,0.18), rgba(20,184,166,0.12))"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(14,165,233,0.25)"
                      : "1px solid transparent",
                    boxShadow: isActive ? "0 2px 12px rgba(14,165,233,0.1)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.border = "1px solid transparent";
                    }
                  }}
                >
                  {/* Icon */}
                  <span
                    className="flex-shrink-0 transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "#38bdf8"
                        : isLogout
                        ? "rgba(248,113,113,0.7)"
                        : "rgba(148,197,232,0.55)",
                    }}
                  >
                    {ICONS[item.icon] ?? (
                      <i className={item.icon} style={{ fontSize: "17px" }} />
                    )}
                  </span>

                  {/* Label */}
                  {!collapsed && (
                    <span
                      className="text-[0.82rem] font-medium truncate transition-colors duration-200"
                      style={{
                        color: isActive
                          ? "rgba(255,255,255,0.95)"
                          : isLogout
                          ? "rgba(248,113,113,0.75)"
                          : "rgba(186,220,240,0.6)",
                      }}
                    >
                      {item.name}
                    </span>
                  )}

                  {/* Active dot */}
                  {isActive && !collapsed && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#38bdf8", boxShadow: "0 0 6px rgba(56,189,248,0.8)" }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── Collapse toggle ── */}
          <div className="px-3 pb-5 flex-shrink-0">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all duration-200 text-sky-400/60 hover:text-sky-400/90"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                fontFamily: "'Sora', sans-serif",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(14,165,233,0.08)";
                e.currentTarget.style.borderColor = "rgba(14,165,233,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              {!collapsed && (
                <span className="text-[0.72rem] tracking-wide">Collapse</span>
              )}
            </button>
          </div>
        </div>

        {/* ════════════════ MAIN AREA ════════════════ */}
        <div className="flex flex-col flex-1 min-w-0 min-h-screen">

          {/* ── Top header bar ── */}
          <div
            className="flex items-center justify-between px-6 py-3.5 flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.025)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Left: page title derived from active route */}
            <div className="flex items-center gap-3">
              <span
                className="text-[0.65rem] tracking-[0.18em] uppercase text-sky-400/50"
              >
                {menuToBeRendered.find((m) => m.path === activeRoute)?.name ?? "Dashboard"}
              </span>
            </div>

            {/* Right: user pill */}
            <div
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[0.65rem] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.7), rgba(20,184,166,0.7))" }}
              >
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <span className="text-[0.75rem] font-medium text-sky-100/70 hidden sm:block">
                {user?.name ?? "Guest"}
              </span>
              <span
                className={`text-[0.58rem] tracking-[0.1em] uppercase font-medium px-1.5 py-0.5 rounded-full border ${roleBg} hidden sm:block`}
              >
                {user?.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>

          {/* ── Page content ── */}
          <div className="flex-1 overflow-auto p-6 relative">
            {/* Subtle content area glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,100,180,0.06) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;