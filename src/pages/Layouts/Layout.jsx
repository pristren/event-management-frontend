import { Outlet, useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isUser, setIsUser] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex">
      {pathname === "/" ? null : isUser && <Sidebar />}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
