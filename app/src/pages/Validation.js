import React, { useState, useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import ValidationForm from '../components/validation/ValidationForm';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Modal from '../components/ui/RouteModal';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
});

const FrozenBar = styled('div')({
  width: '100%',
  height: '50px',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'white',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'flex-end',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
});

const Validation = () => {
  const location = useLocation();
  const state = location.state;
  const [prevState, setPrevState] = useState(state);
  console.log(prevState);

  const [markerLocations, setMarkerLocations] = useState(["dummy"]);
  const [routeId, setRouteId] = useState(0);
  const [travelMode, setTravelMode] = useState("");

  useEffect(() => {
    if (prevState) {
      setMarkerLocations(prevState.markerLocations);
      setRouteId(prevState.route_id);
      setTravelMode(prevState.travel_mode);
    }
  }, [prevState]);

  console.log(localStorage.getItem("userEmail"));
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [collectedData, setCollectedData] = useState([]); 

  // Handler to collect data from ValidationForm
  const collectFormData = (data) => {
    setCollectedData(prevData => {
      const newData = [...prevData];
      const index = currentPage;
      if (index >= 0 && index < newData.length) {
        newData[index] = data;
      } else {
        newData.push(data);
      }
      return newData;
    });
    console.log(collectedData);
  };

  useEffect(() => {
    console.log("Collected data:", collectedData);
    
    if (collectedData.length == markerLocations.length) {
      handleSubmit();
    }
  }, [collectedData]);

  // Handler to submit collected data
  const handleSubmit = () => {
    console.log("Submitted data:", collectedData);

    var point_validation = {};
    for (var i = 0; i<collectedData.length; i++) {
      point_validation[i] = {};
      point_validation[i]["lon"] = markerLocations[i]["lng"];
      point_validation[i]["lat"] = markerLocations[i]["lat"];
      point_validation[i]["comments"] = collectedData[i]["textFieldValue"];
      var img_arr = [];
      for (var j=0; j<collectedData[i]["thumbnails"].length; j++) {
        img_arr.push(collectedData[i]["thumbnails"][j]["url"]);
      }
      point_validation[i]["pictures"] = img_arr;
    }
    console.log(point_validation)

    const requestData = {
      email: localStorage.getItem("userEmail"),
      route_id: routeId,
      travel_mode: travelMode,
      user_validated: true,
      point_validation: point_validation
    };
    
    fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/routehistory/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    handleOpenFeedbackModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //to feedback
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  //between pages
  const handleNextPage = () => {
    if (currentPage < markerLocations.length - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleBackPage = () => { // Define handleBackPage function
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <StyledContainer style={{ padding: '30px' }}>

      <FrozenBar scrolled={scrolled}>
        <ArrowBackIosNewIcon onClick={handleOpenFeedbackModal} sx={{ color: '#000000', paddingLeft: '30px', paddingBottom: '10px' }} />
        {scrolled && (
          <Typography
            variant="body1"
            sx={{
              paddingBottom: '10px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#FF9900',
              fontSize: '20px',
              fontWeight: '600',
              whiteSpace: 'nowrap', // Prevent the text from wrapping to the next line
            }}
          >
            Issue Reporting Form
          </Typography>
        )}
      </FrozenBar>

      <ValidationForm page={currentPage} formData={markerLocations} onNext={handleNextPage} onBack={handleBackPage} collectedData={collectedData} collectFormData={collectFormData} />

      <Modal isOpen={isFeedbackModalOpen}
          title1="Thank you for navigating with us!"
          description2="Do take a short moment to fill up this feedback form to let us learn about your experience with UR-Active!"
          buttonText1="Feedback Form"
          onClick1="/feedback"
        />

    </StyledContainer>
  );
};

export default Validation;
