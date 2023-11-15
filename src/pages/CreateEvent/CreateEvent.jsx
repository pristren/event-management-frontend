import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const CreateEvent = () => {
  const [selectedBtn, setSelectedBtn] = useState("Contract");

  return (
    <div className="flex">
      <Sidebar />
      <div>
        <h1 className="text-[#1BB6ED] font-bold text-[24px] p-4">
          Event creation
        </h1>
        <div className="bg-[#F2F6FF] p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          <div>
            <div className="flex gap-3 items-center bg-white rounded-full overflow-hidden px-4 shadow-primary">
              <span className="flex items-center">
                <svg
                  stroke="currentColor"
                  fill="#1BB6ED"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Name of event"
                className="w-full py-2 outline-none border-none text-[15px]"
              />
            </div>
            <div className="flex gap-5 mt-5">
              <div className="flex gap-3 items-center bg-white rounded-full overflow-hidden px-4 shadow-primary">
                <span className="block w-full">Time start</span>
                <input
                  type="number"
                  className="w-full py-2 outline-none border-none text-[15px] text-[#1BB6ED]"
                />
              </div>

              <div className="flex gap-3 items-center bg-white rounded-full overflow-hidden px-4 shadow-primary">
                <span className="flex items-center">Hours</span>
                <input
                  type="number"
                  className="py-2 outline-none border-none text-[15px] text-[#1BB6ED]"
                />
              </div>
            </div>
            <div className="flex gap-3 items-center bg-white rounded-full overflow-hidden px-4 shadow-primary mt-5">
              <span className="flex items-center gap-2">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="#1BB6ED"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
                    <circle cx="12" cy="9" r="2.5"></circle>
                  </svg>
                </span>
                <span>Place</span>
              </span>
              <input
                type="text"
                className="w-full py-2 outline-none border-none text-[15px]"
              />
            </div>
          </div>

          <div>
            <div className="flex gap-3 items-center bg-white rounded-2xl overflow-hidden px-4 shadow-primary">
              <textarea
                name=""
                id=""
                placeholder="Placeholder"
                className="w-full h-[200px] py-2 outline-none border-none text-[15px] placeholder:text-black"
              ></textarea>
            </div>

            <div className="flex items-center mt-6">
              <input type="checkbox" id="enable" className="checkbox" />
              <label htmlFor="enable">
                Enable picture uploads from another participants
              </label>
            </div>

            <div className="flex gap-3 items-center bg-white rounded-2xl px-4 shadow-primary mt-5 overflow-hidden">
              <span className="block">Share event</span>

              <div className="w-full flex gap-6 items-center overflow-hidden">
                <button
                  onClick={(e) => setSelectedBtn("Public")}
                  className={`w-full py-2 px-6 rounded-full bg-[#C3C3C5] ${
                    selectedBtn === "Public" && "bg-[#1BB6ED]"
                  } text-white`}
                >
                  Public
                </button>
                <button
                  onClick={(e) => setSelectedBtn("Contract")}
                  className={`w-full py-2 px-6 rounded-full bg-[#C3C3C5] ${
                    selectedBtn === "Contract" && "bg-[#1BB6ED]"
                  } text-white`}
                >
                  Contract
                </button>
              </div>
            </div>
          </div>

          <div className="shadow-primary rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.330962747641!2d90.38113137630452!3d23.735574478680547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c8e1ea9fd1%3A0xa6e274882fdbce53!2sDhaka%20College!5e0!3m2!1sen!2sbd!4v1700029911453!5m2!1sen!2sbd"
              width={"100%"}
              style={{ border: "0", height: "80vh" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
