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
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ['places']
  })

  const [map, setMap] = React.useState(/** @type google.maps.Map*/ null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRouting, setIsRouting] = useState(false);
  const [selecting, setSelecting] = useState(false);

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
    if (originRef.current.value == "Current Location") {
        console.log(currentLocation)
        const originLatLng = `${currentLocation.lat},${currentLocation.lng}`;
        originRef.current.value = originLatLng;
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
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
  }

  //current location
  async function handleCurrentLocation() {
    // eslint-disable-next-line no-undef
    let infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
             // eslint-disable-next-line no-undef
            infoWindow.setPosition(pos);
             // eslint-disable-next-line no-undef
            infoWindow.setContent("Location found.");
             // eslint-disable-next-line no-undef
            infoWindow.open(map);
            map.setCenter(pos);
            setCurrentLocation(pos);
          },
          () => {
             // eslint-disable-next-line no-undef
            handleLocationError(true, infoWindow, map.getCenter());
          },
        );
      } else {
        // Browser doesn't support Geolocation
         // eslint-disable-next-line no-undef
        handleLocationError(false, infoWindow, map.getCenter());
      }
  };

  useEffect(() => {
    if (isLoaded) {
        handleCurrentLocation(); // Automatically ask for current location on component mount
    }
  }, [map]);

  function startRouting(currentCardIndex) {
    setDistance(directionsResponse.routes[currentCardIndex].legs[0].distance.text)
    setDuration(directionsResponse.routes[currentCardIndex].legs[0].duration.text)
    setIsRouting(true)
    setSelecting(false)
    console.log(isRouting)
  }

  function handleSelecting() {
    setSelecting(true);
  }

  const handleEndRouting = () => {
    setIsRouting(false); // Set isRouting to false
    clearRoute();
    handleCurrentLocation();
  };

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
        {directionsResponse && (
        <>
          <Card
            time={directionsResponse.routes[currentCardIndex].legs[0].duration.text}
            distance={directionsResponse.routes[currentCardIndex].legs[0].distance.text}
            mode={directionsResponse.request.travelMode}
            filters="F&B, Sheltered"
            onClick={() => startRouting(currentCardIndex)}
            display = { selecting ? 'flex' : 'none'}
          />
          {currentCardIndex > 0 && <img style={{ display: isRouting ? 'none' : 'block', top:"535px", left: "2px", width: "50px", height: "50px", position: 'absolute'}} src={ArrowBack} onClick={handlePrevious} />}
          {currentCardIndex < directionsResponse.routes.length - 1 && <img style={{ display: isRouting ? 'none' : 'block', top:"535px", left:"345px", width: "50px", height: "50px", position: 'absolute'}} src={ArrowForward} onClick={handleNext} />}
        </>
        )}
        <Drawer filters="F&B, Sheltered" duration={duration} distance={distance} handleSelecting={handleSelecting} isRouting={isRouting} handleEndRouting={handleEndRouting} originRef={originRef} destinationRef={destinationRef} calculateRoute={calculateRoute}></Drawer>
        <Marker position={currentLocation} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse.routes[currentCardIndex]} />
          )}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Home)