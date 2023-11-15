import VeryCard from "../../components/VeryCard";

const squareUserIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 256 256"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M172,120a44,44,0,1,1-44-44A44,44,0,0,1,172,120Zm52-72V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208h3.67a80.58,80.58,0,0,1,26.07-38.25q3.08-2.48,6.36-4.62a4,4,0,0,1,4.81.33,59.82,59.82,0,0,0,78.18,0,4,4,0,0,1,4.81-.33q3.28,2.15,6.36,4.62A80.58,80.58,0,0,1,204.33,208H208Z"></path>
  </svg>
);
const privateUserIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 32 32"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 16 5 C 12.144531 5 9 8.144531 9 12 C 9 14.410156 10.230469 16.550781 12.09375 17.8125 C 8.527344 19.34375 6 22.882813 6 27 L 8 27 C 8 24.109375 9.527344 21.59375 11.8125 20.1875 C 12.484375 21.835938 14.121094 23 16 23 C 17.878906 23 19.515625 21.835938 20.1875 20.1875 C 22.472656 21.59375 24 24.109375 24 27 L 26 27 C 26 22.882813 23.472656 19.34375 19.90625 17.8125 C 21.769531 16.550781 23 14.410156 23 12 C 23 8.144531 19.855469 5 16 5 Z M 16 7 C 18.773438 7 21 9.226563 21 12 C 21 14.773438 18.773438 17 16 17 C 13.226563 17 11 14.773438 11 12 C 11 9.226563 13.226563 7 16 7 Z M 16 19 C 16.820313 19 17.601563 19.117188 18.34375 19.34375 C 17.996094 20.308594 17.089844 21 16 21 C 14.910156 21 14.003906 20.308594 13.65625 19.34375 C 14.398438 19.117188 15.179688 19 16 19 Z"></path>
  </svg>
);
const profileUserIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ></path>
  </svg>
);
const notesIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
    <path d="M9 7l6 0"></path>
    <path d="M9 11l6 0"></path>
    <path d="M9 15l4 0"></path>
  </svg>
);
const businessIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 256 256"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M216,60H179.83A52,52,0,0,0,76.17,60H40A20,20,0,0,0,20,80V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V80A20,20,0,0,0,216,60ZM128,36a28,28,0,0,1,27.71,24H100.29A28,28,0,0,1,128,36Zm84,160H44V84H76V96a12,12,0,0,0,24,0V84h56V96a12,12,0,0,0,24,0V84h32Z"></path>
  </svg>
);
const settingIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const uploadIcons = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 20.25V18a.75.75 0 0 1 1.5 0v2.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V18a.75.75 0 0 1 1.5 0v2.25A1.75 1.75 0 0 1 18.25 22H5.75A1.75 1.75 0 0 1 4 20.25Z"></path>
    <path d="M5.22 9.53a.749.749 0 0 1 0-1.06l6.25-6.25a.749.749 0 0 1 1.06 0l6.25 6.25a.749.749 0 1 1-1.06 1.06l-4.97-4.969V16.75a.75.75 0 0 1-1.5 0V4.561L6.28 9.53a.749.749 0 0 1-1.06 0Z"></path>
  </svg>
);
const rightArrow = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);
const lockIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
    <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
  </svg>
);

