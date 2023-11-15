import appImage from "../../assets/app-download-screen.png";
import Sidebar from "../../components/Sidebar";

const downloadIcon = (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
const downloadRightIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 1024 1024"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path>
  </svg>
);
const loginIcons = (
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
    <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
    <path d="M3 12h13l-3 -3"></path>
    <path d="M13 15l3 -3"></path>
  </svg>
);

const HomeScreen = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <h1 className="text-[#1BB6ED] font-bold text-[24px] p-4">
          Home Screen
        </h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="bg-[#F2F6FF] rounded w-full">
              <div className="px-5 py-4">
                <a
                  href="#"
                  className="flex relative rounded-3xl text-lg min-w-[15rem] w-full bg-white shadow-md text-center py-[0.125rem]"
                >
                  <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                    {downloadIcon}
                  </span>
                  <span className="mx-auto text-lg"> Download app </span>
                </a>

                <div>
                  <figure>
                    <img
                      className="w-full object-cover"
                      src={appImage}
                      alt=""
                    />
                  </figure>
                </div>

                <article className="flex flex-col gap-2 my-11 text-center">
                  <a href="#"> Download link .......... </a>
                  <a href="#"> Download link .......... </a>
                </article>

                <button className="py-1 min-w-max bg-[#30BEEC] px-4 flex items-center justify-center relative rounded-3xl text-base text-white shadow-md text-center uppercase mx-auto">
                  <span> Download now </span>
                  <span className="text-2xl font-bold ml-3 mr-auto">
                    {downloadRightIcon}
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-[#F2F6FF] rounded w-full">item 2</div>

            <div className="bg-[#F2F6FF] rounded w-full">
              <div className="px-5 py-4">
                <div className="">
                  <a
                    href="#"
                    className="flex relative rounded-3xl text-lg min-w-[15rem] w-full bg-white shadow-md text-center py-[0.125rem]"
                  >
                    <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                      {loginIcons}
                    </span>
                    <span className="mx-auto text-lg"> Login </span>
                  </a>
                </div>

                <div className="mt-5">
                  <a
                    href="#"
                    className="flex relative rounded-3xl text-lg min-w-[15rem] w-full bg-white shadow-md text-center py-[0.125rem]"
                  >
                    <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                      {loginIcons}
                    </span>
                    <span className="mx-auto text-lg"> Registration </span>
                  </a>
                  <form className="mt-7">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between gap-10">
                        <div>
                          <input
                            type="text"
                            placeholder="First Name"
                            className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="last name"
                            className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="number"
                          placeholder="Phone Number"
                          className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                        />
                      </div>

                      <div className="relative">
                        <textarea
                          type="text"
                          placeholder="Short Bio"
                          className="py-3 px-4 text-base rounded-3xl shadow-md w-full resize-none focus:outline-none h-40"
                        ></textarea>
                        <p className="absolute right-5 bottom-5 text-gray-400">
                          150 letters
                        </p>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Connect Account"
                          className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
