import React, { useContext, useState } from "react";
import Profile from "../../components/Profile";
import Image from "../../assets/members/1.png";
import eventDetails from "../../assets/event.png";
import MyProvider from "../../Provider/Provider";
import MembersModal from "./MembersModal";
import GoogleMapReact from "google-map-react";
import MapMarker from "../Home/MapMarker";

const EventDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const { isExpand, setIsExpand } = useContext(MyProvider);

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }
  const defaultProps = {
    center: {
      lat: 23.7330218,
      lng: 90.3983829,
    },
    zoom: 11,
  };
  return (
    <section className="flex">
      <MembersModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      />
      <div className="w-full">
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
          <h1 className="text-[#1BB6ED] font-bold text-2xl">Event details</h1>
          <Profile />
        </div>
        <div className="p-6">
          <div className="w-full h-[300px]">
            <img
              src={eventDetails}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex justify-between mt-5">
              <h1 className="text-[24px] font-bold mb-1">
                Lunch menu uptp 50%
              </h1>
              <div className="flex items-center gap-5">
                <span className="flex items-center cursor-pointer">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="25px"
                    width="25px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M383.822 344.427c-16.045 0-31.024 5.326-41.721 15.979l-152.957-88.42c1.071-5.328 2.142-9.593 2.142-14.919 0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762 10.653 26.741 17.041 43.852 17.041 35.295 0 64.178-28.766 64.178-63.92C448 72.767 419.117 44 383.822 44c-35.297 0-64.179 28.767-64.179 63.92 0 5.327 1.065 9.593 2.142 14.919l-150.821 87.35c-11.767-10.654-26.741-17.041-43.856-17.041-35.296 0-63.108 28.766-63.108 63.92 0 35.153 28.877 63.92 64.178 63.92 17.115 0 32.089-6.389 43.856-17.042l151.891 88.421c-1.076 4.255-2.141 8.521-2.141 13.847 0 34.094 27.806 61.787 62.037 61.787 34.229 0 62.036-27.693 62.036-61.787.001-34.094-27.805-61.787-62.035-61.787z"></path>
                  </svg>
                </span>
                <button className="bg-[#E0F5FD] text-[#1BB6ED] py-2 px-6 rounded-lg font-semibold">
                  Join
                </button>
              </div>
            </div>
            <p className="text-black font-semibold mb-1">B&F</p>
            <p className="text-[#828282] text-[14px] font-medium">
              3 hours | 12, june 2021, 10:00 am
            </p>
          </div>

          <div className="mb-3">
            <span className="block text-[16px] font-medium text-[#333333] mb-4">
              24 people has joined
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={Image}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <img
                  src={Image}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <img
                  src={Image}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </div>
              <span className="w-[40px] h-[40px] text-[15px] rounded-full bg-[#1BB6ED] text-white flex items-center justify-center">
                24+
              </span>

              <span
                className="text-[15px] text-[#1BB6ED] cursor-pointer"
                onClick={handleOpenModal}
              >
                See all
              </span>
            </div>
          </div>

          <div className="mb-4 mt-8">
            <h3 className="text-[22px] font-semibold mb-1">Descriptions</h3>
            <p className="text-[#828282] text-[16px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, animi. Debitis aliquam fugiat quaerat alias ad numquam,
              hic natus deleniti molestiae voluptatem quam itaque placeat
              recusandae illum soluta exercitationem tenetur! Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Voluptate, animi. Debitis
              aliquam fugiat quaerat alias ad numquam, hic natus deleniti
              molestiae voluptatem quam itaque placeat recusandae illum soluta
              exercitationem tenetur!
            </p>
          </div>
          <div>
            <div className="flex items-start gap-3">
              <span className="flex items-center mt-2">
                <svg
                  stroke="currentColor"
                  fill="#828282"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M515.664-.368C305.76-.368 128 178.4 128 390.176c0 221.76 206.032 448.544 344.624 607.936.528.64 22.929 25.52 50.528 25.52h2.449c27.6 0 49.84-24.88 50.399-25.52 130.064-149.52 320-396.048 320-607.936C896 178.4 757.344-.368 515.664-.368zm12.832 955.552c-1.12 1.12-2.753 2.369-4.193 3.409-1.472-1.008-3.072-2.288-4.255-3.408l-16.737-19.248C371.92 785.2 192 578.785 192 390.176c0-177.008 148.224-326.56 323.664-326.56 218.528 0 316.336 164 316.336 326.56 0 143.184-102.128 333.296-303.504 565.008zm-15.377-761.776c-106.032 0-192 85.968-192 192s85.968 192 192 192 192-85.968 192-192-85.968-192-192-192zm0 320c-70.576 0-129.473-58.816-129.473-129.408 0-70.576 57.424-128 128-128 70.624 0 128 57.424 128 128 .032 70.592-55.903 129.408-126.527 129.408z"></path>
                </svg>
              </span>
              <div>
                <h3 className="text-[22px] font-semibold">Commonwealth Club</h3>
                <small className="text-[#828282] font-medium">
                  110 The Embarcadero, San Fransisco
                </small>
              </div>
            </div>
            <div className="mt-4 bg-white p-4 rounded-xl shadow-primary">
              <div
                style={{ border: "0", height: "300px", borderRadius: "16px" }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: import.meta.env.VITE_GOOGLE_API_KEY,
                  }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  <MapMarker
                    lat={23.7330218}
                    lng={90.3983829}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
