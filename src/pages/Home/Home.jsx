import { useEffect, useState } from "react";
import Filter from "./Filter";
import HomeNavbar from "./HomeNavbar";
import HomeSidebar from "./HomeSidebar";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const defaultProps = {
    center: {
      lat: 23.7330218,
      lng: 90.3983829,
    },
    zoom: 11,
  };
  const state = useSelector((state) => state.auth);
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
          <GoogleMapReact
            bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <MapMarker lat={23.7330218} lng={90.3983829} text="My Marker" />
          </GoogleMapReact>
        </div>
      </div>
      <Filter />
    </div>
  );
};

export default Home;
