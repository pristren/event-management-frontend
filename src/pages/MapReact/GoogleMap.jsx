import React from "react";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ children, ...props }) => (
  <div className="w-full h-full">
    <GoogleMapReact
      bootstrapURLKeys={{
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
);

export default GoogleMap;
