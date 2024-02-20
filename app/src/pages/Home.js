import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import LeftDrawer from '../components/navigation/LeftDrawer';
import Drawer from '../components/navigation/Drawer';
import Card from '../components/navigation/RouteCard';
import ArrowBack from '../assets/ArrowBack.png';
import ArrowForward from '../assets/ArrowForward.png';

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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const originRef = useRef()
  const destinationRef = useRef()

  const handleNext = () => {
    if (currentCardIndex < directionsResponse.routes.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentCardIndex(0); 
  }, [directionsResponse]);

  useEffect(() => {
    if (map && directionsResponse) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(directionsResponse);
      directionsRenderer.setRouteIndex(currentCardIndex);
      return () => {
        directionsRenderer.setMap(null);
      };
    }
  }, [map, directionsResponse, currentCardIndex]);

  //will be diff once routing engine is set up
  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === ''){
        return
    }

    console.log(directionsResponse)
    console.log(originRef.current.value)
    console.log(destinationRef.current.value)

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true
    })
    console.log(results)
    setDirectionsResponse(results)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    // originRef.current.value = ''
    // destinationRef.current.value = ''
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
        {/* <Card time="8 minutes" distance="0.6km" mode="Wheelchair" filters="F&B, Sheltered"></Card> */}
        {/* {directionsResponse && directionsResponse.routes.map((route, index) => (
            <>
            <Card key={index} routeNo={index} time={route.legs[0].duration.text} distance={route.legs[0].distance.text} mode={directionsResponse.request.travelMode} filters="F&B, Sheltered"></Card>
            <Button onClick={handlePrevious} text="p"></Button>
            <Button onClick={handleNext} text="n"></Button>
            </>
        ))} */}
        {directionsResponse && (
        <>
          <Card
            time={directionsResponse.routes[currentCardIndex].legs[0].duration.text}
            distance={directionsResponse.routes[currentCardIndex].legs[0].distance.text}
            mode={directionsResponse.request.travelMode}
            filters="F&B, Sheltered"
          />
          {currentCardIndex > 0 && <img style={{ top:"535px", left: "2px", width: "50px", height: "50px", position: 'absolute'}} src={ArrowBack} onClick={handlePrevious} />}
          {currentCardIndex < directionsResponse.routes.length - 1 && <img style={{ top:"535px", left:"345px", width: "50px", height: "50px", position: 'absolute'}} src={ArrowForward} onClick={handleNext} />}
        </>
        )}
        <Drawer originRef={originRef} destinationRef={destinationRef} clearRoute={clearRoute} calculateRoute={calculateRoute}></Drawer>
        <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse.routes[currentCardIndex]} />
          )}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Home)