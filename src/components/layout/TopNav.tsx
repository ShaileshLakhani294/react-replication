import { Link, NavLink } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/orders" className="flex items-center gap-2">
            <div className="rounded-full border border-primary/40 px-3 py-1 text-sm font-semibold text-primary">
              aaharam
            </div>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                }`
              }
            >
              My Orders
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                }`
              }
            >
              Today’s Menu
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                }`
              }
            >
              Add/Edit Items
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                }`
              }
            >
              Order History
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border px-3 py-2 text-sm text-muted-foreground md:flex">
            <Search className="opacity-70" />
            Search
          </div>
          <button
            className="relative rounded-full border p-2 hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell />
            <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full bg-primary" />
          </button>
          <div className="hidden h-8 w-8 rounded-full bg-muted md:block" aria-label="Profile avatar" />
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
