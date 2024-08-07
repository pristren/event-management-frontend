import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../../assets/members/1.png";
import Profile from "../../components/Profile";
import useAxios from "../../Hooks/useAxios";
import MyProvider from "../../Provider/Provider";
import AddImageModal from "./AddImageModal";
import MembersModal from "./MembersModal";

import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import Autoplay from "embla-carousel-autoplay";
import { ThumbsUp, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import mapIcon from "../../assets/logo-white-bg-removebg-preview.png";
import ShareModal from "./ShareModal";

const EventDetails = () => {
  const { user, accessToken } = useSelector((state) => state?.auth);

  const [loading, setLoading] = useState(true);
  const state = useSelector((state) => state.auth);
  const { Axios } = useAxios();
  const [openModal, setOpenModal] = useState(false);
  const [like, setLike] = useState(false);
  const [events, setEvents] = useState({});
  const [userLocation, setUserLocation] = useState({});
  const navigate = useNavigate();
  const { isExpand, setIsExpand } = useContext(MyProvider);
  const { id } = useParams();
  const [firstUser, setFirstUser] = useState({
    profile_images: [],
    currentProfile: "",
  });

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  useEffect(() => {
    // setLoading(true);
    Axios.get(`/event-details/${id}`)
      .then((res) => {
        setEvents(res.data.data);
        setFirstUser(res.data.data?.firstUser);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(events);

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

  const [popover, setPopOver] = useState(false);

  const handleJoin = async (id) => {
    await Axios.put(
      `/join/${id}`,
      { email: user?.email },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        Axios.get(`/event-details/${id}`)
          .then((res) => setEvents(res.data.data))
          .catch((err) => console.log(err));
      }
    });
  };

  const handleLeave = async (id) => {
    await Axios.put(
      `/unjoin/${id}`,
      { email: user?.email },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => {
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
      await Axios.put(
        `/removeLike/${id}`,
        { alreadyLiked: user?._id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } else {
      // If not already liked, like the event
      await Axios.put(
        `/addLike/${id}`,
        { alreadyLiked: user?._id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }

    // After updating the like status, update the events data
    const res = await Axios.get(`/event-details/${id}`);
    const updatedEventData = res.data.data;
    setEvents(updatedEventData);
  };

  const [reportState, setReportState] = useState(false);

  const handleReport = async (eventId, description, eventCreator) => {
    if (!user?._id) {
      // router.push("/(modals)/modal_auth");
      alert("You are not logged in");
      return;
    }
    await Axios.post(
      "/report/event",
      {
        eventId,
        description,
        reportedBy: user?.firstName + " " + user?.lastName,
        eventCreator,
        reportedByUser: user?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 201) {
          const already = JSON.parse(localStorage.getItem("report")) || [];

          already.push(eventId);

          localStorage.setItem("report", JSON.stringify(already));

          setReportState(true);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const [comment, setComment] = useState("");

  const handleComment = async (id) => {
    if (!user?._id) {
      return navigate("/login");
    }
    await Axios.put(
      `/addComment/${id}`,
      { comment: comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          Axios.get(`/event-details/${id}`)
            .then((res) => setEvents(res.data.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setComment("");
      });
  };

  return (
    <section className="flex">
      {user?._id && openModal && (
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
          <Profile profile_images={state?.user?.currentProfile} />
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
                          firstUser?.currentProfile
                            ? firstUser?.currentProfile
                            : firstUser?.profile_images?.length
                            ? firstUser?.profile_images[0]?.image
                            : Image
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
                    onClick={() => {
                      if (user?._id) {
                        handleOpenModal();
                      } else {
                        navigate("/login");
                      }
                    }}
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
              {/* maps */}
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
              {/* comments */}
              <div className="mt-8">
                <h3 className="text-[22px] font-semibold">Comments</h3>
                {/* existing comments lists */}
                {events?.comments?.map((comment, i) => (
                  <div
                    key={comment?._id}
                    className="flex items-center gap-x-3 mt-4"
                  >
                    <div className="w-12 h-10 md:h-12 rounded-full bg-[#F0F0F0] flex justify-center items-center">
                      {comment?.userId?.profile_images?.length ? (
                        <img
                          src={
                            comment?.userId?.currentProfile
                              ? comment?.userId?.currentProfile
                              : comment?.userId?.profile_images?.length
                              ? comment?.userId?.profile_images[0]?.image
                              : Image
                          }
                          alt=""
                          className=" rounded-full object-cover"
                        />
                      ) : (
                        <UserRound className="w-6 h-6 text-[#828282]" />
                      )}
                    </div>
                    <div className="">
                      <p className="text-[#828282] text-[14px] font-medium">
                        {comment?.userId?.firstName +
                          " " +
                          comment?.userId?.lastName}
                      </p>
                      <p className="text-[#333333] text-[16px]">
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                ))}

                {/* create a new one */}
                <div className="flex items-center gap-x-3 mt-8">
                  <div className="w-[3.7rem] h-10 md:h-12 rounded-full bg-[#F0F0F0] flex justify-center items-center">
                    {user?.profile_images?.length ? (
                      <img
                        src={
                          user?.currentProfile
                            ? user?.currentProfile
                            : user?.profile_images?.length
                            ? user?.profile_images[0]?.image
                            : Image
                        }
                        alt=""
                        className=" rounded-full object-cover"
                      />
                    ) : (
                      <UserRound className="w-6 h-6 text-[#828282]" />
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      placeholder="Write a comment"
                      className=""
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                  </div>
                  <Button
                    variant="secondary"
                    className="hover:bg-[#E0F5FD] border text-[#333333] py-2 px-6 rounded-lg font-semibold"
                    onClick={() => handleComment(events?._id)}
                    disabled={comment.length === 0}
                  >
                    Comment
                  </Button>
                </div>
              </div>
              {/* reports */}
              <Drawer>
                {localStorage.getItem("report")?.includes(events?._id) ||
                events?.userId === user?._id ? (
                  <div
                    onClick={() =>
                      events?.userId === user?._id &&
                      toast.error("You can't report your own event")
                    }
                  >
                    <div
                      className={`mt-5 flex justify-end gap-2 items-center ${
                        events?.userId === user?._id
                          ? "cursor-pointer"
                          : "cursor-auto"
                      }`}
                    >
                      <p className="underline">Reporte this event.</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-gray-500 w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <DrawerTrigger asChild>
                    <div className="mt-5 flex justify-end gap-2 items-center cursor-pointer w-min ml-auto">
                      <p className="underline whitespace-nowrap">
                        Report this event.
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-red-500 w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                        />
                      </svg>
                    </div>
                  </DrawerTrigger>
                )}

                <DrawerContent className="focus-within:outline-none">
                  {reportState ? (
                    <div className="p-6 max-w-lg mx-auto">
                      <p className="text-center text-lg font-medium mt-4">
                        Thanks for sharing your feedback!
                      </p>
                      <p className="mt-5 text-center text-md leading-5">
                        We'll review your report to determine whether there have
                        been a violation of our Community Guidelines. If you
                        have any further questions or concerns, please contact
                        us at dailyframeapp@gmail.com
                      </p>
                    </div>
                  ) : (
                    <div className="">
                      <DrawerHeader>
                        <DrawerTitle className="text-xl">
                          Report event
                        </DrawerTitle>
                        <DrawerDescription className="text-lg font-medium ">
                          Why you are reporting this content?
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerDescription className="space-y-2 p-4 ">
                        <p
                          className="cursor-pointer hover:bg-gray-200 p-2 w-min whitespace-nowrap rounded-md"
                          onClick={() =>
                            handleReport(
                              events?._id,
                              "I find it offensive",
                              events?.userId
                            )
                          }
                        >
                          I find it offensive
                        </p>
                        <p
                          className="cursor-pointer hover:bg-gray-200 p-2 w-min whitespace-nowrap rounded-md"
                          onClick={() =>
                            handleReport(
                              events?._id,
                              "It's a spam",
                              events?.userId
                            )
                          }
                        >
                          It's a spam
                        </p>
                        <p
                          className="cursor-pointer hover:bg-gray-200 p-2 w-min whitespace-nowrap rounded-md"
                          onClick={() =>
                            handleReport(
                              events?._id,
                              "It sexually inappropriate",
                              events?.userId
                            )
                          }
                        >
                          It sexually inappropriate
                        </p>
                        <p
                          className="cursor-pointer hover:bg-gray-200 p-2 w-min whitespace-nowrap rounded-md"
                          onClick={() =>
                            handleReport(
                              events?._id,
                              "It's a scam or its misleading",
                              events?.userId
                            )
                          }
                        >
                          It's a scam or its misleading
                        </p>
                        <p
                          className="cursor-pointer hover:bg-gray-200 p-2 w-min whitespace-nowrap rounded-md"
                          onClick={() =>
                            handleReport(
                              events?._id,
                              "It's violent or prohibited content",
                              events?.userId
                            )
                          }
                        >
                          It's violent or prohibited content
                        </p>
                        <p
                          className="cursor-pointer hover:bg-gray-200 p-2 w-min whitespace-nowrap rounded-md"
                          onClick={() =>
                            handleReport(
                              events?._id,
                              "It's violates my intellectual property rights",
                              events?.userId
                            )
                          }
                        >
                          {" "}
                          It's violates my intellectual property rights
                        </p>
                        <p
                          className="cursor-pointer hover:bg-gray-200 p-2 w-min whitespace-nowrap rounded-md"
                          onClick={() =>
                            handleReport(events?._id, "Others", events?.userId)
                          }
                        >
                          Others
                        </p>
                      </DrawerDescription>
                    </div>
                  )}
                </DrawerContent>
              </Drawer>
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
