import React from "react";
import Sidebar from "../../components/Sidebar";

const CreateEvent = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <h1 className="text-[#1BB6ED] font-bold text-[24px] p-4">
          Event creation
        </h1>
      </div>
    </div>
  );
};

export default CreateEvent;
