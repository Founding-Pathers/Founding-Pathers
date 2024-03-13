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
  console.log(process.env.REACT_APP_API_KEY)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC0yZHVhft1tT32bj9SRzL0bP2XzV1M2W4",
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

    fetchRoute()
    .then(data => {
      console.log(data); // Handle the fetched data here

       //loop through data for polyline
        var route = data[0].geometry.coordinates[0]
        var coors = [];
        for (var i=0; i<route.length; i++) {
          console.log(route[i][1], route[i][0]);
          coors.push(
            // eslint-disable-next-line no-undef
            new google.maps.LatLng(route[i][1], route[i][0]));
        }
        console.log(coors)
        setIsRouting(true);
        drawPolyline(coors);

    })
    .catch(error => {
      console.error('Error:', error); // Handle errors here
    });

    //eslint-disable-next-line no-undef
    // const directionsService = new google.maps.DirectionsService()
    // const results = await directionsService.route({
    //     origin: originRef.current.value,
    //     destination: destinationRef.current.value,
    //     // eslint-disable-next-line no-undef
    //     travelMode: google.maps.TravelMode.WALKING,
    //     provideRouteAlternatives: true
    // })
    // console.log(results)
    // setDirectionsResponse(results)

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

  //geocoding
  function codeAddress(address) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function(results, status) {
        if (status == 'OK') {
          var lat = results[0].geometry.location.lat();
          var long = results[0].geometry.location.lng();
          console.log(lat, long);
          resolve({ 'lat': lat, 'long': long });
        } else {
          reject(new Error('Geocode was not successful for the following reason: ' + status));
        }
      });
    });
  }

  // Function to fetch the route
  async function fetchRoute() {
    try {
      var origin_lat, origin_long, dest_lat, dest_long;
  
      if (originRef.current.value == "Current Location") {
        console.log(currentLocation)
        // const originLatLng = `${currentLocation.lat},${currentLocation.lng}`;
        // originRef.current.value = originLatLng;
        origin_lat = currentLocation.lat;
        origin_long = currentLocation.lng;
      }
      else {
        // Call codeAddress for origin and destination
        const o_results = await codeAddress(originRef.current.value);
        origin_lat = o_results.lat;
        origin_long = o_results.long;
      }

      
      
      const d_results = await codeAddress(destinationRef.current.value);
      dest_lat = d_results.lat;
      dest_long = d_results.long;
  
      console.log(origin_lat, origin_long);
      console.log(dest_lat, dest_long);

      // Fetch the route using the obtained coordinates
      const response = await fetch(`http://localhost:5000/shortestroute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin_lat: origin_lat,
          origin_long: origin_long,
          dest_lat: dest_lat,
          dest_long: dest_long
        })
      });
  
      // Parse the response
      const data = await response.json();
      return data;
  
    } catch (error) {
      throw new Error('Error fetching route: ' + error);
    }
  }

  function drawPolyline(coors) { 
      // initialize a Polyline object. You can set the color, width, opacity, etc. 
      // eslint-disable-next-line no-undef
      var Path = new google.maps.Polyline({
      path: coors,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
      });

      // set the polyline's map with your map object from above.
      Path.setMap(map);

      // Create bounds object to contain all coordinates
      // eslint-disable-next-line no-undef
      var bounds = new google.maps.LatLngBounds();
      coors.forEach(function(coordinate) {
          bounds.extend(coordinate);
      });

      // Fit the map to the bounds
      map.fitBounds(bounds);
  }
  

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
        <Marker style={{display: isRouting ? 'none' : 'block'}} position={originRef}/>
        <Marker position={currentLocation} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse.routes[currentCardIndex]} />
          )}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Home)