import React, { useContext, useEffect, useState } from "react";
import MyProvider from "../../Provider/Provider";
import Profile from "../../components/Profile";
import { profileUserIcon } from "../../components/SVGIcons/Icons";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

export default function ProfilePage() {
  const { isExpand, setIsExpand } = useContext(MyProvider);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const { Axios } = useAxios();
  useEffect(() => {
    const user = async () => {
      await Axios.get(`/user/u/${id}`).then((res) => {
        setUser(res.data?.data?.user);
      });
    };
    user();
  }, []);
  return (
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
        <h1 className="text-[#1BB6ED] font-bold text-2xl">Profile details</h1>
        <Profile />
      </div>

      {user && user?.account_type !== "Private" ? (
        <div className="">
          <div className="flex flex-col items-center gap-6 p-4 md:p-6 lg:p-10">
            <div className="h-24 w-24 ">
              <figure className="bg-[#30BEEC] text-white px-1 py-1 rounded-full w-24 h-24 flex justify-center items-center">
                <span className="text-6xl">{profileUserIcon}</span>
              </figure>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-2xl">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl ">
              {user?.profile_images?.map((l, i) => {
                return (
                  <div
                    key={i}
                    className="bg-gray-300 w-full h-48 object-cover items-center rounded-md flex"
                  >
                    <img
                      src={l}
                      className="h-auto w-full overflow-hidden rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center">
            This user account is private. You can not see the details.
          </h2>
        </div>
      )}
    </div>
  );
}
