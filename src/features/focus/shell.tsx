import { Link, useLocation } from "@tanstack/react-router";
import {
  Aperture,
  House,
  PanelsTopLeft,
  Sparkles,
  BookOpen,
  Clock3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ArrowUpRight,
  Menu,
  Leaf,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useFocus } from "./store";
export const nav = [
  { to: "/", name: "Home", icon: House },
  { to: "/canvas", name: "My Canvas", icon: PanelsTopLeft },
  { to: "/create", name: "Create Notes", icon: Sparkles },
  { to: "/revision", name: "Revision", icon: BookOpen },
  { to: "/history", name: "History", icon: Clock3 },
] as const;
export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Aperture size={23} />
      </span>
      <span>
        Focus Frame<span className="brand-dot">.</span>
      </span>
    </span>
  );
}
export function Shell({ children }: { children: ReactNode }) {
  const { user, update } = useFocus();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const path = useLocation().pathname;
  return (
    <div className={`app-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Button
        variant="outline"
        size="icon"
        className="mobile-menu"
        aria-label="Open navigation"
        onClick={() => setMobile(!mobile)}
      >
        <Menu />
      </Button>
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <Link to="/" className="brand-link">
          <Brand />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="collapse-toggle"
          title="Collapse sidebar"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        <p className="sidebar-label">WORKSPACE</p>
        <nav>
          {nav.map((item) => (
            <Button
              key={item.to}
              asChild
              variant="ghost"
              className={`nav-item ${path === item.to ? "active" : ""}`}
            >
              <Link to={item.to} onClick={() => setMobile(false)}>
                <item.icon size={19} />
                <span>{item.name}</span>
                {item.name === "Create Notes" && <span className="nav-new">NEW</span>}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="gentle-note">
            <Leaf size={22} />
            <strong>A little focus, a lot of possibility.</strong>
            <p>One idea at a time. You’ve got this.</p>
            <span>Stay focused. Learn your way.</span>
          </div>
          <Button asChild variant="ghost" className="nav-item">
            <Link to="/settings">
              <Settings />
              <span>Settings</span>
            </Link>
          </Button>
          <div className="profile">
            <span className="avatar">
              {(user?.name || "Alex Morgan")
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <strong>{user?.name || "Alex Morgan"}</strong>
              <span>{user ? "Student account · Demo" : "Student · Demo workspace"}</span>
            </div>
            <Button asChild variant="ghost" size="icon" title={user ? "Sign out" : "Sign in"}>
              <Link
                to="/auth"
                onClick={() => {
                  if (user) update((s) => ({ ...s, user: null }));
                }}
              >
                {user ? <LogOut /> : <ArrowUpRight />}
              </Link>
            </Button>
          </div>
        </div>
      </aside>
      <div className="main-shell">{children}</div>
    </div>
  );
}
export function PageHeader({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={14} />
        <span>{eyebrow}</span>
      </div>
      <div className="topbar-right">
        <span className="private-dot" /> Your personal learning space {action}
      </div>
    </header>
  );
}
export function SubjectIcon({ subject }: { subject: string }) {
  return (
    <span
      className={`subject-icon ${subject === "Biology" ? "green" : subject === "Physics" ? "peach" : "lavender"}`}
    >
      {subject === "Biology" ? (
        <Leaf />
      ) : subject === "Physics" ? (
        <Sparkles />
      ) : (
        <span className="math-symbol">ƒx</span>
      )}
    </span>
  );
}
