import React, { useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import LeftDrawer from '../components/navigation/LeftDrawer';
import Drawer from '../components/navigation/Drawer';

const containerStyle = {
  width: '100%',
  height: '93vh'
};

const center = {
  lat: 1.36,
  lng: 103.8
};

function Home() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCw-GydqxdA5aVu-LGYPlBdAAqH8r2mcm8",
    libraries: ['places']
  })

  const [map, setMap] = React.useState(/** @type google.maps.Map*/ null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const originRef = useRef()
  const destinationRef = useRef()

  //will be diff once routing engine is set up
  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === ''){
        return
    }
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.WALKING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

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
        zoom={15}
        onLoad={(map) => setMap(map)}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <LeftDrawer></LeftDrawer>
        <Drawer originRef={originRef} destinationRef={destinationRef} calculateRoute={calculateRoute}></Drawer>
        <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Home)