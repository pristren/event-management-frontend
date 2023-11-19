import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/DailyFrame.png";

const HomeNavbar = ({ isExpand, setIsExpand }) => {
  const [selectedBtn, setSelectedBtn] = useState("Contract");

  return (
    <div className="bg-[#1BB6ED] py-8 px-4">
      <div className="flex items-center justify-between">
        <div>
          <span
            className="cursor-pointer sm:hidden"
            onClick={() => setIsExpand(!isExpand)}
          >
            <svg
              stroke="currentColor"
              fill="#fff"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="25px"
              width="25px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </span>
          <img
            src={Logo}
            className="w-[120px] hidden sm:block"
            alt="Daily frame logo"
          />
        </div>
        <div
          className="bg-white rounded-xl flex items-center border-[2px] border-white overflow-hidden"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          }}
        >
          <button
            onClick={(e) => setSelectedBtn("Contract")}
            className={`w-full h-[99%] py-3 px-8 rounded ${
              selectedBtn === "Contract" && "bg-[#1BB6ED] text-white"
            } text-[#1BB6ED]`}
          >
            Contract
          </button>
          <button
            onClick={(e) => setSelectedBtn("Public")}
            className={`w-full h-[99%] py-3 px-8 rounded ${
              selectedBtn === "Public" && "bg-[#1BB6ED] text-white"
            } text-[#1BB6ED]`}
          >
            Public
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="cursor-pointer">
            <svg
              stroke="currentColor"
              fill="#fff"
              strokeWidth="0"
              viewBox="0 0 640 512"
              height="23px"
              width="23px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
          </span>
          <Link
            to="/login"
            className="flex items-center gap-2 py-2 px-3 bg-white rounded-lg"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            }}
          >
            <span>
              <svg
                stroke="#1BB6ED"
                fill="#1BB6ED"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M192 176v-40a40 40 0 0140-40h160a40 40 0 0140 40v240a40 40 0 01-40 40H240c-22.09 0-48-17.91-48-40v-40"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M288 336l80-80-80-80M80 256h272"
                ></path>
              </svg>
            </span>
            <span className="text-[#1BB6ED]">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
