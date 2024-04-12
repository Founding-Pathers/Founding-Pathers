import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import LeftDrawer from '../components/navigation/LeftDrawer';
import Drawer from '../components/navigation/Drawer';
import Card from '../components/navigation/RouteCard';
import Modal from '../components/ui/RouteModal';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import ErrorImg from '../assets/Error.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import locationIcon from '../assets/Location.png';
import FNB from '../assets/filters/fnb-circle.svg';
import Attractions from '../assets/filters/attraction-circle.svg';
import BusStops from '../assets/filters/bus-circle.svg';
import MRTs from '../assets/filters/mrt-circle.svg';
import PickUp from '../assets/filters/pickup-circle.svg';
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 1.36,
  lng: 103.8
};

const libraries = ['places'];

function Home() {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries
  })

  const [autocompleteService, setAutocompleteService] = React.useState(null);

  React.useEffect(() => {
    if (isLoaded) {
      // eslint-disable-next-line no-undef
      setAutocompleteService(new window.google.maps.places.AutocompleteService());
    }
  }, [isLoaded]);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const originRef = React.useRef(null);
  const destinationRef = useRef()

  //PAST SEARCHES
  const [pastSearches, setPastSearches] = useState([]);
  useEffect(() => {
    async function fetchPastSearches() {
      try {
        const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/pastsearches`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail")
          })
        });
  
        if (!response.ok) {
          // throw new Error('Server Error');
          console.error('Server error');
          setShowErrorAlert(true);
          setErrorMessage('An error occurred. Please try again later.');
          return;
        }
  
        const pastSearchesData = await response.json();

        const sortedDestinations = pastSearchesData.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });

        const uniqueDestinations = new Set();

        const uniqueDestinationsArray = sortedDestinations.filter(search => {
          if (!uniqueDestinations.has(search.destination)) {
            uniqueDestinations.add(search.destination);
            return true;
          }
          return false;
        }).map(search => search.destination);

        const topDestinations = uniqueDestinationsArray.slice(0, 5);

        setPastSearches(topDestinations);
      } catch (error) {
        setShowErrorAlert(true);
        setErrorMessage('App is currently unable to fetch past searches.');
        console.error('Failed to retrieve past searches:', error);
      }
    }
  
    fetchPastSearches();
  }, []);

  const [dlat, setdlat] = useState(null);
  const [dlong, setdlong] = useState(null);
  async function addPastSearch(email, lat, lon, destination) {
    console.log(email, lat, lon, destination);
    console.log("adding past search");
    try {
      const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/pastsearches/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          lat: lat,
          lon: lon,
          destination: destination
        })
      });
  
      if (!response.ok) {
        console.error('Server error');
        setShowErrorAlert(true);
        setErrorMessage('An error occurred. Please try again later.');
        return;
        // throw new Error('Server Error');
      }
      
      const pastSearch = await response.json();
      console.log(pastSearch);
      // return pastSearch;
    } catch (error) {
      console.error(error);
      return;
      // throw error;
    }
  }

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
        if (data.poi != null) {
          var poiArr = data.poi;
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
      setdlat(dest_lat);
      setdlong(dest_long);
  
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
      // throw new Error('Error fetching route: ' + error);
      console.error('Error fetching route: ' + error);
      setShowErrorAlert(true);
      setErrorMessage('Unable to fetch directions. Please try again later.');
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
          width: 40,  
          height: 40, 
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

   //VALIDATION
   const [isValidating, setIsValidating] = useState(false);
   const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
   const handleOpenDestinationModal = async () => {
     setIsDestinationModalOpen(true);
     await addPastSearch(localStorage.getItem("userEmail"), dlat, dlong, destinationRef.current.value);
   };
 
   const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
   const handleOpenFeedbackModal = async () => {
      //send route taken first
      const requestData = {
        email: localStorage.getItem("userEmail"),
        route_id: directionsResponse.route[0].properties.ROUTE_ID,
        travel_mode: directionsResponse.route[0].properties.TRAVEL_MOD,
        user_validated: false,
        point_validation: []
      };
      
      await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/routehistory/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then(response => response.json())
      .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

     setIsDestinationModalOpen(false);
     setIsFeedbackModalOpen(true);
   };
 
   const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
   const handleOpenInstructionsModal = () => {
     setIsDestinationModalOpen(false);
     setIsInstructionsModalOpen(true);
   };
   const handleCloseInstructionsModal = () => {
     setIsValidating(true);
     removeMarkers();
     setIsInstructionsModalOpen(false);
   };
 
   const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
   const handleOpenThankYouModal = () => {
     setIsThankYouModalOpen(true);
   };
 
   //marker placing in validation
   const [vadMarkers, setVadMarkers] = useState([]); 
 
     function handleMapClick(event) {
       // eslint-disable-next-line no-undef
         const newMarker = new google.maps.Marker({
             position: event.latLng,
             map: map,
             draggable: true
         });
 
         // eslint-disable-next-line no-undef
         google.maps.event.addListener(newMarker, 'dragend', () => handleMarkerDrag(newMarker)); //drag marker
         // eslint-disable-next-line no-undef
         google.maps.event.addListener(newMarker, 'dblclick', () => removeMarker(newMarker)); //remove marker when double clicked
 
         setVadMarkers(prevMarkers => [...prevMarkers, newMarker]);
     }
 
     function handleMarkerDrag(marker) {
       console.log('Marker dragged:', marker.getPosition());
   }
 
     function removeMarker(markerToRemove) {
       markerToRemove.setMap(null);
       setVadMarkers(prevMarkers => prevMarkers.filter(marker => marker !== markerToRemove));
   }
 
   useEffect(() => {
     if (isValidating) {
       // eslint-disable-next-line no-undef
         google.maps.event.addListener(map, 'click', handleMapClick);
     } 
 
     return () => {
         vadMarkers.forEach(marker => marker.setMap(null));
         setVadMarkers([]); 
     };
     }, [isValidating, map]);
 
     const [validationComplete, setValidationComplete] = useState(false);
 
     const endValidation = () => {
       setValidationComplete(true);
     }
 
     useEffect(() => {
       if (validationComplete) {
         const markerPositions = [];
     
         // Loop through each marker to fetch its position
         vadMarkers.forEach((marker, index) => {
           const position = marker.position;
          markerPositions.push({ lat: position.lat(), lng: position.lng() });
         });
         
         console.log(markerPositions);
         navigate('/validation', {
          state: {
            markerLocations: markerPositions,
            route_id: directionsResponse.route[0].properties.ROUTE_ID,
            travel_mode: directionsResponse.route[0].properties.TRAVEL_MOD
          }
        });
       }
     }, [validationComplete, vadMarkers]);

     const goToFeedback = () => {
      navigate('/feedback', {
        state: {
          route_id: directionsResponse.route[0].properties.ROUTE_ID,
          travel_mode: directionsResponse.route[0].properties.TRAVEL_MOD
        }
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
        <LeftDrawer firstname={localStorage.getItem("fn")} lastname={localStorage.getItem("ln")} email={localStorage.getItem("userEmail")}></LeftDrawer>
        <div>
          <button onClick={handleOpenDestinationModal}>Destination</button>
          <Modal isOpen={isDestinationModalOpen}
            title1="You have reached your "
            title2="destination"
            title3="!"
            description2="Please report any issues along your route, such as road closures"
            buttonText1="Issue to Report"
            onClick1={handleOpenInstructionsModal}
            buttonText2="Nothing to Report"
            onClick2={handleOpenFeedbackModal}
          />

          <Modal isOpen={isFeedbackModalOpen}
            title1="Thank you for navigating with us!"
            description2="Do take a short moment to fill up this feedback form to let us learn about your experience with UR-Active!"
            buttonText1="Feedback Form"
            onClick1="/feedback"
          />

          <Modal isOpen={isInstructionsModalOpen}
            title1="Report an issue"
            description1="1. Tap or double-tap near the route "
            description2="to place markers on the point(s) of the route where you encountered issue(s)"
            description3="2. Drag the markers "
            description4="to shift their locations"
            description5="3. Double-tap the markers "
            description6="to remove them"
            description7="4. Tap 'NEXT' "
            description8="to add a comment about the issue"
            buttonText1="START"
            onClick1={handleCloseInstructionsModal}
          />

          <Modal isOpen={isThankYouModalOpen}
            title1="Thank you for your input!"
            description2="Do take a short moment to fill up this feedback form to let us learn about your experience with UR-Active!"
            buttonText1="Feedback Form"
            onClick1={goToFeedback}
          />
        </div>
        {isValidating && vadMarkers.length > 0 && <div style={{right: 30, bottom: 30, position: 'fixed'}}>
        <Button text="NEXT" onClick={endValidation} fontSize="18px" color="primary" height="40px" width="auto" textTransform="capitalize" icon={<ArrowForwardIcon style={{ color: 'white' }} />} ></Button>
        </div>}

        {showErrorAlert && (
                    <Alert alertMessage={errorMessage} src={ErrorImg} onClick={() => setShowErrorAlert(false)} />
                )}
        {directionsResponse && (
        <>
          <Card
            time={(directionsResponse.route[0].properties.TimeTaken).toFixed(0) + " minutes"}
            distance={((directionsResponse.route[0].properties.TRAVELLING)/1000).toFixed(1) + " km"}
            mode={(directionsResponse.route[0].properties.TRAVEL_MOD).split("_")[0]}
            filters={(selectedPOIs.length > 0 ? selectedPOIs.join(", ") + ", " : "") + (directionsResponse.route[0].properties.TRAVEL_MOD).split("_")[1]}
            onClick={() => startRouting()}
            display = { selecting ? 'flex' : 'none'}
          />
        </>
        )}
        {!isValidating && <Drawer pastSearches={pastSearches} autocompleteService={autocompleteService} handleOpenDestinationModal={handleOpenDestinationModal} duration={duration} distance={distance} selectedPaths={selectedPaths} setSelectedPaths={setSelectedPaths} selectedPOIs={selectedPOIs.join(", ")} setSelectedPOIs={setSelectedPOIs} 
        handleSelecting={handleSelecting} isRouting={isRouting} handleRemoveMarks={handleRemoveMarks} handleEndRouting={handleEndRouting} originRef={originRef} destinationRef={destinationRef} calculateRoute={calculateRoute}></Drawer>}
      </GoogleMap>
  ) : <></>
}

export default React.memo(Home)