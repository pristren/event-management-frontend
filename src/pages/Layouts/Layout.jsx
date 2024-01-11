import { Outlet, useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex">
      {pathname === "/" || pathname === "/login" || pathname === "/sign-up"
        ? null
        : user !== null && <Sidebar />}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
