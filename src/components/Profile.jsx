import React, { Fragment, useEffect, useState } from "react";
// import useAxios from "../Hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { profileUserIcon } from "./SVGIcons/Icons";
import { Menu, Transition } from "@headlessui/react";
import { userLoggedOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
// import useAxios from "../../Hooks/useAxios";

const Profile = () => {
  const state = useSelector((state) => state.auth);

  const { user } = state || {};
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="">
      <div className=" w-56 text-right flex justify-end">
        {user?.profile_images?.length ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex  justify-center bg-black/20 text-sm font-medium text-white focus:outline-none  bg-[#30BEEC]  rounded-full w-10 h-10  items-center">
                <img
                  src={user?.profile_images[0]}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0   origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className=" ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? " text-violet-500" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-6 py-2 text-sm`}
                        onClick={() => {
                          localStorage.removeItem("authUser");
                          dispatch(userLoggedOut());
                          navigate("/login");
                        }}
                      >
                        LogOut
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className="flex bg-[#30BEEC] justify-center rounded-full w-10 h-10  items-center">
            {/* <span className="text-3xl ">{profileUserIcon}</span> */}
            <UserRound />
          </div>
        )}
      </div>
      {/* {user?.profile_images?.length ? (
        <Menu>
          <Menu.Button
            className={
              "bg-[#30BEEC] text-white rounded-full w-10 h-10 flex justify-center items-center"
            }
          >
            <img
              src={user?.profile_images[0]}
              className="w-full h-full rounded-full"
              alt=""
            />
          </Menu.Button>
        </Menu>
      ) : (
        <span className="text-6xl">{profileUserIcon}</span>
      )} */}
    </div>
  );
};

export default Profile;
