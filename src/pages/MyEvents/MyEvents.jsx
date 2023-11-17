import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import MyEventsCart from "./MyEventsCart";

const MyEvents = () => {
  return (
    <section className="flex max-w-7xl mx-auto">
      <Sidebar />
      <div className="w-full">
        <Profile />
        <div>
          <h1 className="text-[#1BB6ED] font-bold text-2xl p-4">My Events</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
            <MyEventsCart />
            <MyEventsCart />
            <MyEventsCart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyEvents;
