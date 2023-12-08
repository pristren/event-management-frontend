import { useContext, useEffect, useRef, useState } from "react";
import VeryCard from "../../components/VeryCard";
import Profile from "../../components/Profile";
import MyProvider from "../../Provider/Provider";
import { useSelector } from "react-redux";
import {
  businessIcon,
  lockIcon,
  privateUserIcon,
  profileUserIcon,
  rightArrow,
  settingIcon,
  uploadIcons,
} from "../../components/SVGIcons/Icons";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const ProfileSetting = () => {
  const { Axios } = useAxios();
  const [number, setNumber] = useState();
  const [selectedBtn, setSelectedBtn] = useState("Private");
  const [upload, setUpload] = useState(false);
  const state = useSelector((state) => state.auth);
  const [inputData, setInputData] = useState({});
  const [verifyPin, setVerifyPin] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
  });
  const { isExpand, setIsExpand } = useContext(MyProvider);

  useEffect(() => {
    setInputData(state.user);
  }, []);

  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  const [selectedFile, setSelectedFile] = useState([]);
  const handleUploadFileChange = (event) => {
    // Handle the selected file(s) here
    const file = event.target.files[0];
    setSelectedFile([...selectedFile, file]);
  };

  const handleInputChange = (event) => {
    // event.persist();
    setInputData((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("number ", number);
    console.log("verifyPin ", verifyPin);
    // function here.....
    const newData = { ...inputData, account_type: selectedBtn };
    Axios.put(`/user/updates/${state.user._id}`, newData).then((res) => {
      console.log(res);
    });
  };

  return (
    <section className="flex">
      <div>
        <div className="flex items-center justify-between pt-4 pb-5 sm:pb-10 px-4">
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
          <h1 className="text-[#1BB6ED] font-bold text-2xl">Profile Setting</h1>
          <Profile />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#F2F6FF] rounded">
            <div className="flex flex-col items-center justify-center py-6 px-12">
              <a
                href="#"
                className="flex relative rounded-3xl text-lg min-w-[15rem] bg-white shadow-md text-center py-[0.125rem]"
              >
                <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                  {settingIcon}
                </span>
                <span className="mx-auto text-lg">Profile</span>
              </a>

              <div className="mt-10 flex flex-col items-center mb-3">
                <figure className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-24 h-24 flex justify-center items-center">
                  <span className="text-6xl">{profileUserIcon}</span>
                </figure>

                <div className="text-center">
                  <h2 className="text-2xl font-semibold">
                    {state?.user?.firstName}
                    {state?.user?.lastName}
                  </h2>
                  <p className="text-gray-500 text-base">
                    {state?.user?.email}
                  </p>
                </div>
              </div>

              <form className="mt-7">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-10">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={inputData?.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={inputData?.lastName}
                        onChange={handleInputChange}
                        placeholder="last name"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="number"
                      name="phone"
                      value={inputData?.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      type="text"
                      name="sort_bio"
                      value={inputData?.sort_bio}
                      onChange={handleInputChange}
                      placeholder="Short Bio"
                      className="py-3 px-4 text-base rounded-3xl shadow-md w-full resize-none focus:outline-none h-40"
                    ></textarea>
                    <p className="absolute right-5 bottom-5 text-gray-400">
                      150 letters
                    </p>
                  </div>

                  <div>
                    <input
                      value={inputData?.connect_account}
                      onChange={handleInputChange}
                      type="text"
                      name="connect_account"
                      placeholder="Connect Account"
                      className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full"
                    />
                  </div>

                  <button
                    onClick={() => setUpload(!upload)}
                    onChange={handleInputChange}
                    type="button"
                    className="text-[#30BEEC] py-0.5 px-3 flex items-center justify-left relative rounded-3xl text-lg w-full bg-white shadow-md text-center"
                  >
                    <span> Upload Pictures </span>
                    <span className="text-[#30BEEC] text-2xl rounded-full w-7 h-7 flex justify-center items-center absolute right-1 top-0.5">
                      {rightArrow}
                    </span>
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-5 items-center justify-center my-8">
                <button
                  onClick={(e) => setSelectedBtn("Private")}
                  className={`flex gap-3 py-2 min-w-[14rem] px-3 items-center justify-center rounded-3xl text-lg shadow-md text-center ${
                    selectedBtn === "Private"
                      ? "bg-[#1BB6ED] text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <span>{privateUserIcon}</span>
                  <span>Private</span>
                </button>

                <button
                  onClick={(e) => setSelectedBtn("Business")}
                  className={`flex gap-3 py-2 min-w-[14rem] px-3 items-center justify-center rounded-3xl text-lg text-slate-950 shadow-md text-center font-semibold ${
                    selectedBtn === "Business"
                      ? "bg-[#1BB6ED] text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <span>{businessIcon}</span>
                  <span>Business</span>
                </button>
              </div>

              <button className="py-2 min-w-[14rem] bg-[#30BEEC] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-md text-center mt-10">
                <span>Save</span>
              </button>
            </div>
          </div>

          <div
            className={`bg-[#F2F6FF] rounded transition-opacity delay-300 ${
              upload ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="flex flex-col items-center justify-center py-6 px-12">
              <div
                onClick={handleDivClick}
                className="cursor-pointer flex relative rounded-3xl text-lg min-w-[15rem] bg-white shadow-md text-center py-[0.125rem]"
              >
                <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                  {uploadIcons}
                </span>
                <span className="mx-auto text-lg text-gray-600">
                  Upload Pictures
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleUploadFileChange}
                  accept="image/*"
                />
              </div>

              <form className="mt-7">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-5">
                    {selectedFile?.map((img, i) => (
                      <VeryCard key={i} imge={img} />
                    ))}
                    {/* // }
                    // <VeryCard />
                    // <VeryCard />
                    // <VeryCard />
                    // <VeryCard />
                    // <VeryCard /> */}
                  </div>
                  <div className="w-[80%] mx-auto flex justify-between items-center gap-2 rounded-3xl text-lg min-w-[15rem] bg-white shadow-md px-1 overflow-hidden mt-8 mb-2">
                    <span className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center">
                      {lockIcon}
                    </span>

                    <input
                      onKeyUp={(e) => setNumber(e.target.value)}
                      type="number"
                      placeholder="Phone Verification"
                      className="py-2 px-4 text-base w-full outline-none border-none"
                    />
                  </div>

                  <div>
                    <div className="flex gap-1 text-center justify-center items-center">
                      <input
                        onKeyDown={(e) => (e.target.value = "")}
                        onKeyUp={(e) => {
                          {
                            setVerifyPin({ ...verifyPin, one: e.target.value });
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        require="true"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center "
                      />
                      <input
                        onKeyDown={(e) => (e.target.value = "")}
                        onKeyUp={(e) => {
                          {
                            setVerifyPin({ ...verifyPin, two: e.target.value });
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        require="true"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center "
                      />
                      <input
                        onKeyDown={(e) => {
                          e.target.value = "";
                        }}
                        onKeyUp={(e) => {
                          {
                            setVerifyPin({
                              ...verifyPin,
                              three: e.target.value,
                            });
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        require="true"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center"
                      />
                      <input
                        onKeyDown={(e) => (e.target.value = "")}
                        onKeyUp={(e) => {
                          {
                            setVerifyPin({
                              ...verifyPin,
                              four: e.target.value,
                            });
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        require="true"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center"
                      />
                      <input
                        onKeyDown={(e) => (e.target.value = "")}
                        onKeyUp={(e) => {
                          {
                            setVerifyPin({
                              ...verifyPin,
                              five: e.target.value,
                            });
                            e.target.value = Array(e.target.value.length).fill(
                              "*"
                            );
                          }
                        }}
                        maxLength="1"
                        require="true"
                        type="text"
                        className="text-2xl px-1 w-[2.5rem] h-[3rem] rounded-xl border-[2px] border-gray-400 text-center flex justify-center items-center"
                      />
                    </div>
                  </div>
                </div>
              </form>

              <button
                onClick={handleSubmit}
                className="py-2 min-w-[14rem] bg-[#30BEEC] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-md text-center mt-10"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSetting;
