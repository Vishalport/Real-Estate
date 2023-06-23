import React from 'react'
import GoogleMapReact from 'google-map-react';
import {GOOGLE_PLACE_API_KEY} from "../../config/config";


export default function GoogleMapCard() {
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
  return (
    <div style={{ height: '350px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      />
    </div>
  )
}
