import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HomeSidebar = ({ isExpand, setIsExpand }) => {
  const expandUserMenuRef = useRef(null);

  // checking if the user click outside of the
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        expandUserMenuRef.current &&
        !expandUserMenuRef.current.contains(event.target)
      ) {
        setIsExpand(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [expandUserMenuRef, isExpand]);

  return (
    <React.Fragment>
      <div
        className={`max-w-[250px] w-full h-screen p-5 pt-9 bg-white border-r fixed top-0 sm:static transition-all ${
          isExpand ? "left-0" : "-left-[1000px]"
        } z-[9999] transition-all`}
        ref={expandUserMenuRef}
      >
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              to={"/"}
              className="flex items-center gap-3 cursor-pointer font-semibold"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="#9E9E9E"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="23px"
                  width="23px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">Home</span>
            </Link>
          </li>

          <li>
            <Link
              to={"/profile-settings"}
              className="flex items-center gap-3 cursor-pointer font-semibold"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="#9E9E9E"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">
                Profile setting
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/create-event"}
              className="flex items-center gap-3 cursor-pointer font-semibold"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="#9E9E9E"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Timer">
                    <g>
                      <path d="M2.336,9.685A9.934,9.934,0,0,0,13.592,21.808,9.931,9.931,0,0,0,20.708,7.23,10.046,10.046,0,0,0,12,2.072a.507.507,0,0,0-.5.5v4.2a.5.5,0,0,0,1,0v-4.2l-.5.5a8.935,8.935,0,0,1,8.433,11.892A8.938,8.938,0,0,1,6.468,19.027,9.041,9.041,0,0,1,3.3,9.951c.142-.627-.822-.9-.964-.266Z"></path>
                      <path d="M7.4,8.117a.5.5,0,0,1,.707-.707l4.243,4.242h0a.5.5,0,0,1-.707.707Z"></path>
                    </g>
                  </g>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">
                Event creation
              </span>
            </Link>
          </li>

          {/* <li>
            <Link
              to={"/chat-and-calls"}
              className="flex items-center gap-3 cursor-pointer font-semibold"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="#9E9E9E"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                  <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"></path>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">
                Chat and calls
              </span>
            </Link>
          </li> */}

          <li>
            <Link
              to={"/my-events"}
              className="flex items-center gap-3 cursor-pointer font-semibold"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="#9E9E9E"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="20px"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z"></path>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">
                My events
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/invited-events"}
              className="flex items-center gap-3 cursor-pointer font-semibold"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="#9E9E9E"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="23px"
                  width="23px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z"></path>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">
                Invited events
              </span>
            </Link>
          </li>
          {/* <li>
            <Link
              to={"/event-details"}
              className="flex items-center gap-3 cursor-pointer font-semibold"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="#9E9E9E"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="23px"
                  width="23px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z"></path>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">
                Event details
              </span>
            </Link>
          </li> */}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default HomeSidebar;
