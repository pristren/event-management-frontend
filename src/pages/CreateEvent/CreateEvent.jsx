import React, { useContext, useState } from "react";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import Calender from "./Calender";
import MyProvider from "../../Provider/Provider";

const CreateEvent = () => {
  const [selectedBtn, setSelectedBtn] = useState("Private");
  const [selectedFile, setSelectedFile] = useState(null);
  const { isExpand, setIsExpand } = useContext(MyProvider);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex">
      <div>
        <div className="flex items-center justify-between pt-4 pb-5 px-4">
          <span
            className="cursor-pointer sm:hidden"
            onClick={() => setIsExpand(!isExpand)}
          >
            <svg
              stroke="currentColor"
              fill="#1BB6ED"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="23px"
              width="23px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </span>
          <h1 className="text-[#1BB6ED] font-bold text-2xl">Event creation</h1>
          <Profile />
        </div>

        <div className="min-h-screen bg-[#F2F6FF] py-10 px-5 grid items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Left Content  */}
          <div>
            <div className="flex items-center bg-white rounded-full overflow-hidden px-4 shadow-primary">
              <span className="flex items-center">
                <svg
                  stroke="currentColor"
                  fill="#1BB6ED"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"></path>
                </svg>
              </span>
              {/* <span className="text-[#1D1D1D] font-medium whitespace-nowrap"></span> */}

              <input
                type="text"
                placeholder={"Name of event"}
                className="w-full px-2 py-2 outline-none border-none text-[15px] focus:outline-none font-normal placeholder:text-[#6c757d] placeholder:font-medium"
              />
            </div>

            {/* Calender  */}
            <div className="my-10 relative">
              <span className="bg-[#1BB6ED] p-3 rounded-xl flex items-center justify-center absolute -top-5 left-5">
                <svg
                  stroke="currentColor"
                  fill="#fff"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="25px"
                  width="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"></path>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"></path>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"></path>
                </svg>
              </span>
              <div
                className="bg-white py-12 px-20 sm:px-8 md:px-3 md:py-12 lg:px-3 xl:px-4 rounded-3xl"
                style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
              >
                <Calender />
              </div>
            </div>

            <div className="flex gap-5 mt-5">
              <div className="w-full flex gap-3 items-center justify-between bg-white rounded-full shadow-primary">
                <input
                  type="number"
                  placeholder="Time start"
                  className="w-full py-2 px-4 outline-none border-none text-[15px] text-[#1BB6ED] bg-white font-medium rounded-full placeholder:text-[#6c757d] placeholder:font-medium"
                />
              </div>

              <div className="w-full flex gap-3 items-center justify-between bg-white rounded-full shadow-primary">
                <input
                  type="number"
                  placeholder="Time end"
                  className="w-full py-2 px-4 outline-none border-none text-[15px] text-[#1BB6ED] bg-white font-medium rounded-full placeholder:text-[#6c757d] placeholder:font-medium"
                />
              </div>
            </div>

            <div className="flex items-center bg-white rounded-full overflow-hidden px-4 shadow-primary mt-5">
              <span className="flex items-center">
                <svg
                  stroke="currentColor"
                  fill="#1BB6ED"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Location_On">
                    <g>
                      <path d="M12,21.933a1.715,1.715,0,0,1-1.384-.691L5.555,14.5a7.894,7.894,0,1,1,12.885-.009L13.385,21.24A1.717,1.717,0,0,1,12,21.933ZM11.992,3.066A6.81,6.81,0,0,0,7.414,4.815a6.891,6.891,0,0,0-1.05,9.1l5.051,6.727a.725.725,0,0,0,.584.292h0a.732.732,0,0,0,.586-.292l5.044-6.734A6.874,6.874,0,0,0,12.81,3.113,7.277,7.277,0,0,0,11.992,3.066Z"></path>
                      <path d="M12,12.5A2.5,2.5,0,1,1,14.5,10,2.5,2.5,0,0,1,12,12.5Zm0-4A1.5,1.5,0,1,0,13.5,10,1.5,1.5,0,0,0,12,8.5Z"></path>
                    </g>
                  </g>
                </svg>
                {/* <span className="text-[#1D1D1D] font-medium whitespace-nowrap"></span> */}
              </span>
              <input
                type="text"
                placeholder="Place"
                className="w-full px-2 py-2 outline-none border-none text-[15px] font-normal focus:outline-none placeholder:text-[#6c757d] placeholder:font-medium"
              />
            </div>
          </div>

          {/* Middle Content  */}
          <div>
            {/* Placeholder  */}
            <div className="flex gap-3 items-center bg-white rounded-2xl overflow-hidden shadow-primary">
              <textarea
                name=""
                id=""
                placeholder="Placeholder"
                className="w-full h-[200px] p-4 font-normal outline-none border-none text-[15px] placeholder:text-[#6c757d] placeholder:font-medium"
              ></textarea>
            </div>

            {/* Checkbox  */}
            <div className="flex items-center mt-6">
              <input type="checkbox" id="enable" className="checkbox" />
              <label htmlFor="enable">
                Enable picture uploads from another participants
              </label>
            </div>

            {/* Share event  */}
            <div className="bg-white rounded-2xl p-4 shadow-primary mt-5 overflow-hidden">
              <span className="block mb-5">Share event</span>

              <div className="w-full flex gap-6 items-center overflow-hidden">
                <button
                  onClick={(e) => setSelectedBtn("Public")}
                  className={`w-full py-2 px-6 rounded-full  ${
                    selectedBtn === "Public" ? "bg-[#1BB6ED]" : "bg-[#C3C3C5]"
                  } text-white`}
                >
                  Public
                </button>

                <button
                  onClick={(e) => setSelectedBtn("Contract")}
                  className={`w-full py-2 px-6 rounded-full ${
                    selectedBtn === "Contract" ? "bg-[#1BB6ED]" : "bg-[#C3C3C5]"
                  } text-white`}
                >
                  Contract
                </button>
              </div>

              <div className="w-full flex flex-col gap-3 mt-8">
                <div
                  className="flex items-center justify-center overflow-hidden relative w-full bg-white py-2 border-[1px] border-[#1BB6ED] border-dotted rounded-full"
                  style={{
                    boxShadow: "-1px 4px 110px 9px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <input
                    type="file"
                    style={{
                      boxShadow: "-1px 4px 110px 9px rgba(43, 37, 37, 0.06)",
                    }}
                    onChange={handleFileChange}
                    className="absolute top-0 right-0 w-full h-full opacity-0 font-Jost text-[#000000] font-semibold leading-[22px] uppercase border-[1px] border-[#0070D2] rounded-[10px] py-4 px-8 bg-white placeholder:text-[16px] placeholder:font-normal placeholder:capitalize cursor-pointer"
                  />
                  <div
                    className="flex gap-3 text-center text-[#A7A7A7] font-Jost text-[16px] md:text-[18px]"
                    onClick={() => {
                      document.getElementById("fileInput").click();
                    }}
                  >
                    {selectedFile ? (
                      <p className="text-[#1BB6ED] text-[15px]">
                        Uploded file: {selectedFile.name}
                      </p>
                    ) : (
                      <>
                        <span className="flex items-center">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 256 256"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z"></path>
                          </svg>
                        </span>
                        <span className="text-[#1BB6ED] text-[15px]">
                          Upload pictures
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Share button  */}
            <div
              className="flex justify-center mt-6"
              style={{
                boxShadow: "24px 83px 106px -52px rgba(79,70,70,0.75)",
              }}
            >
              <button className="flex items-center gap-4 bg-[#1BB6ED] py-2 px-7 rounded-full">
                <span className="flex items-center">
                  <svg
                    stroke="#fff"
                    fill="#fff"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="128"
                      cy="256"
                      r="48"
                      fill="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="32"
                    ></circle>
                    <circle
                      cx="384"
                      cy="112"
                      r="48"
                      fill="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="32"
                    ></circle>
                    <circle
                      cx="384"
                      cy="400"
                      r="48"
                      fill="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="32"
                    ></circle>
                    <path
                      fill="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="32"
                      d="M169.83 279.53l172.34 96.94m0-240.94l-172.34 96.94"
                    ></path>
                  </svg>
                </span>
                <span className="text-white">Share</span>
              </button>
            </div>
          </div>

          {/* Righ Content  */}
          <div className="shadow-primary rounded-2xl overflow-hidden md:w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.330962747641!2d90.38113137630452!3d23.735574478680547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c8e1ea9fd1%3A0xa6e274882fdbce53!2sDhaka%20College!5e0!3m2!1sen!2sbd!4v1700029911453!5m2!1sen!2sbd"
              width={"100%"}
              style={{ border: "0", height: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
