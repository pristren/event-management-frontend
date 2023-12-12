import { useEffect, useState } from "react";
import Filter from "./Filter";
import HomeNavbar from "./HomeNavbar";
import HomeSidebar from "./HomeSidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../../Hooks/useAxios";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

const Home = () => {
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
  const [popover, setPopOver] = useState(false);

  return (
    <div className="text-whitefont-semibold">
      <HomeNavbar
        user={state.user}
        setIsExpand={setIsExpand}
        isExpand={isExpand}
      />
      <div className="flex">
        {state.user && (
          <HomeSidebar setIsExpand={setIsExpand} isExpand={isExpand} />
        )}
        <div style={{ height: "100vh", width: "100%" }}>
          {userLocation?.center?.lat !== undefined &&
            userLocation?.center?.lng !== undefined && (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  border: 0,
                }}
              >
                {events?.length > 0 && (
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
                      {events?.map((event, i) => {
                        return (
                          <AdvancedMarker
                            key={i}
                            className="relative"
                            position={{
                              lat: Number(event.mapLocation?.lat),
                              lng: Number(event.mapLocation?.lng),
                            }}
                            onClick={() => setPopOver(!popover)}
                          >
                            <img
                              src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                              alt=""
                            />
                            {popover && (
                              <div className="grid grid-cols-2 absolute z-10">
                                <div className="!bg-white w-72 !z-[999] p-6 text-lg -translate-x-2/4">
                                  <h2>Event Details</h2>
                                  <p>Email: {event?.event_title}</p>
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
      <Filter />
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
