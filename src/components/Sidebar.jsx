import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MyProvider from "../Provider/Provider";

const Sidebar = () => {
  // const [isExpand, setIsExpand] = useState(false);
  const expandUserMenuRef = useRef(null);

  const { isExpand, setIsExpand } = useContext(MyProvider);

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
        className={`max-w-[250px] w-full h-auto p-5 pt-9 bg-white border-r fixed top-0 sm:static transition-all ${
          isExpand ? "left-0" : "-left-[1000px]"
        } z-[9] transition-all`}
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
                  stroke="#9E9E9E"
                  fill="#9E9E9E"
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
                    d="M112.91 128A191.85 191.85 0 0064 254c-1.18 106.35 85.65 193.8 192 194 106.2.2 192-85.83 192-192 0-104.54-83.55-189.61-187.5-192a4.36 4.36 0 00-4.5 4.37V152"
                  ></path>
                  <path d="M233.38 278.63l-79-113a8.13 8.13 0 0111.32-11.32l113 79a32.5 32.5 0 01-37.25 53.26 33.21 33.21 0 01-8.07-7.94z"></path>
                </svg>
              </span>
              <span className="text-[#9E9E9E] hover:text-[#1BB6ED]">
                Event creation
              </span>
            </Link>
          </li>

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
          <li>
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
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
