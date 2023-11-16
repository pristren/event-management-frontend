import React from "react";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";

const InvitedEvents = () => {
  return (
    <section className="flex">
      <Sidebar />
      <div className="w-full">
        <Profile />
        <div>
          <h1 className="text-[#1BB6ED] font-bold text-[24px] p-4">
            My Events
          </h1>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default InvitedEvents;
