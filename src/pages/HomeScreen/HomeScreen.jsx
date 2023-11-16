import { Link } from "react-router-dom";
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
const userIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
  </svg>
);
const lockIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
  </svg>
);

const HomeScreen = () => {
  return (
    <div className="flex max-w-7xl mx-auto">
      <Sidebar />
      <div>
        <h1 className="text-[#1BB6ED] font-bold text-2xl p-4">Home Screen</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="bg-[#F2F6FF] rounded w-full">
              <div className="px-5 py-4">
                <a
                  href="#"
                  className="flex relative rounded-3xl text-lg min-w-[15rem] w-full bg-white shadow-primary text-center py-[0.125rem]"
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

                <button className="py-1 min-w-max bg-[#30BEEC] px-4 flex items-center justify-center relative rounded-3xl text-base text-white shadow-primary text-center uppercase mx-auto hover:bg-white hover:text-black transition duration-300">
                  <span> Download now </span>
                  <span className="text-2xl font-bold ml-3 mr-auto">
                    {downloadRightIcon}
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-[#F2F6FF] rounded w-full">
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.330962747641!2d90.38113137630452!3d23.735574478680547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c8e1ea9fd1%3A0xa6e274882fdbce53!2sDhaka%20College!5e0!3m2!1sen!2sbd!4v1700029911453!5m2!1sen!2sbd"
                  width={"100%"}
                  style={{ border: "0", height: "100vh" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="bg-[#F2F6FF] rounded w-full">
              <div className="px-5 py-4">
                <div className="mb-10">
                  <a
                    href="#"
                    className="flex relative rounded-3xl text-lg min-w-[15rem] w-full bg-white shadow-primary text-center py-[0.125rem]"
                  >
                    <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                      {loginIcons}
                    </span>
                    <span className="mx-auto text-lg"> Login </span>
                  </a>

                  <form>
                    <div className=" mb-4">
                      <div className="my-3 relative">
                        <span className="text-[#30BEEC] absolute left-3 top-4 text-lg">
                          {userIcon}
                        </span>
                        <input
                          className="pl-10 pr-4 py-3 bg-white rounded-md border-gray-400 w-full shadow-primary"
                          type="text"
                          placeholder="Username"
                        />
                      </div>

                      <div className="my-3 relative">
                        <span className="text-[#30BEEC] absolute left-3 top-4 text-lg">
                          {lockIcon}
                        </span>
                        <input
                          className="pl-10 pr-4 py-3 bg-white rounded-md border-gray-400 w-full shadow-primary"
                          type="text"
                          placeholder="Password"
                        />
                      </div>

                      <div className="my-3 relative">
                        <div className="flex items-center justify-between">
                          <div className="">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              className="cursor-pointer"
                            />
                            <label htmlFor="rememberMe"> Remember Me </label>
                          </div>
                          <Link className="italic" to="#">
                            {" "}
                            Forget Password?{" "}
                          </Link>
                        </div>
                      </div>

                      <button className="flex relative rounded-xl text-lg max-w-[10rem] w-full bg-[#30BEEC] hover:bg-white text-white hover:text-black shadow-primary text-center py-[0.3rem] transition duration-300 uppercase">
                        <span className="mx-auto text-lg"> Login </span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-5">
                  <a
                    href="#"
                    className="flex relative rounded-3xl text-lg max-w-[14rem] mx-auto bg-white shadow-primary text-center py-[0.125rem]"
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
                          type="email"
                          placeholder="Email"
                          className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                        />
                      </div>

                      <div>
                        <input
                          type="password"
                          placeholder="Password"
                          className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                        />
                      </div>

                      <div>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                        />
                      </div>

                      <div className="">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="cursor-pointer"
                        />
                        <label htmlFor="rememberMe"> Remember Me </label>
                      </div>

                      <button className="flex relative rounded-3xl text-lg min-w-[15rem] w-full bg-[#30BEEC] hover:bg-white text-white hover:text-black shadow-primary text-center py-[0.125rem] transition duration-300 uppercase">
                        <span className="mx-auto text-lg"> Register now </span>
                      </button>
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
