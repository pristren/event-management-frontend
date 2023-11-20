import { useState } from "react";
import Filter from "./Filter";
import HomeNavbar from "./HomeNavbar";
import HomeSidebar from "./HomeSidebar";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

const Home = () => {
  const [isExpand, setIsExpand] = useState(false);
  const defaultProps = {
    center: {
      lat: 23.7330218,
      lng: 90.3983829,
    },
    zoom: 11,
  };
  return (
    <div className="text-whitefont-semibold">
      <HomeNavbar setIsExpand={setIsExpand} isExpand={isExpand} />
      <div className="flex">
        <HomeSidebar setIsExpand={setIsExpand} isExpand={isExpand} />
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
