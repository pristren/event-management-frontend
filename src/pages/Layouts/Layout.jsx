import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
  const handleNavClose = () => {
    if (!isSidebarOpen) return;
    dispatch(toggleSidebar());
  };
  return (
    <div className="none lg:block font-poppins ">
      <Sidebar />
      <div className="lg:ml-[250px] ml-0 grow ">
        <div
          onClick={handleNavClose}
          className={`px-3 lg:px-4 xl:px-5 pt-20 pb-12 lg:py-8 min-h-screen bg-white text-black overflow-y-scroll ${
            isSidebarOpen ? "fixed inset-0 bg-white opacity-95  z-50" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
