import React, { useContext, useState } from "react";
import Profile from "../../components/Profile";
import Image from "../../assets/members/1.png";
import MyProvider from "../../Provider/Provider";
import MembersModal from "./MembersModal";
import useAxios from "../../Hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import AddImageModal from "./AddImageModal";
import like from "../../assets/like.svg";

import CreateEventModal from "../CreateEvent/CreateEventModal";
import ShareModal from "./ShareModal";
import { ThumbsUp, UserRound } from "lucide-react";
import mapIcon from "../../assets/logo-white-bg-removebg-preview.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Loader from "@/components/Loader/Loader";

const EventDetails = () => {
  const { user } = useSelector((state) => state?.auth);

  const [loading, setLoading] = useState(true);

  const { Axios } = useAxios();
  const [openModal, setOpenModal] = useState(false);
  const [like, setLike] = useState(false);
  const [events, setEvents] = useState({});
  const [userLocation, setUserLocation] = useState({});
  const navigate = useNavigate();
  const { isExpand, setIsExpand } = useContext(MyProvider);
  const { id } = useParams();
  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  useEffect(() => {
    // setLoading(true);
    Axios.get(`/event-details/${id}`)
      .then((res) => setEvents(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  const defaultProps = {
    center: {
      lat:
        events?.mapLocation?.lat !== undefined
          ? Number(events?.mapLocation?.lat)
          : events?.mapLocation?.lat,
      lng:
        events?.mapLocation?.lng !== undefined
          ? Number(events?.mapLocation?.lng)
          : events?.mapLocation?.lng,
    },
    zoom: 15,
  };
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         setUserLocation({
  //           center: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //           zoom: 11,
  //         });
  //       },
  //       function (error) {
  //         console.error(error);
  //       },
  //       { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);
  const [popover, setPopOver] = useState(false);

  const handleJoin = async (id) => {
    await Axios.put(`/join/${id}`, { email: user?.email }).then((res) => {
      if (res.status === 200) {
        Axios.get(`/event-details/${id}`)
          .then((res) => setEvents(res.data.data))
          .catch((err) => console.log(err));
      }
    });
  };

  const handleLeave = async (id) => {
    await Axios.put(`/unjoin/${id}`, { email: user?.email }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        Axios.get(`/event-details/${id}`)
          .then((res) => setEvents(res.data.data))
          .catch((err) => console.log(err));
      }
    });
  };

  const [openImgModal, setOpenImgModal] = useState(false);

  function handleCloseModal2() {
    setOpenImgModal(false);
  }

  function handleOpenModal2() {
    if (user) {
      setOpenImgModal(true);
    } else {
      navigate("/login");
    }
  }
  const [firstUser, setFirstUser] = useState({});
  useEffect(() => {
    if (events?.joinedPeople) {
      setLoading(true);
      const user = async () => {
        await Axios.get(`/user/${events?.joinedPeople[0]}`)
          .then((res) => {
            setFirstUser(res.data?.data?.user);
          })
          .finally(() => {
            setLoading(false);
          });
      };
      user();
    }
  }, [events?.joinedPeople?.length]);
  // console.log(firstUser);
  const [openModal3, setOpenModal3] = useState(false);

  function handleCloseModal3() {
    setOpenModal3(false);
  }

  function handleOpenModal3() {
    setOpenModal3(true);
  }
  const handleLike = async (id) => {
    setLike(!like);

    // Check if the user has already liked the event
    const alreadyLiked = events?.alreadyLiked?.includes(user?._id);

    if (alreadyLiked) {
      // If already liked, unlike the event
      await Axios.put(`/removeLike/${id}`, { alreadyLiked: user?._id });
    } else {
      // If not already liked, like the event
      await Axios.put(`/addLike/${id}`, { alreadyLiked: user?._id });
    }

    // After updating the like status, update the events data
    const res = await Axios.get(`/event-details/${id}`);
    const updatedEventData = res.data.data;
    setEvents(updatedEventData);
  };

  return (
    <section className="flex">
      {openModal && (
        <MembersModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
          events={events}
        />
      )}
      <AddImageModal
        openImgModal={openImgModal}
        handleCloseModal2={handleCloseModal2}
        event={events}
        setEvents={setEvents}
      />

      <div className="w-full">
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
          <h1 className="text-[black] font-bold text-xl md:text-2xl">
            Event details
          </h1>
          <Profile />
        </div>
        {!loading ? (
          <div className="p-6">
            <Carousel
              opts={{
                align: "start",
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full mx-auto"
            >
              <CarouselContent>
                {events?.event_images?.map((img, i) => (
                  <CarouselItem
                    key={i}
                    className="md:basis-1/2 lg:basis-1/3 mx-auto h-max"
                  >
                    <div className="p-1">
                      <Card className="shadow-none border-none">
                        <CardContent className="flex aspect-square items-center justify-center p-3">
                          <img
                            src={img?.image}
                            alt=""
                            className=" h-full w-max object-contain "
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>

            <div>
              <p className="my-3 text-sm text-gray-700 flex justify-between items-center">
                {events?.like} Likes{" "}
                <div className="flex justify-center items-center gap-3">
                  {user && events?.anOtherParticipants && (
                    <button
                      className="bg-green-200 text-greeen-700 py-2 px-3 rounded-lg font-semibold flex items-center gap-2"
                      onClick={handleOpenModal2}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-image"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>{" "}
                      <span>Add</span>
                    </button>
                  )}
                  {/* {user &&
                  events?.alreadyLiked?.find((v) => v === user?._id) ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleLike(events?._id)}
                    >
                      <ThumbsUp
                        className={`w-7 h-7 rounded-md ${
                          !like ? "bg-blue-500 p-[3px]  text-white" : ""
                        }`}
                      />
                    </button>
                  ) : user &&
                    events?.alreadyLiked?.find((v) => v !== user?._id) ? (
                    <button onClick={() => handleLike(events?._id)}>
                      <ThumbsUp
                        className={`rounded-md w-7 h-7 ${
                          !like ? "bg-blue-500 p-[3px]  text-white" : ""
                        }`}
                      />
                    </button>
                  ) : user && events?.alreadyLiked?.length === 0 ? (
                    <button onClick={() => handleLike(events?._id)}>
                      <ThumbsUp
                        className={`rounded-md w-7 h-7 ${
                          !like ? "bg-blue-500 p-[3px]  text-white" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <button onClick={() => navigate("/login")}>
                      <ThumbsUp
                        className={`rounded-md w-7 h-7 ${
                          !like ? "bg-blue-500 p-[3px]  text-white" : ""
                        }`}
                      />
                    </button>
                  )} */}

                  {user &&
                  events?.alreadyLiked?.find((v) => v === user?._id) ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleLike(events?._id)}
                    >
                      <ThumbsUp
                        className={`w-7 h-7 rounded-md text-blue-500 `}
                      />
                    </button>
                  ) : user &&
                    events?.alreadyLiked?.find((v) => v !== user?._id) ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleLike(events?._id)}
                    >
                      <ThumbsUp className={`w-7 h-7 rounded-md `} />
                    </button>
                  ) : user && events?.alreadyLiked?.length === 0 ? (
                    <button onClick={() => handleLike(events?._id)}>
                      <ThumbsUp className={`rounded-md w-7 h-7 `} />
                    </button>
                  ) : (
                    !user && (
                      <button onClick={() => navigate("/login")}>
                        <ThumbsUp className={`rounded-md w-7 h-7 `} />
                      </button>
                    )
                  )}
                </div>
              </p>
              <div className="flex justify-between mt-2">
                <h1 className="text-[24px] font-bold mb-1">
                  {/* {console.log(events)} */}
                  {events?.event_title}
                </h1>
                <div className="flex items-center gap-5">
                  {openModal3 && (
                    <ShareModal
                      openModal={openModal3}
                      handleCloseModal={handleCloseModal3}
                      // createdEvent={createdEvent}
                    />
                  )}
                  <span
                    className="flex items-center cursor-pointer"
                    onClick={handleOpenModal3}
                  >
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

                  <div>
                    {user &&
                    events?.joinedPeople?.find((v) => v === user?.email)
                      ?.length ? (
                      <button className="bg-[#E0F5FD] text-[black] py-2 px-6 rounded-lg font-semibold">
                        Joined
                      </button>
                    ) : user &&
                      events?.joinedPeople?.find((v) => v !== user?.email) ? (
                      <button
                        onClick={() => handleJoin(events?._id)}
                        className="bg-[#E0F5FD] text-[black] py-2 px-6 rounded-lg font-semibold"
                      >
                        Join
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="bg-[#E0F5FD] text-[black] py-2 px-6 rounded-lg font-semibold"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-black font-semibold mb-1 mt-8">
                #{events?.category}
              </p>
              <p className="text-[#828282] text-[14px] font-medium">
                {moment(events?.event_date?.date_start).format("MMMM D, YYYY")},{" "}
                {events?.event_time?.time_start?.length > 6
                  ? moment(events?.event_time?.time_start).format("HH:mm")
                  : events?.event_time?.time_start}{" "}
                - {moment(events?.event_date?.date_end).format("MMMM D, YYYY")},{" "}
                {events?.event_time?.time_end?.length > 6
                  ? moment(events?.event_time?.time_end).format("HH:mm")
                  : events?.event_time?.time_end}
              </p>
            </div>

            <div className="mb-3">
              <span className="block text-[16px] font-medium text-[#333333] mb-4">
                {events?.joinedPeople?.length} people has joined
              </span>
              {events?.joinedPeople?.length !== 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {firstUser?.profile_images?.length ? (
                      <img
                        src={
                          firstUser?.profile_images?.length
                            && firstUser?.profile_images[firstUser?.profile_images.length - 1]
                        }
                        alt=""
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                    ) : (
                      <figure className="bg-[black] text-white  rounded-full w-12 h-12 flex justify-center items-center">
                        <UserRound />
                      </figure>
                    )}
                  </div>
                  {events?.joinedPeople?.length > 1 && (
                    <span className="w-[40px] h-[40px] text-[15px] rounded-full bg-[black] text-white flex items-center justify-center">
                      {events?.joinedPeople?.length - 1}+
                    </span>
                  )}

                  <span
                    className="text-[15px] text-[black] cursor-pointer"
                    onClick={handleOpenModal}
                  >
                    See all
                  </span>
                </div>
              )}
            </div>

            <div className="mb-4 mt-8">
              <h3 className="text-[22px] font-semibold mb-1">Descriptions</h3>
              <p className="text-[#828282] text-[16px]">
                {events?.event_Details}
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
                  <h3 className="text-[22px] font-semibold">
                    {events?.event_clubName}
                  </h3>
                  <small className="text-[#828282] font-medium">
                    {events?.location}
                  </small>
                </div>
              </div>
              <div className="mt-4 bg-white rounded-xl shadow-primary">
                {defaultProps?.center.lat !== undefined &&
                  defaultProps?.center.lng !== undefined && (
                    <div
                      style={{
                        height: "400px",
                        width: "100%",
                        border: 0,
                        // position: "absolute",
                      }}
                    >
                      <APIProvider
                        apiKey={`${import.meta.env.VITE_GOOGLE_API_KEY}`}
                      >
                        <Map
                          zoom={13}
                          center={{
                            lat: defaultProps?.center?.lat,
                            lng: defaultProps?.center?.lng,
                          }}
                          gestureHandling={"greedy"}
                          // disableDefaultUI={true}
                          mapId={"4504f8b37365c3d0"}
                        >
                          <AdvancedMarker
                            className="relative"
                            // className={customMarker}
                            position={{
                              lat: defaultProps?.center?.lat,
                              lng: defaultProps?.center?.lng,
                            }}
                            onClick={() => setPopOver(!popover)}
                          >
                            <div>
                              <img
                                width={80}
                                height={80}
                                src={mapIcon}
                                alt=""
                              />
                            </div>
                            {popover && (
                              <div className="grid grid-cols-2 absolute z-10">
                                <div className="!bg-white w-80 !z-[999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2">
                                  <div className="w-20 h-20 rounded-full ring-2 ring-black p-1">
                                    <img
                                      src={events?.event_images[0]?.image}
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  </div>

                                  <div className="w-[60%]">
                                    <p>{events?.event_title}</p>
                                    <p className="text-[#828282] text-[12px] font-medium">
                                      {moment(events?.event_date).format(
                                        "MMMM D, YYYY"
                                      )}
                                      ,{" "}
                                      {moment(
                                        events?.event_time?.time_start
                                      ).format("hh:mm a")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </AdvancedMarker>
                        </Map>
                      </APIProvider>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-full">
        <Loader></Loader>
      </div>
        )}
      </div>
    </section>
  );
};

export default EventDetails;
