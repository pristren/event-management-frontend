import React from "react";

const Profile = () => {
  return (
    <div className="flex justify-end p-5">
      <span className="bg-[#1BB6ED] p-3 rounded-2xl flex justify-center items-center">
        <svg
          stroke="currentColor"
          fill="#fff"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="25px"
          width="25px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z"></path>
        </svg>
      </span>
    </div>
  );
};

export default Profile;