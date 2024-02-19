import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import LeftDrawer from './LeftDrawer';

const containerStyle = {
  width: '100%',
  height: '93vh',
  zIndex: 0
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCw-GydqxdA5aVu-LGYPlBdAAqH8r2mcm8"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options= {{mapTypeControl: false, fullScreenControl: false, zoomControl: false, streetViewControl: false}}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <LeftDrawer></LeftDrawer>
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)