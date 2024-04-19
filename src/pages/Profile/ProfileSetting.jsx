import { useContext, useEffect, useRef, useState } from "react";
import VeryCard from "../../components/VeryCard";
import Profile from "../../components/Profile";
import MyProvider from "../../Provider/Provider";
import { useDispatch, useSelector } from "react-redux";
import {
  businessIcon,
  // lockIcon,
  privateUserIcon,
  // profileUserIcon,
  rightArrow,
  settingIcon,
  uploadIcons,
} from "../../components/SVGIcons/Icons";
// import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import { userLoggedIn } from "../../features/auth/authSlice";
import ImageUploader from "react-images-upload";
import { toast } from "react-hot-toast";
// import useMyEvent from "../../Hooks/useMyEvent";
import { UserRound } from "lucide-react";
import Loader from "@/components/Loader/Loader";

const ProfileSetting = () => {
  const { Axios } = useAxios();
  // const [number, setNumber] = useState();
  const [selectedBtn, setSelectedBtn] = useState("");
  const [upload, setUpload] = useState(false);
  const state = useSelector((state) => state.auth);
  // console.log(state);
  const [inputData, setInputData] = useState({});
  // const [verifyPin, setVerifyPin] = useState({
  //   one: "",
  //   two: "",
  //   three: "",
  //   four: "",
  //   five: "",
  // });
  const { isExpand, setIsExpand } = useContext(MyProvider);
  // const { phone, setPhone, sendOtp } = useMyEvent();

  useEffect(() => {
    if (state.user) {
      setInputData(state?.user);
      setSelectedBtn(state?.user?.account_type);
      setUploadImages(state?.user?.profile_images);
      if (state?.user?.profile_images?.length) {
        setUpload(true);
      }
    }
  }, [state.user, state?.user?.profile_images]);

  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  const [uploadImages, setUploadImages] = useState([]);
  const [profile_images, setProfileImages] = useState("");
  const API_KEY = "c8818fe821c0aee81ebf0b77344f0e2b";
  // useEffect(() => {
  //   setUploadImages(state?.user?.profile_images);
  //   const profile = localStorage.getItem("profile_image");
  //   if (!profile) {
  //     setProfileImages(state?.user?.profile_images[0]);
  //   }
  //   if (state?.user?.profile_images?.length) {
  //     setUpload(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   const profile = localStorage.getItem("profile_image");
  //   if (profile) {
  //     setProfileImages(JSON.parse(profile));
  //   }
  // }, []);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    // event.persist();
    setInputData((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const event_img = uploadImages?.filter(
      (obj, index, array) => array.findIndex((item) => item === obj) === index
    );
    const newData = {
      ...inputData,
      account_type: selectedBtn,
      profile_images: event_img,
    };
    if (event_img.length === 0) {
      await Axios.put(`/user/update/profile/${state.user._id}`, {
        profile_image: "",
      });
    }
    Axios.put(`/user/updates/${state.user._id}`, newData)
      .then((res) => {
        // console.log(res.data);
        setUploadImages(res.data?.profile_images);
        setInputData(res.data);
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            accessToken: state.accessToken,
            // user: res.data,
          })
        );
        if (state?.user?.currentProfile === "") {
          setProfileFirst(uploadImages[0]);
        }

        dispatch(
          userLoggedIn({
            accessToken: state.accessToken,
            user: res.data,
          })
        );
        setLoading(false);
        toast.success("profile update was successful.");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("error while updating the profile.");
      });
  };

  const setProfileInDb = async (img) => {
    if (state?.user?.profile_images?.includes(img)) {
      try {
        const res = await Axios.put(`/user/update/profile/${state.user._id}`, {
          profile_image: img,
        });
        setInputData(res.data);
        dispatch(
          userLoggedIn({
            accessToken: state.accessToken,
            user: res.data,
          })
        );
        setLoading(false);
        toast.success("Profile picture updated successfully.");
      } catch (error) {
        setLoading(false);
        toast.error("Error updating profile picture.");
      }
    } else {
      toast.error(
        "Update Your Pictures First. Then select it to make profile picture."
      );
    }
  };
  const setProfileFirst = async (img) => {
    try {
      const res = await Axios.put(`/user/update/profile/${state.user._id}`, {
        profile_image: img,
      });
      setInputData(res.data);
      dispatch(
        userLoggedIn({
          accessToken: state.accessToken,
          user: res.data,
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImgDelete = (url) => {
    const res = uploadImages.filter((u) => u !== url);
    setUploadImages(res);
  };

  const onDrop = async (pictureFiles) => {
    setLoading(true);
    // setPictures(pictureFiles);
    let uploadedImagesArray = [];

    for (const image of pictureFiles) {
      const formData = new FormData();
      formData.append("image", image);

      const response = await Axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData
      );

      uploadedImagesArray.push(response?.data?.data?.url);
    }

    if (uploadedImagesArray?.length) {
      setLoading(false);
      setUploadImages([...uploadImages, ...uploadedImagesArray]);
      uploadedImagesArray = [];
    }
    setLoading(false);
  };
  const handleImgChange = (img) => {
    setProfileImages(img);
    // localStorage.setItem("profile_image", JSON.stringify(img));
    setProfileInDb(img);
  };

  return (
    <section className="flex  ">
      <div className=" w-full">
        <div className="flex items-center justify-between pt-4 pb-5 sm:pb-10 px-4">
          <span
            className="cursor-pointer sm:hidden"
            onClick={() => setIsExpand(!isExpand)}
          >
            <svg
              stroke="currentColor"
              fill="black"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="23px"
              width="23px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </span>
          <h1 className="text-[black] font-bold text-2xl">Profile Setting</h1>
          <Profile profile_images={state?.user?.currentProfile} />
        </div>

        {loading ? (
          <div className="min-h-full">
            <Loader></Loader>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#F2F6FF] rounded">
              <div className="flex flex-col items-center justify-center py-6 px-12">
                <div className="flex relative rounded-3xl text-lg min-w-[15rem] bg-white shadow-md text-center py-[0.125rem]">
                  <span className="bg-[black] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                    {settingIcon}
                  </span>
                  <span className="mx-auto text-lg">Profile</span>
                </div>

                <div className="mt-10 flex flex-col items-center mb-3">
                  <figure className="bg-[black] text-white  rounded-full  w-24 h-24 flex justify-center items-center">
                    {state?.user?.currentProfile ? (
                      <img
                        src={state?.user?.currentProfile}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      // <span className="text-6xl">{profileUserIcon}</span>
                      <UserRound className="w-16 h-16 " />
                    )}
                  </figure>

                  <div className="text-center">
                    <h2 className="text-2xl font-semibold">
                      {state?.user?.firstName} {state?.user?.lastName}
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
                        name="short_bio"
                        value={inputData?.short_bio}
                        onChange={handleInputChange}
                        placeholder="Short Bio"
                        className="py-3 px-4 text-base rounded-3xl shadow-md w-full resize-none focus:outline-none h-40"
                      ></textarea>
                      <p className="absolute right-5 bottom-5 text-gray-400">
                        150 letters
                      </p>
                    </div>

                    <button
                      onClick={() => setUpload(!upload)}
                      onChange={handleInputChange}
                      type="button"
                      className="text-[black] py-0.5 px-3 flex items-center justify-left relative rounded-3xl text-lg w-full bg-white shadow-md text-center"
                    >
                      <span> Upload Pictures </span>
                      <span className="text-[black] text-2xl rounded-full w-7 h-7 flex justify-center items-center absolute right-1 top-0.5">
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
                        ? "bg-[black] text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    <span>{privateUserIcon}</span>
                    <span>Private</span>
                  </button>

                  <button
                    onClick={(e) => setSelectedBtn("Public")}
                    className={`flex gap-3 py-2 min-w-[14rem] px-3 items-center justify-center rounded-3xl text-lg text-slate-950 shadow-md text-center font-semibold ${
                      selectedBtn === "Public"
                        ? "bg-[black] text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    <span>{businessIcon}</span>
                    <span>Public</span>
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  className="py-2 min-w-[14rem] bg-[black] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-md text-center mt-10"
                >
                  <span>Update Profile</span>
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
                  <span className="bg-[black] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                    {uploadIcons}
                  </span>
                  <span className="mx-auto text-lg text-gray-600">
                    Upload Pictures
                  </span>
                </div>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={onDrop}
                  maxFileSize={5242880}
                  className="border-none"
                />

                <div className="mt-7">
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5">
                      {uploadImages
                        ?.filter(
                          (obj, index, array) =>
                            array.findIndex((item) => item === obj) === index
                        )
                        ?.map((img, i) => (
                          <VeryCard
                            key={i}
                            img={img}
                            handleImgChange={handleImgChange}
                            handleImgDelete={handleImgDelete}
                          />
                        ))}
                      {/* {state?.user?.profile_images
                        ?.filter(
                          (obj, index, array) =>
                            array.findIndex((item) => item === obj) === index
                        )
                        ?.map((img, i) => (
                          <VeryCard
                            key={i}
                            img={img}
                            handleImgChange={handleImgChange}
                            handleImgDelete={handleImgDelete}
                          />
                        ))} */}
                      {loading && <div>loading...</div>}
                    </div>
                    {/* <div className="w-[80%] mx-auto flex justify-between items-center gap-2 rounded-3xl text-lg min-w-[15rem] bg-white shadow-md px-1 overflow-hidden mt-8 mb-2">
                    <span className="bg-[black] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center">
                      {lockIcon}
                    </span>

                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      value={phone}
                      placeholder="Phone Verification"
                      className="py-2 px-4 text-base w-full outline-none border-none"
                    />
                  </div>
                  <div className="">
                    <button
                      type="button"
                      id="sign-in-button"
                      // onClick={sendOtp}
                      className="py-2 min-w-[14rem] bg-[black] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-md text-center mx-auto mb-4"
                    >
                      <span>Send Otp</span>
                    </button>
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
                  </div> */}
                  </div>
                </div>

                {/* <button
                // onClick={handleSubmit}
                className="py-2 min-w-[14rem] bg-[black] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-md text-center mt-10"
              >
                <span>Verify Phone</span>
              </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileSetting;
