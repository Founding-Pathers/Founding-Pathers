import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import LeftDrawer from '../components/navigation/LeftDrawer';
import Drawer from '../components/navigation/Drawer';
import Card from '../components/navigation/RouteCard';
import locationIcon from '../assets/Location.png';
import BusStops from '../assets/filters/bus.png';
import Attractions from '../assets/filters/attractions.png';
import PickUp from '../assets/filters/carIcon.png';
import FNB from '../assets/filters/foodIcon.png';
import MRTs from '../assets/filters/trainIcon.png';

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
  const [isRouting, setIsRouting] = useState(false);
  const [selecting, setSelecting] = useState(false);

  //POIs State
  const [selectedPOIs, setSelectedPOIs] = useState([]);
  //Path Preferences
  const [selectedPaths, setSelectedPaths] = useState(null);
  
  //current markers + polylines on map
  const [markers, setMarkers] = useState([]);
  const [ODMarkers, setODMarkers] = useState([]);
  const [path, setPath] = useState(null);

  const originRef = useRef()
  const destinationRef = useRef()

  async function calculateRoute(travelMode) {
    if (originRef.current.value === '' || destinationRef.current.value === ''){
        return
    }

    fetchRoute(travelMode)
    .then(data => {
      console.log(data); // Handle the fetched data here

       //loop through data for polyline
        var route = data.route[0].geometry.coordinates[0]
        var coors = [];
        for (var i=0; i<route.length; i++) {
          console.log(route[i][1], route[i][0]);
          coors.push(
            // eslint-disable-next-line no-undef
            new google.maps.LatLng(route[i][1], route[i][0]));
        }
        console.log(coors)
        
        //DRAW ROUTE
        drawPolyline(coors);

        //RENDER MARKERS
        if (data.pois != null) {
          var poiArr = data.pois;
          renderMarkers(poiArr, map);
        }
    })
    .catch(error => {
      console.error('Error:', error); // Handle errors here
    });

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

  function startRouting() {
    setDistance(directionsResponse.route[0].properties.TRAVELLING)
    setDuration(directionsResponse.route[0].properties.TimeTaken)
    setIsRouting(true)
    setSelecting(false)
    console.log(isRouting)
  }

  function handleSelecting() {
    setSelecting(true);
  }

  const handleRemoveMarks = () => {
    removeMarkers();
    removePolylines();
  }

  const handleEndRouting = () => {
    setIsRouting(false); // Set isRouting to false
    clearRoute();
    handleCurrentLocation();
    window.location.reload();
  };

  function removeMarkers() {
    if (markers.length != 0) {
      markers.forEach(markerObj => {
        markerObj.marker.setMap(null); 
      });
      setMarkers([]);
    }
    if (ODMarkers.length!=0) {
      ODMarkers.forEach(markerObj => {
        markerObj.marker.setMap(null); 
      });
      setODMarkers([]);
    }
  }
  
  function removePolylines() {
    if (path) {
      path.setMap(null); 
    }
  }

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
  async function fetchRoute(travelMode) {
    try {
      var origin_lat, origin_long, dest_lat, dest_long;
  
      if (originRef.current.value == "Current Location") {
        console.log(currentLocation)
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
      
      console.log(travelMode);
      console.log(selectedPaths);
      console.log(selectedPOIs);

      var route_op;
      if (travelMode == "walk") {
        if (selectedPaths == null) {
          route_op = "shortest";
        }
        else {
          route_op = selectedPaths;
        }
      }
      else {
        if (selectedPaths == null) {
          route_op = travelMode + "_shortest";
        }
        else {
          route_op = travelMode + "_" + selectedPaths;
        }
      }

      // Fetch the route using the obtained coordinates
      const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin_lat: origin_lat,
          origin_long: origin_long,
          dest_lat: dest_lat,
          dest_long: dest_long,
          route_op: route_op,
          type: selectedPOIs,
          distance: 200
        })
      });
  
      // Parse the response
      const data = await response.json();
      setDirectionsResponse(data);

      const newODMarkers = [];
      // Markers
      const iconSize = {
        width: 35,  
        height: 35, 
      };
      // Create a new icon object with the specified size
      const icon = {
        url: locationIcon,
        // eslint-disable-next-line no-undef
        scaledSize: new google.maps.Size(iconSize.width, iconSize.height),
      };
      // eslint-disable-next-line no-undef
      const originMarker = new google.maps.Marker({
        position: { lat: origin_lat, lng: origin_long },
        map,
        icon: icon
      });
      newODMarkers.push({ marker: originMarker });

      // eslint-disable-next-line no-undef
      const destMarker = new google.maps.Marker({
        position: { lat: dest_lat, lng: dest_long },
        map
      });
      newODMarkers.push({ marker: destMarker });

      setODMarkers(newODMarkers);
      
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
      setPath(Path);

      // Create bounds object to contain all coordinates
      // eslint-disable-next-line no-undef
      var bounds = new google.maps.LatLngBounds();
      coors.forEach(function(coordinate) {
          bounds.extend(coordinate);
      });

      // Fit the map to the bounds
      map.fitBounds(bounds);
  }

