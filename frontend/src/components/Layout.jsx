import { Link, Outlet } from "react-router-dom";
import NotificationCenter from "./NotificationCenter";
import Toast from "./Toast";

const Layout = () => (
  <div className="min-h-screen flex bg-gray-100">
    <aside className="w-64 bg-white shadow flex flex-col">
      <div className="p-4 font-bold text-lg border-b">Mini CMS</div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/dashboard" className="block">
          Dashboard
        </Link>
        <Link to="/customers" className="block">
          Customers
        </Link>
        <Link to="/payments" className="block">
          Payments
        </Link>
        <Link to="/notifications" className="block">
          Notifications
        </Link>
      </nav>
    </aside>
    <main className="flex-1 flex flex-col">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div>Welcome, Admin</div>
        <NotificationCenter />
      </header>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
      <Toast />
    </main>
  </div>
);

export default Layout;
