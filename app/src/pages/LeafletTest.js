import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import LeftDrawer from '../components/navigation/LeftDrawer';
import Drawer from '../components/navigation/Drawer';
import Card from '../components/navigation/RouteCard';
import ArrowBack from '../assets/ArrowBack.png';
import ArrowForward from '../assets/ArrowForward.png';
import L from "leaflet";
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };
  
  const Map = () => {
    return (
        <>
        <MapContainer
            center={{ lat: 1.36, lng: 103.8 }}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100vh', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            
            {/* <SVGOverlay> */}
            <LeftDrawer/>
            {/* </SVGOverlay> */}
            <Drawer/>
            
        </MapContainer>
      </>
    );
  };
  
  export default Map;