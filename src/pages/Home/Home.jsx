import { useEffect, useState } from "react";
import Filter from "./Filter";
import HomeNavbar from "./HomeNavbar";
import HomeSidebar from "./HomeSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../../Hooks/useAxios";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import moment from "moment";
import mapIcon from "../../assets/logo-white-bg-removebg-preview.png";
import Loader from "@/components/Loader/Loader";
import { X } from "lucide-react";

const Home = ({ loading }) => {
  const { Axios } = useAxios();
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const [userLocation, setUserLocation] = useState({
    center: {
      lat: 47.3769,
      lng: 8.5417,
    },
    zoom: 11,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLocation({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            zoom: 13,
          });
        },
        function (error) {
          console.error(error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const defaultProps = {
    center: {
      lat: 47.3769,
      lng: 8.5417,
    },
    zoom: 11,
  };
  const state = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    Axios.get("/all-events").then((res) => {
      setEvents(res.data.data);
    });
  }, []);
  const [popover, setPopOver] = useState({
    popover: false,
    id: "",
  });
  const [selectedBtn, setSelectedBtn] = useState("Public");

  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const [invitedEvent, setInvitedEvent] = useState([]);

  useEffect(() => {
    if (user?.onlyPhone) {
      Axios.get(
        `/invited-event/phone=${user?.onlyPhone}&code=${user?.countryCode}`
      )
        .then((res) => {
          setInvitedEvent(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user?.onlyPhone]);

  const [selected2, setSelected2] = useState([]);
  const { date } = useSelector((state) => state.layout);
  // console.log(date);

  const today = moment();

  const twoDaysLater = moment();
  twoDaysLater.add(
    date.find((d) => d.name === "This Week") !== undefined
      ? 7
      : date.find((d) => d.name === "Tomorrow") !== undefined
      ? 1
      : date.find((d) => d.name === "Today") !== undefined
      ? 0
      : 180,
    "days"
  );

  // Filter events within today and the next two days
  const upcomingEvents = events.filter((event) => {
    return (
      (moment(event?.event_date?.date_start).isSameOrAfter(today, "date") ||
        moment(event?.event_date?.date_end).isSameOrAfter(today, "date")) &&
      // (
      moment(event?.event_date?.date_end).isSameOrBefore(twoDaysLater, "date")
      //  ||
      //   moment(event?.event_date?.date_start).isSameOrBefore(
      //     twoDaysLater,
      //     "date"
      //   )
      // )
    );
  });

  const upcomingEventsInvited = invitedEvent.filter((event) => {
    // console.log(event?.event_date?.date_start);
    return (
      (moment(event?.event_date?.date_start).isSameOrAfter(today, "date") ||
        moment(event?.event_date?.date_end).isSameOrAfter(today, "date")) &&
      // (
      moment(event?.event_date?.date_end).isSameOrBefore(twoDaysLater, "date")
      //  ||
      //   moment(event?.event_date?.date_start).isSameOrBefore(
      //     twoDaysLater,
      //     "date"
      //   )
      // )
    );
  });
  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="text-whitefont-semibold">
      <HomeNavbar
        user={state.user}
        setIsExpand={setIsExpand}
        isExpand={isExpand}
        selectedBtn={selectedBtn}
        setSelectedBtn={setSelectedBtn}
      />
      <Link
        to={"/privacy-policy"}
        className="absolute bottom-2 left-2 z-20 underline text-sm text-gray-800 "
      >
        @Privacy And Policy
      </Link>
      <div className="flex">
        {state.user && (
          <HomeSidebar setIsExpand={setIsExpand} isExpand={isExpand} />
        )}
        <div
          style={{ height: "100vh", width: "100%" }}
          onClick={() => {
            // setPopOver({
            //   ...popover,
            // });
          }}
        >
          {userLocation?.center?.lat !== undefined &&
            userLocation?.center?.lng !== undefined && (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  border: 0,
                }}
              >
                {selectedBtn === "Public" ? (
                  <APIProvider
                    apiKey={`${import.meta.env.VITE_GOOGLE_API_KEY}`}
                  >
                    <Map
                      zoom={13}
                      center={{
                        lat:
                          userLocation?.center?.lat ||
                          defaultProps?.center?.lat,
                        lng:
                          userLocation?.center?.lng ||
                          defaultProps?.center?.lng,
                      }}
                      gestureHandling={"greedy"}
                      disableDefaultUI={true}
                      mapId={"4504f8b37365c3d0"}
                    >
                      {selected2.length
                        ? upcomingEvents
                            .filter((event) => {
                              return selected2.find((s) => {
                                return s?.name === event?.category;
                              });
                            })
                            ?.map((event, i) => {
                              return (
                                <AdvancedMarker
                                  key={i}
                                  className="relative"
                                  position={{
                                    lat: Number(event.mapLocation?.lat),
                                    lng: Number(event.mapLocation?.lng),
                                  }}
                                  onClick={() =>
                                    setPopOver({
                                      popover: true,
                                      id: event?._id,
                                    })
                                  }
                                >
                                  {/* <div className="bg-white p-2 rounded-lg rotate-45 shadow-blue-300 shadow-2xl text-center"> */}
                                  <img
                                    width={70}
                                    height={70}
                                    src={mapIcon}
                                    alt=""
                                    className=""
                                  />
                                  {/* </div> */}
                                  {popover?.popover &&
                                    popover.id === event._id && (
                                      <div className="grid grid-cols-2 absolute !z-[10]">
                                        <div className="!bg-white w-96 !z-[9999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2">
                                          <div className="absolute right-4 top-4">
                                            <X
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setPopOver({
                                                  popover: false,
                                                  id: "",
                                                });
                                              }}
                                            />
                                          </div>
                                          <div
                                            onClick={() =>
                                              navigate(
                                                `/event-details/${event?._id}`
                                              )
                                            }
                                            className="h-20 w-20 ring-2 ring-black rounded-full p-1"
                                          >
                                            {event?.event_images[0]?.image ? (
                                              <img
                                                src={
                                                  event?.event_images[0]?.image
                                                }
                                                className="w-full h-full rounded-full  object-cover "
                                              />
                                            ) : (
                                              <p>no images</p>
                                            )}
                                          </div>

                                          <div
                                            onClick={() =>
                                              navigate(
                                                `/event-details/${event?._id}`
                                              )
                                            }
                                            className="w-[60%]"
                                          >
                                            <p>
                                              {event?.event_title?.length > 20
                                                ? event?.event_title?.slice(
                                                    0,
                                                    20
                                                  ) + "..."
                                                : event?.event_title}
                                            </p>
                                            <p className="text-[#828282] text-[12px] font-medium">
                                              {moment(
                                                event?.event_date?.date_start
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
                                                event?.event_time?.time_start
                                              ).format("hh:mm a") ===
                                              "Invalid date"
                                                ? event?.event_time?.time_start
                                                : moment(
                                                    event?.event_time
                                                      ?.time_start
                                                  ).format("hh:mm a")}{" "}
                                              -{" "}
                                              {moment(
                                                event?.event_date?.date_end
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
                                                event?.event_time?.time_end
                                              ).format("hh:mm a") ===
                                              "Invalid date"
                                                ? event?.event_time?.time_end
                                                : moment(
                                                    event?.event_time?.time_end
                                                  ).format("hh:mm a")}
                                            </p>
                                            <p className="text-[#2e2e2e] text-[12px] font-medium">
                                              Joined People:{" "}
                                              {event?.joinedPeople?.length}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </AdvancedMarker>
                              );
                            })
                        : upcomingEvents?.map((event, i) => {
                            // console.log(event);
                            return (
                              <AdvancedMarker
                                key={i}
                                className="relative"
                                position={{
                                  lat: Number(event.mapLocation?.lat),
                                  lng: Number(event.mapLocation?.lng),
                                }}
                                onClick={() => {
                                  setPopOver({
                                    popover: true,
                                    id: event?._id,
                                  });
                                }}
                              >
                                {/* <div className="bg-white p-2 rounded-lg rotate-45 shadow-blue-300 shadow-2xl text-center"> */}
                                <img
                                  width={70}
                                  height={70}
                                  src={mapIcon}
                                  alt=""
                                  // className="-rotate-45"
                                />
                                {/* </div> */}
                                {popover?.popover &&
                                  popover.id === event._id && (
                                    <div className="grid grid-cols-2 absolute !z-[10]">
                                      <div className="!bg-white w-96 !z-[9999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2">
                                        <div className="absolute right-4 top-4">
                                          <X
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setPopOver({
                                                popover: false,
                                                id: "",
                                              });
                                            }}
                                          />
                                        </div>
                                        <div
                                          onClick={() =>
                                            navigate(
                                              `/event-details/${event?._id}`
                                            )
                                          }
                                          className="h-20 w-20 ring-2 ring-black rounded-full p-1"
                                        >
                                          {event?.event_images[0]?.image ? (
                                            <img
                                              src={
                                                event?.event_images[0]?.image
                                              }
                                              className="w-full h-full rounded-full  object-cover "
                                            />
                                          ) : (
                                            <p>no images</p>
                                          )}
                                        </div>

                                        <div
                                          onClick={() =>
                                            navigate(
                                              `/event-details/${event?._id}`
                                            )
                                          }
                                          className="w-[60%]"
                                        >
                                          <p>
                                            {event?.event_title?.length > 20
                                              ? event?.event_title?.slice(
                                                  0,
                                                  20
                                                ) + "..."
                                              : event?.event_title}
                                          </p>
                                          <p className="text-[#828282] text-[12px] font-medium">
                                            {moment(
                                              event?.event_date?.date_start
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
                                              event?.event_time?.time_start
                                            ).format("hh:mm a") ===
                                            "Invalid date"
                                              ? event?.event_time?.time_start
                                              : moment(
                                                  event?.event_time?.time_start
                                                ).format("hh:mm a")}{" "}
                                            -{" "}
                                            {moment(
                                              event?.event_date?.date_end
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
                                              event?.event_time?.time_end
                                            ).format("hh:mm a") ===
                                            "Invalid date"
                                              ? event?.event_time?.time_end
                                              : moment(
                                                  event?.event_time?.time_end
                                                ).format("hh:mm a")}
                                          </p>
                                          <p className="text-[#2e2e2e] text-[12px] font-medium">
                                            Joined People:{" "}
                                            {event?.joinedPeople?.length}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                              </AdvancedMarker>
                            );
                          })}
                    </Map>
                  </APIProvider>
                ) : (
                  <APIProvider
                    apiKey={`${import.meta.env.VITE_GOOGLE_API_KEY}`}
                  >
                    <Map
                      zoom={13}
                      center={{
                        lat:
                          userLocation?.center?.lat ||
                          defaultProps?.center?.lat,
                        lng:
                          userLocation?.center?.lng ||
                          defaultProps?.center?.lng,
                      }}
                      gestureHandling={"greedy"}
                      disableDefaultUI={true}
                      mapId={"4504f8b37365c3d0"}
                    >
                      {selected2.length
                        ? upcomingEventsInvited
                            .filter((event) => {
                              return selected2.find((s) => {
                                return s?.name === event?.category;
                              });
                            })
                            ?.map((event, i) => {
                              return (
                                <AdvancedMarker
                                  key={i}
                                  className="relative"
                                  position={{
                                    lat: Number(event.mapLocation?.lat),
                                    lng: Number(event.mapLocation?.lng),
                                  }}
                                  onClick={() =>
                                    setPopOver({
                                      popover: true,
                                      id: event?._id,
                                    })
                                  }
                                >
                                  {/* <div className="bg-white p-2 rounded-lg rotate-45 shadow-blue-300 shadow-2xl text-center"> */}
                                  <img
                                    width={70}
                                    height={70}
                                    src={mapIcon}
                                    alt=""
                                    // className="-rotate-45"
                                  />
                                  {/* </div> */}
                                  {popover?.popover &&
                                    popover.id === event._id && (
                                      <div className="grid grid-cols-2 absolute !z-[10]">
                                        <div className="!bg-white w-96 !z-[9999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2">
                                          <div className="absolute right-4 top-4">
                                            <X
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setPopOver({
                                                  popover: false,
                                                  id: "",
                                                });
                                              }}
                                            />
                                          </div>
                                          <div
                                            onClick={() =>
                                              navigate(
                                                `/event-details/${event?._id}`
                                              )
                                            }
                                            className="h-20 w-20 ring-2 ring-black rounded-full p-1"
                                          >
                                            {event?.event_images[0]?.image ? (
                                              <img
                                                src={
                                                  event?.event_images[0]?.image
                                                }
                                                className="w-full h-full rounded-full  object-cover "
                                              />
                                            ) : (
                                              <p>no images</p>
                                            )}
                                          </div>

                                          <div
                                            onClick={() =>
                                              navigate(
                                                `/event-details/${event?._id}`
                                              )
                                            }
                                            className="w-[60%]"
                                          >
                                            <p>
                                              {event?.event_title?.length > 20
                                                ? event?.event_title?.slice(
                                                    0,
                                                    20
                                                  ) + "..."
                                                : event?.event_title}
                                            </p>
                                            <p className="text-[#828282] text-[12px] font-medium">
                                              {moment(
                                                event?.event_date?.date_start
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
                                                event?.event_time?.time_start
                                              ).format("hh:mm a") ===
                                              "Invalid date"
                                                ? event?.event_time?.time_start
                                                : moment(
                                                    event?.event_time
                                                      ?.time_start
                                                  ).format("hh:mm a")}{" "}
                                              -{" "}
                                              {moment(
                                                event?.event_date?.date_end
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
                                                event?.event_time?.time_end
                                              ).format("hh:mm a") ===
                                              "Invalid date"
                                                ? event?.event_time?.time_end
                                                : moment(
                                                    event?.event_time?.time_end
                                                  ).format("hh:mm a")}
                                            </p>
                                            <p className="text-[#2e2e2e] text-[12px] font-medium">
                                              Joined People:{" "}
                                              {event?.joinedPeople?.length}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </AdvancedMarker>
                              );
                            })
                        : upcomingEventsInvited?.map((event, i) => {
                            return (
                              <AdvancedMarker
                                key={i}
                                className="relative"
                                position={{
                                  lat: Number(event.mapLocation?.lat),
                                  lng: Number(event.mapLocation?.lng),
                                }}
                                onClick={() =>
                                  setPopOver({
                                    popover: true,
                                    id: event?._id,
                                  })
                                }
                              >
                                {/* <div className="bg-white p-2 rounded-lg rotate-45 shadow-blue-300 shadow-2xl text-center"> */}
                                <img
                                  width={70}
                                  height={70}
                                  src={mapIcon}
                                  alt=""
                                  // className="-rotate-45"
                                />
                                {/* </div> */}
                                {popover?.popover &&
                                  popover.id === event._id && (
                                    <div className="grid grid-cols-2 absolute !z-[10]">
                                      <div className="!bg-white w-96 !z-[9999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2">
                                        <div className="absolute right-4 top-4">
                                          <X
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setPopOver({
                                                popover: false,
                                                id: "",
                                              });
                                            }}
                                          />
                                        </div>
                                        <div
                                          onClick={() =>
                                            navigate(
                                              `/event-details/${event?._id}`
                                            )
                                          }
                                          className="h-20 w-20 ring-2 ring-black rounded-full p-1"
                                        >
                                          {event?.event_images[0]?.image ? (
                                            <img
                                              src={
                                                event?.event_images[0]?.image
                                              }
                                              className="w-full h-full rounded-full  object-cover "
                                            />
                                          ) : (
                                            <p>no images</p>
                                          )}
                                        </div>

                                        <div
                                          onClick={() =>
                                            navigate(
                                              `/event-details/${event?._id}`
                                            )
                                          }
                                          className="w-[60%]"
                                        >
                                          <p>
                                            {event?.event_title?.length > 20
                                              ? event?.event_title?.slice(
                                                  0,
                                                  20
                                                ) + "..."
                                              : event?.event_title}
                                          </p>
                                          <p className="text-[#828282] text-[12px] font-medium">
                                            {moment(
                                              event?.event_date?.date_start
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
                                              event?.event_time?.time_start
                                            ).format("hh:mm a") ===
                                            "Invalid date"
                                              ? event?.event_time?.time_start
                                              : moment(
                                                  event?.event_time?.time_start
                                                ).format("hh:mm a")}{" "}
                                            -{" "}
                                            {moment(
                                              event?.event_date?.date_end
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
                                              event?.event_time?.time_end
                                            ).format("hh:mm a") ===
                                            "Invalid date"
                                              ? event?.event_time?.time_end
                                              : moment(
                                                  event?.event_time?.time_end
                                                ).format("hh:mm a")}
                                          </p>
                                          <p className="text-[#2e2e2e] text-[12px] font-medium">
                                            Joined People:{" "}
                                            {event?.joinedPeople?.length}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                              </AdvancedMarker>
                            );
                          })}
                    </Map>
                  </APIProvider>
                )}
              </div>
            )}
        </div>
      </div>
      <Filter selected2={selected2} setSelected2={setSelected2} />
    </div>
  );
};

export default Home;

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "black",
      fontWeight: "bold",
      width: "20px",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)",
      fontSize: "20px",
    }}
  >
    {/* <GiMechanicGarage style={{ fontSize: "30px" }} />
    {text} */}
    {text}
  </div>
);
