import React, { useContext, useEffect, useState } from "react";
import MyProvider from "../../Provider/Provider";
import Profile from "../../components/Profile";
import { profileUserIcon } from "../../components/SVGIcons/Icons";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import p from "../../assets/p.webp";
import { BlocksIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userLoggedIn } from "@/features/auth/authSlice";

export default function ProfilePage() {
  const { isExpand, setIsExpand } = useContext(MyProvider);
  const { id } = useParams();
  const [actualUser, setActualUser] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { Axios } = useAxios();
  useEffect(() => {
    const user = async () => {
      await Axios.get(`/user/u/${id}`).then((res) => {
        setActualUser(res.data?.data?.user);
      });
    };
    user();
  }, []);

  const dispatch = useDispatch();

  const handleBlockUser = async (blockedUser) => {
    if (user?._id) {
      if (user?._id === actualUser?._id) {
        toast.error("You can't block yourself");
        return;
      } else if (user?.blocked_users?.includes(actualUser?._id)) {
        toast.error("You have already blocked this user!");
        return;
      } else {
        await Axios.put(`/user/block/${user?._id}`, {
          blockedUser,
        })
          .then((res) => {
            dispatch(
              userLoggedIn({
                user: res.data?.data,
                accessToken: user?.accessToken,
              })
            );

            toast.success("User blocked successfully");
          })
          .catch((err) => {
            toast.error(err?.message);
          });
      }
    } else {
      toast.error("You are not logged in");
      return;
    }
  };

  return (
    <div>
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
        <h1 className="text-[black] font-bold text-2xl">Profile details</h1>
        <Profile profile_images={actualUser.currentProfile} />
      </div>

      {actualUser && actualUser?.account_type !== "Private" ? (
        <div className="relative">
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={() => handleBlockUser(actualUser?._id)}
              className={`w-7 h-7  absolute top-0 right-8 cursor-pointer ${
                user?.blocked_users?.includes(actualUser?._id)
                  ? "text-gray-500"
                  : "text-red-500"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          }
          <div className="flex flex-col items-center gap-6 p-4 md:p-6 lg:p-10">
            <div className="h-24 w-24 ">
              <figure className="bg-[black] text-white rounded-full w-24 h-24 flex justify-center items-center">
                {actualUser?.profile_images?.length && (
                  <img
                    src={actualUser?.profile_images[0]}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                )}
              </figure>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-2xl flex items-center gap-3">
                {actualUser?.firstName} {actualUser?.lastName}{" "}
                {user?.blocked_users?.includes(actualUser?._id) && (
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-500  cursor-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </span>
                )}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Bio: {actualUser?.short_bio || "No bio available"}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl ">
              {actualUser?.profile_images?.map((l, i) => {
                return (
                  <div
                    key={i}
                    className="bg-gray-300 w-full h-48 object-cover items-center rounded-md flex"
                  >
                    <img
                      src={l}
                      className="h-full w-full overflow-hidden rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-red-500 absolute top-0 right-8 cursor-pointer"
            onClick={() => handleBlockUser(actualUser?._id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <div className="w-full flex justify-center">
            <figure className="border border-black rounded-full w-24 h-24 p-4  flex justify-center items-center">
              <img src={p} className="w-full h-full rounded-full" alt="" />
            </figure>
          </div>
          <h2 className="text-center mt-4">
            This user account is private. You can not see the details.
          </h2>
        </div>
      )}
    </div>
  );
}
