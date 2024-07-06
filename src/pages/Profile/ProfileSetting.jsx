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
import { userLoggedIn, userLoggedOut } from "../../features/auth/authSlice";
import ImageUploader from "react-images-upload";
import { toast } from "react-hot-toast";
// import useMyEvent from "../../Hooks/useMyEvent";
import { ChevronDown, ChevronUp, UserRound } from "lucide-react";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";

const ProfileSetting = () => {
  const { Axios } = useAxios();
  // const [number, setNumber] = useState();
  const [selectedBtn, setSelectedBtn] = useState("");
  const [upload, setUpload] = useState(false);
  const state = useSelector((state) => state.auth);
  const { accessToken } = state;
  // console.log(state);
  const [inputData, setInputData] = useState({});

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  const { isExpand, setIsExpand } = useContext(MyProvider);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [addPhone, setAddPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    onlyPhone: "",
    phoneWithCode: "",
    countryCode: "",
  });

  const handleDeleteAccount = async () => {
    if (password === "") {
      toast.error("Please enter your password.");
      return;
    }
    setDeleteLoading(true);
    await Axios.put(
      `/user/request/delete/${inputData?._id}`,
      {
        password: password,
        email: inputData?.email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        toast.success("Account deletion request sent successfully.");
        setOpenModal(false);
        localStorage.removeItem("authUser");
        dispatch(userLoggedOut());
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast.error("Incorrect password.");
        } else if (err.response.status === 404) {
          toast.error("User not found.");
        } else {
          toast.error("Error while deleting the account.");
        }
      })
      .finally(() => {
        setDeleteLoading(false);
        setPassword("");
      });
  };

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
      onlyPhone: phoneNumber.onlyPhone,
      phoneWithCode: phoneNumber.phoneWithCode,
      countryCode: phoneNumber.countryCode,
    };
    if (event_img.length === 0) {
      await Axios.put(
        `/user/update/profile/${state.user._id}`,
        {
          profile_image: "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
    Axios.put(`/user/updates/${state.user._id}`, newData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
        setAddPhone(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("error while updating the profile.");
        setAddPhone(false);
      });
  };

  const setProfileInDb = async (img) => {
    if (state?.user?.profile_images?.includes(img)) {
      try {
        const res = await Axios.put(
          `/user/update/profile/${state.user._id}`,
          {
            profile_image: img,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
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
      const res = await Axios.put(
        `/user/update/profile/${state.user._id}`,
        {
          profile_image: img,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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

                    <div className="flex items-center justify-between gap-x-4">
                      {/* <input
                        type="text"
                        // name="phone"

                        // onChange={handleInputChange}
                        placeholder="Phone Number 2"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-md w-full bg-white  disabled:opacity-60"
                        defaultValue={inputData?.phoneWithCode}
                        // disabled
                      /> */}

                      <input
                        type="text"
                        name="phoneWithCode"
                        value={inputData?.phoneWithCode}
                        onChange={() => {}}
                        disabled
                        placeholder="Phone Number"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-md 
                          disabled:opacity-50 disabled:bg-white
                          w-full"
                      />

                      {inputData?.phoneWithCode === "" ? (
                        <Button
                          variant=""
                          type="button"
                          onClick={() => setAddPhone(!addPhone)}
                        >
                          Add Phone{" "}
                          {!addPhone ? (
                            <ChevronDown className="w-5 h-5 " />
                          ) : (
                            <ChevronUp className="w-5 h-5" />
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            toast(
                              "Please contact at dailyframeapp@gmail.com to change your phone number.",
                              {
                                icon: "👏",
                                position: "bottom-right",
                              }
                            );
                          }}
                          type="button"
                          variant="default"
                        >
                          Update Phone
                        </Button>
                      )}
                    </div>
                    <div className="">
                      {addPhone && (
                        <PhoneInput
                          buttonStyle={{
                            border: "none",
                            padding: "0.5rem",
                          }}
                          placeholder="Phone Number"
                          inputStyle={{
                            // padding: "0.5rem 1rem",
                            borderRadius: "5rem",
                            width: "100%",
                            border: "none",
                          }}
                          country={"ch"}
                          value={phoneNumber.phoneWithCode}
                          // value={signUpData?.phoneWithCode}
                          onChange={
                            (phone, country, e, formatted) => {
                              const code = `${country.dialCode}`;
                              const withoutCode = phone.replace(code, "");
                              const newPhone = `+${code}${withoutCode}`;

                              setPhoneNumber((inputs) => ({
                                ...inputs,
                                onlyPhone: withoutCode,
                                phoneWithCode: newPhone,
                                countryCode: `+${code}`,
                              }));
                            }

                            // console.log({ phone, country, e, formatted })
                          }
                        />
                      )}
                    </div>

                    <div className="relative">
                      <textarea
                        type="text"
                        name="short_bio"
                        value={inputData?.short_bio || ""}
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
                  className="py-2 min-w-[14rem] bg-[black] px-3 flex items-center justify-center relative rounded-3xl text-lg text-white shadow-md text-center mt-4"
                >
                  <span>Update Profile</span>
                </button>
                <Dialog open={openModal} onOpenChange={setOpenModal}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-red-100 text-red-500 hover:text-red-600 hover:bg-red-200 rounded-3xl mt-6"
                      variant="outline"
                    >
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className={"space-y-2"}>
                      <DialogTitle>
                        Are you sure you want to delete your account?
                      </DialogTitle>
                      <DialogDescription className=" text-gray-500">
                        This action cannot be undone. This will permanently
                        delete your account. Please type your password to
                        confirm.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogDescription>
                      <Input
                        type="password"
                        className="w-full border rounded-lg px-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </DialogDescription>
                    <DialogFooter>
                      <Button
                        onClick={() => setOpenModal(false)}
                        className=""
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        className=""
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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

                      {loading && <div>loading...</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileSetting;
