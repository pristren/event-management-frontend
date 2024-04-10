import { useEffect, useState } from "react";
import Filter from "./Filter";
import HomeNavbar from "./HomeNavbar";
import HomeSidebar from "./HomeSidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../../Hooks/useAxios";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import moment from "moment";
import mapIcon from "../../assets/logo-white-bg-removebg-preview.png";
import Loader from "@/components/Loader/Loader";

const Home = ({loading}) => {
  const { Axios } = useAxios();
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const [userLocation, setUserLocation] = useState({});

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
      lat: 23.7330218,
      lng: 90.3983829,
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
    if (user?.phone) {
      Axios.get(`/invited-event/${user?.phone}`)
        .then((res) => {
          console.log(res.data.data);
          setInvitedEvent(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user?.phone]);

  // useEffect(() => {
  //   const allEvents = async () => {
  //     const res = await Axios.get("/all-events");
  //     const data = await res.data;
  //     setInvitedEvent(
  //       data?.data?.filter(
  //         (event) =>
  //           event?.joinedPeople?.find((v) => v === user?.email) &&
  //           event?.userId !== user._id
  //       )
  //     );
  //   };
  //   allEvents();
  // }, []);

  const [selected2, setSelected2] = useState([]);
  const { date } = useSelector((state) => state.layout);
  // console.log(date);

  const today = new Date();

  // Calculate two days from now
  const twoDaysLater = new Date();
  twoDaysLater.setDate(
    date.find((d) => d.name === "This Week") !== undefined
      ? today.getDate() + 6
      : date.find((d) => d.name === "Tomorrow") !== undefined
      ? today.getDate() + 1
      : date.find((d) => d.name === "Today") !== undefined
      ? today.getDate()
      : today.getDate() + 29
  );
  // console.log(twoDaysLater);

  // Filter events within today and the next two days
  const upcomingEvents = events.filter((event) => {
    // console.log(event?.event_date?.date_start);
    return (
      moment(event?.event_date?.date_start).format("MMMM D, YYYY") >=
        moment(today).format("MMMM D, YYYY") &&
      moment(event?.event_date?.date_start).format("MMMM D, YYYY") <=
        moment(twoDaysLater).format("MMMM D, YYYY")
    );
  });

  const upcomingEventsInvited = invitedEvent.filter((event) => {
    // console.log(event?.event_date?.date_start);
    return (
      moment(event?.event_date?.date_start).format("MMMM D, YYYY") >=
        moment(today).format("MMMM D, YYYY") &&
      moment(event?.event_date?.date_start).format("MMMM D, YYYY") <=
        moment(twoDaysLater).format("MMMM D, YYYY")
    );
  });
  if(loading){
    return <div className="min-h-screen">
      <Loader></Loader>
    </div>
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
      <div className="flex">
        {state.user && (
          <HomeSidebar setIsExpand={setIsExpand} isExpand={isExpand} />
        )}
        <div
          style={{ height: "100vh", width: "100%" }}
          onClick={() => {
            setPopOver({
              ...popover,
              popover: false,
            });
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
                                      popover: !popover?.popover,
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
                                      <div className="grid grid-cols-2 absolute z-10">
                                        <div
                                          className="!bg-white w-80 !z-[999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2"
                                          onClick={() =>
                                            navigate(
                                              `/event-details/${event?._id}`
                                            )
                                          }
                                        >
                                          <div className="h-20 w-20 ring-2 ring-black rounded-full p-1">
                                            <img
                                              src={
                                                event?.event_images[0]?.image
                                              }
                                              className="w-full h-full rounded-full   object-cover "
                                            />
                                          </div>

                                          <div className="w-[60%]">
                                            <p>{event?.event_title}</p>
                                            <p className="text-[#828282] text-[12px] font-medium">
                                              {moment(
                                                event?.event_date?.date_start
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
                                                event?.event_time?.time_start
                                              ).format("hh:mm a")}{" "}
                                              -{" "}
                                              {moment(
                                                event?.event_date?.date_end
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
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
                                onClick={() =>
                                  setPopOver({
                                    popover: !popover?.popover,
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
                                    <div className="grid grid-cols-2 absolute z-10">
                                      <div
                                        className="!bg-white w-80 !z-[999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2"
                                        onClick={() =>
                                          navigate(
                                            `/event-details/${event?._id}`
                                          )
                                        }
                                      >
                                        <div className="h-20 w-20 ring-2 ring-black rounded-full p-1">
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

                                        <div className="w-[60%]">
                                          <p>{event?.event_title}</p>
                                          <p className="text-[#828282] text-[12px] font-medium">
                                            {moment(
                                              event?.event_date?.date_start
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
                                              event?.event_time?.time_start
                                            ).format("hh:mm a")}{" "}
                                            -{" "}
                                            {moment(
                                              event?.event_date?.date_end
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
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
                                      popover: !popover?.popover,
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
                                      <div className="grid grid-cols-2 absolute z-10">
                                        <div
                                          className="!bg-white w-80 !z-[999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2"
                                          onClick={() =>
                                            navigate(
                                              `/event-details/${event?._id}`
                                            )
                                          }
                                        >
                                          <div className="h-20 w-20 ring-2 ring-black rounded-full p-1">
                                            <img
                                              src={
                                                event?.event_images[0]?.image
                                              }
                                              className="w-full h-full rounded-full object-cover "
                                            />
                                          </div>

                                          <div className="w-[60%]">
                                            <p>{event?.event_title}</p>
                                            <p className="text-[#828282] text-[12px] font-medium">
                                              {moment(
                                                event?.event_date?.date_start
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
                                                event?.event_time?.time_start
                                              ).format("hh:mm a")}{" "}
                                              -{" "}
                                              {moment(
                                                event?.event_date?.date_end
                                              ).format("MMMM D, YYYY")}
                                              ,{" "}
                                              {moment(
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
                                    popover: !popover?.popover,
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
                                    <div className="grid grid-cols-2 absolute z-10">
                                      <div
                                        className="!bg-white w-80 !z-[999] py-6 px-4 text-lg -translate-x-[40%] rounded-lg shadow-2xl shadow-blue-300 h-36 text-center mt-2 flex items-center gap-2"
                                        onClick={() =>
                                          navigate(
                                            `/event-details/${event?._id}`
                                          )
                                        }
                                      >
                                        <div className="h-20 w-20 ring-2 ring-black rounded-full p-1">
                                          <img
                                            src={event?.event_images[0]?.image}
                                            className="w-full h-full rounded-full  object-cover "
                                          />
                                        </div>

                                        <div className="w-[60%]">
                                          <p>{event?.event_title}</p>
                                          <p className="text-[#828282] text-[12px] font-medium">
                                            {moment(
                                              event?.event_date?.date_start
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
                                              event?.event_time?.time_start
                                            ).format("hh:mm a")}{" "}
                                            -{" "}
                                            {moment(
                                              event?.event_date?.date_end
                                            ).format("MMMM D, YYYY")}
                                            ,{" "}
                                            {moment(
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
      <Filter
        selected2={selected2}
        setSelected2={setSelected2}
        // dateSelect={dateSelect}
        // setDateSelect={setDateSelect}
      />
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