const ProfileSetting = () => {
  return (
    <section>
      <div className="container mx-auto px-3">
        <h1 className="text-[#1BB6ED] font-bold text-[24px] p-4">
          Profile Setting
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-[#F2F6FF] rounded">
            <div className="flex flex-col items-center justify-center py-6 px-12">
              <a
                href="#"
                className="flex relative rounded-3xl text-lg min-w-[15rem] bg-white shadow-primary text-center py-[0.125rem]"
              >
                <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                  {notesIcon}
                </span>
                <span className="mx-auto text-lg"> Register </span>
              </a>
              <a
                href="#"
                className="py-2 px-3 flex items-center justify-center relative rounded-3xl text-lg w-full bg-white shadow-primary text-center mt-28"
              >
                <span className="text-[#30BEEC] text-2xl font-bold mr-6">
                  {squareUserIcon}{" "}
                </span>
                <p> Account </p>
              </a>

              <button className="py-2 min-w-[14rem] bg-[#30BEEC] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-primary text-center mt-32">
                <span className=" text-2xl font-bold mr-6">
                  {" "}
                  {privateUserIcon}{" "}
                </span>
                <span>Private</span>
              </button>

              <button className="py-2 min-w-[14rem] bg-gray-300 px-3 flex items-center justify-center relative rounded-3xl text-lg text-slate-950 shadow-primary text-center font-semibold mt-16">
                <span className=" text-2xl font-bold mr-6">
                  {businessIcon}{" "}
                </span>
                <span>Busniess</span>
              </button>
            </div>
          </div>

          <div className="bg-[#F2F6FF] rounded">
            <div className="flex flex-col items-center justify-center py-6 px-12">
              <a
                href="#"
                className="flex relative rounded-3xl text-lg min-w-[15rem] bg-white shadow-primary text-center py-[0.125rem]"
              >
                <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                  {settingIcon}
                </span>
                <span className="mx-auto text-lg"> Profile </span>
              </a>

              <div className="mt-10">
                <figure className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-24 h-24 flex justify-center items-center">
                  <span className="text-6xl">{profileUserIcon}</span>
                </figure>

                <div className="text-center">
                  <h2 className="text-2xl font-semibold"> Username </h2>
                  <p className="text-gray-500 text-xs">.......@gmail.com</p>
                </div>
              </div>

              <form className="mt-7">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-10">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="last name"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      type="text"
                      placeholder="Short Bio"
                      className="py-3 px-4 text-base rounded-3xl shadow-primary w-full resize-none focus:outline-none h-40"
                    ></textarea>
                    <p className="absolute right-5 bottom-5 text-gray-400">
                      150 letters
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Connect Account"
                      className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                    />
                  </div>

                  <button className="text-[#30BEEC] py-0.5 px-3 flex items-center justify-left relative rounded-3xl text-lg w-full bg-white shadow-primary text-center">
                    <span> Upload Pictures </span>
                    <span className="text-[#30BEEC] text-2xl rounded-full w-7 h-7 flex justify-center items-center absolute right-1 top-0.5">
                      {rightArrow}
                    </span>
                  </button>
                </div>
              </form>

              <button className="py-2 min-w-[14rem] bg-[#30BEEC] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-primary text-center mt-10">
                <span>Start</span>
              </button>
            </div>
          </div>

          <div className="bg-[#F2F6FF] rounded">
            <div className="flex flex-col items-center justify-center py-6 px-12">
              <a
                href="#"
                className="flex relative rounded-3xl text-lg min-w-[15rem] bg-white shadow-primary text-center py-[0.125rem]"
              >
                <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                  {uploadIcons}
                </span>
                <span className="mx-auto text-lg text-gray-600">
                  Upload Pictures
                </span>
              </a>

              <form className="mt-7">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-5">
                    <VeryCard />
                    <VeryCard />
                    <VeryCard />
                    <VeryCard />
                    <VeryCard />
                    <VeryCard />
                  </div>

                  <div
                    href="#"
                    className="flex relative rounded-3xl text-lg min-w-[15rem] bg-white shadow-primary text-center py-[0.125rem] w-60 overflow-hidden pl-7 mx-auto mt-12"
                  >
                    <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-[0.25rem] ">
                      {lockIcon}
                    </span>

                    <input
                      type="number"
                      placeholder="Phone Verification"
                      className="py-1 px-4 text-base w-full"
                    />
                  </div>

                  <div>
                    <div className="flex gap-1 text-center justify-center items-center">
                      <input
                        onKeyUp={(e) => {
                          {
                            console.log("e.target.value ", e.target.value);
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center "
                      />
                      <input
                        onKeyUp={(e) => {
                          {
                            console.log("e.target.value ", e.target.value);
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center "
                      />
                      <input
                        onKeyUp={(e) => {
                          {
                            console.log("e.target.value ", e.target.value);
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center"
                      />
                      <input
                        onKeyUp={(e) => {
                          {
                            console.log("e.target.value ", e.target.value);
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center"
                      />
                      <input
                        onKeyUp={(e) => {
                          {
                            console.log("e.target.value ", e.target.value);
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center"
                      />
                    </div>
                  </div>
                </div>
              </form>

              <button className="py-2 min-w-[14rem] bg-[#30BEEC] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-primary text-center mt-10">
                <span> Done </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSetting;
