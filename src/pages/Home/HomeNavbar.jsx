import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Logo from "../../assets/DailyFrame.png";
import Logo from "../../assets/C.svg";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userLoggedOut } from "../../features/auth/authSlice";
import logoWhiteBg from "../../assets/logo-black-bg.png";

const loginIcon = (
  <svg
    stroke="black"
    fill="black"
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
);
const logOutIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Logout">
      <g>
        <path d="M20.968,18.448a2.577,2.577,0,0,1-2.73,2.5c-2.153.012-4.306,0-6.459,0a.5.5,0,0,1,0-1c2.2,0,4.4.032,6.6,0,1.107-.016,1.589-.848,1.589-1.838V5.647A1.546,1.546,0,0,0,19,4.175a3.023,3.023,0,0,0-1.061-.095H11.779a.5.5,0,0,1,0-1c2.224,0,4.465-.085,6.687,0a2.567,2.567,0,0,1,2.5,2.67Z"></path>
        <path d="M3.176,11.663a.455.455,0,0,0-.138.311c0,.015,0,.028-.006.043s0,.027.006.041a.457.457,0,0,0,.138.312l3.669,3.669a.5.5,0,0,0,.707-.707L4.737,12.516H15.479a.5.5,0,0,0,0-1H4.737L7.552,8.7a.5.5,0,0,0-.707-.707Z"></path>
      </g>
    </g>
  </svg>
);

const HomeNavbar = ({
  user,
  isExpand,
  setIsExpand,
  selectedBtn,
  setSelectedBtn,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandle = () => {
    localStorage.clear();
    toast.success("Logged out!");
    dispatch(userLoggedOut());
    navigate("/");
  };

  return (
    <div className="bg-[black] py-4 px-4">
      <div className="flex items-center justify-between">
        <div>
          <span
            className="cursor-pointer md:hidden"
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
          {/* <img
            src={Logo}
            className="w-[120px] hidden md:block"
            alt="Daily frame logo"
          /> */}
          <div className="md:flex justify-center flex-col items-center hidden -mt-2 ml-2">
            {/* <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="60"
              viewBox="0 0 470.000000 531.000000"
              preserveAspectRatio="xMidYMid meet"
              className="hidden md:block"
            >
              <g
                transform="translate(0.000000,531.000000) scale(0.100000,-0.100000)"
                fill="white"
                stroke="none"
              >
                <path
                  d="M2245 4763 c-433 -69 -789 -380 -909 -797 -77 -265 -51 -559 70 -801
20 -38 84 -144 143 -235 60 -91 177 -273 262 -405 240 -373 447 -694 526 -816
l71 -111 87 134 c47 73 112 174 144 223 119 186 361 560 554 859 110 170 214
341 232 380 117 255 132 555 41 824 -118 346 -408 617 -766 717 -82 23 -118
27 -260 30 -91 2 -178 1 -195 -2z m256 -628 c106 -13 253 -112 318 -213 78
-122 98 -280 53 -418 -45 -137 -175 -269 -307 -310 -69 -22 -189 -29 -258 -15
-265 56 -440 334 -372 594 42 160 170 299 320 347 47 15 140 28 175 24 14 -2
46 -6 71 -9z"
                />
                <path
                  d="M2285 1309 c-92 -10 -217 -48 -281 -85 -59 -35 -121 -108 -135 -157
-53 -197 202 -367 551 -367 142 0 325 45 425 105 54 32 109 85 98 96 -4 4 -55
28 -112 53 l-104 45 -38 -34 c-53 -47 -147 -75 -258 -75 -124 0 -206 24 -263
78 -36 34 -35 64 3 96 48 41 129 60 251 61 l108 0 0 98 0 97 -82 -1 c-46 -1
-119 -5 -163 -10z"
                />
              </g>
            </svg> */}
            <img
              src={logoWhiteBg}
              className=" hidden md:block"
              alt="Pin logo"
              width={100}
              // height={50}
            />
            {/* <p className="font-semibold text-lg -mt-2 text-white">Pin</p> */}
          </div>
        </div>
        <div
          className="bg-white rounded-xl flex items-center border-[2px] border-white overflow-hidden"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          }}
        >
          <button
            onClick={(e) => {
              user ? setSelectedBtn("Invited") : navigate("/login");
            }}
            className={`w-full h-[99%] py-2 md:py-3 px-4 text-sm md:text-base md:px-8 rounded ${
              selectedBtn === "Invited" && "bg-[black] text-white"
            } text-[black]`}
          >
            Invited
          </button>
          <button
            onClick={(e) => setSelectedBtn("Public")}
            className={`w-full h-[99%] py-2 md:py-3 px-4 text-sm md:text-base md:px-8 rounded ${
              selectedBtn === "Public" && "bg-[black] text-white"
            } text-[black]`}
          >
            Public
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="cursor-pointer hidden md:block">
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
          {user ? (
            <button
              onClick={logoutHandle}
              className="flex items-center gap-[2px] md:gap-2 py-1.5 md:py-2 text-sm md:text-base px-2 md:px-3 bg-white rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              <span>{logOutIcon}</span>
              <span className="text-[black]">Log Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-[2px] md:gap-2 py-1.5 md:py-2 text-sm md:text-base px-2 md:px-3 bg-white rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              <span>{loginIcon}</span>
              <span className="text-[black]">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