async function renderMarkers(poiArr, map) {
  // Clear previous markers
  markers.forEach(markerObj => {
      markerObj.marker.setMap(null);
  });
  setMarkers([]);

  var newMarkers = [];

  for (var poiObj of poiArr) {
      var icon;
      const iconSize = {
          width: 30,  
          height: 30, 
      };
      var type = poiObj.properties.type;
      if (type == "FNB") {
          icon = {
              url: FNB,
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(iconSize.width, iconSize.height),
          };
      } else if (type == "TOURISM") {
          icon = {
              url: Attractions,
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(iconSize.width, iconSize.height),
          };
      } else if (type == "BUSSTOP") {
          icon = {
              url: BusStops,
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(iconSize.width, iconSize.height),
          };
      } else if (type == "MRT") {
          icon = {
              url: MRTs,
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(iconSize.width, iconSize.height),
          };
      } else {
          icon = {
              url: PickUp,
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(iconSize.width, iconSize.height),
          };
      }

      // eslint-disable-next-line no-undef
      var infowindow = new google.maps.InfoWindow();
      // eslint-disable-next-line no-undef
      var marker = new google.maps.Marker({
        // eslint-disable-next-line no-undef
          position: new google.maps.LatLng(poiObj.properties.LAT, poiObj.properties.LONG),
          map: map,
          icon: icon
      });

      makeInfoWindowEvent(map, infowindow, poiObj._id, marker);

      newMarkers.push({ marker: marker, infowindow: infowindow });
  }

  setMarkers(newMarkers);
}

  function makeInfoWindowEvent(map, infowindow, contentString, marker) {
    // eslint-disable-next-line no-undef
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
    });
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
            time={(directionsResponse.route[0].properties.TimeTaken).toFixed(0) + " minutes"}
            distance={((directionsResponse.route[0].properties.TRAVELLING)/1000).toFixed(1) + " km"}
            mode={(directionsResponse.route[0].properties.TRAVEL_MOD).split("_")[0]}
            filters={selectedPOIs.join(", ")}
            onClick={() => startRouting()}
            display = { selecting ? 'flex' : 'none'}
          />
        </>
        )}
        <Drawer duration={duration} distance={distance} selectedPaths={selectedPaths} setSelectedPaths={setSelectedPaths} selectedPOIs={selectedPOIs.join(", ")} setSelectedPOIs={setSelectedPOIs} handleSelecting={handleSelecting} isRouting={isRouting} handleRemoveMarks={handleRemoveMarks} handleEndRouting={handleEndRouting} originRef={originRef} destinationRef={destinationRef} calculateRoute={calculateRoute}></Drawer>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Home)