import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating1Img from '../assets/Rating1.png';
import Rating2Img from '../assets/Rating2.png';
import Rating3Img from '../assets/Rating3.png';
import Rating4Img from '../assets/Rating4.png';
import Rating5Img from '../assets/Rating5.png';
import CyclingImg from '../assets/CyclingOrange.png';
import ReusableButton from '../components/ui/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
});

const StyledFormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const VerticalSpace = styled('div')({
  margin: '8px 0',
});

const LeftItem = styled('div')({
  textAlign: 'start',
  alignItems: 'end',
  width: '100%'
});

const RightItem = styled('div')({
  textAlign: 'end',
  alignItems: 'end',
  width: '100%'
});

const CenterItem = styled('div')({
  textAlign: 'center',
  alignItems: 'center',
  width: '100%',
  paddingTop: '25px',
  justifyContent: 'center',
  display: 'flex'
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

const Feedback = () => {
  const [generalComments, setgeneralComments] = useState('');
  const [reasonsComments, setreasonsComments] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [previousUse, setPreviousUse] = useState('');
  const [fasterPath, setFasterPath] = useState('');
  const [moreSuited, setMoreSuited] = useState('');
  const [textFieldsFilled1, setTextFieldsFilled1] = useState(false);
  const [textFieldsFilled2, setTextFieldsFilled2] = useState(false);
  const [page, setPage] = useState("no");
  const [scrolled, setScrolled] = useState(false);

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

  const handleGeneralCommentsChange = (event) => {
    setgeneralComments(event.target.value);
  };

  const handleReasonsCommentsChange = (event) => {
    setreasonsComments(event.target.value);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handlePreviousUse = (boolean) => {
    setPreviousUse(boolean);
  };

  const handleFasterPath = (boolean) => {
    setFasterPath(boolean);
  };

  const handleMoreSuited = (boolean) => {
    setMoreSuited(boolean);
  };

  const handleNoPage = () => {
    setPage("no");
  };
  
  const handleYesPage = () => {
    setPage("yes");
  };

  const handleThanksPage = () => {
    setPage("thanks");
  };

  useEffect(() => {
    // Check if all text fields are filled
    if (generalComments.trim() !== '') {
      setTextFieldsFilled1(true);
    } else {
      setTextFieldsFilled1(false);
    }
  }, [generalComments]);

  useEffect(() => {
    // Check if all text fields are filled
    if (reasonsComments.trim() !== '') {
      setTextFieldsFilled2(true);
    } else {
      setTextFieldsFilled2(false);
    }
  }, [reasonsComments]);

  useEffect(() => {
    if (page === "thanks") {
      const timer = setTimeout(() => {
        // Redirect to "/home" after 3 seconds
        window.location.href = "/home";
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [page]);

  const submitOnClick = () => {
    onSubmit();
    handleThanksPage();
  };

  async function onSubmit() {
    try {
      const email = localStorage.getItem("userEmail");

      const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/routefeedback/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          overall_exp: selectedRating,
          general_comments: generalComments,
          previous_use: previousUse,
          faster_path: fasterPath,
          more_suited: moreSuited,
          reasons: reasonsComments 
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log("Feedback submitted:", data);
      
    } catch (error) {
      throw new Error('Error submitting feedback: ', error);
    }
  }

  if (page === "no") {
    return (
      <StyledContainer style={{ padding: '30px' }}>

        <FrozenBar scrolled={scrolled}>
          <Link to="/home"><ArrowBackIosNewIcon sx={{ color: '#000000', paddingLeft: '30px', paddingBottom: '10px' }} /></Link>
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
              Feedback Form
            </Typography>
          )}
        </FrozenBar>

        <StyledFormContainer style={{ paddingTop: '14px' }} onSubmit={onSubmit}>

          <VerticalSpace>
            <CenterItem>
              <LeftItem>
                <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
                <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">Feedback Form</Typography>
              </LeftItem>
            </CenterItem>
          </VerticalSpace>

          <LeftItem sx={{ paddingTop: '25px' }}>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>How would you rate your overall experience using UR-Active?</Typography>
              <div className="emoji-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '45px' }}>
                  <img
                    src={Rating1Img}
                    alt="Rating 1"
                    style={{ height: '40px', border: selectedRating === 1 ? '3px solid #FF9900' : '', borderRadius: '10px', padding: '7px' }}
                    onClick={() => handleRatingClick(1)}
                  />
                  <img
                    src={Rating2Img}
                    alt="Rating 2"
                    style={{ height: '40px', border: selectedRating === 2 ? '3px solid #FF9900' : '', borderRadius: '10px', padding: '7px' }}
                    onClick={() => handleRatingClick(2)}
                  />
                  <img
                    src={Rating3Img}
                    alt="Rating 3"
                    style={{ height: '40px', border: selectedRating === 3 ? '3px solid #FF9900' : '', borderRadius: '10px', padding: '7px' }}
                    onClick={() => handleRatingClick(3)}
                  />
                  <img
                    src={Rating4Img}
                    alt="Rating 4"
                    style={{ height: '40px', border: selectedRating === 4 ? '3px solid #FF9900' : '', borderRadius: '10px', padding: '7px' }}
                    onClick={() => handleRatingClick(4)}
                  />
                  <img
                    src={Rating5Img}
                    alt="Rating 5"
                    style={{ height: '40px', border: selectedRating === 5 ? '3px solid #FF9900' : '', borderRadius: '10px', padding: '7px' }}
                    onClick={() => handleRatingClick(5)}
                  />
                </div>
            </VerticalSpace>
          </LeftItem>

          <LeftItem sx={{ paddingTop: '25px' }}>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Do you have any general comments about your experience using UR-Active?</Typography>
              <TextField
                multiline
                rows={4}
                style={{ width: '100%' }}
                value={generalComments}
                onChange={handleGeneralCommentsChange}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "black",
                  }
                }}
              />
            </VerticalSpace>
          </LeftItem>

          <LeftItem sx={{ paddingTop: '25px' }}>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Have you previously used this route or path on a different mapping application, such as Google Maps?</Typography>
              <LeftItem>
                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: previousUse === true ? '#FF9900' : '',  color: previousUse === true ? 'white' : 'black',  fontWeight: previousUse === true ? '600' : '',  borderColor: previousUse === true ? '#FF9900' : 'black' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={() => handlePreviousUse(true)}
                  >Yes</Button>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: previousUse === false ? '#FF9900' : '',  color: previousUse === false ? 'white' : 'black',  fontWeight: previousUse === false ? '600' : '',  borderColor: previousUse === false ? '#FF9900' : 'black' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={() => handlePreviousUse(false)}
                  >No</Button>
                </div>
              </LeftItem>
            </VerticalSpace>
          </LeftItem>

          <VerticalSpace style={{ display: 'flex', marginTop: '27px', marginBottom: '30px', justifyContent: 'space-between' }}>
            <RightItem>
              {selectedRating && previousUse === true && textFieldsFilled1 && <ReusableButton text="NEXT" onClick={handleYesPage} color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
              {selectedRating && previousUse === false && textFieldsFilled1 && <ReusableButton text="SUBMIT" data-testid="submit-form" onClick={submitOnClick} color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
            </RightItem>
          </VerticalSpace>

        </StyledFormContainer>

      </StyledContainer>
    );
  } else if (page === "yes") {
    return (
      <StyledContainer style={{ padding: '30px' }}>

        <FrozenBar scrolled={scrolled}>
          <Link to="/home"><ArrowBackIosNewIcon sx={{ color: '#000000', paddingLeft: '30px', paddingBottom: '10px' }} /></Link>
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
              Terms and Conditions
            </Typography>
          )}
        </FrozenBar>

        <StyledFormContainer style={{ paddingTop: '14px' }}>

          <VerticalSpace>
            <CenterItem>
              <LeftItem>
                <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
                <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">Feedback Form</Typography>
              </LeftItem>
            </CenterItem>
          </VerticalSpace>

          <LeftItem sx={{ paddingTop: '25px' }}>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Was the path generated by UR-Active faster than the paths you have previously used in other mapping applications?</Typography>
              <LeftItem>
                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: fasterPath === true ? '#FF9900' : '',  color: fasterPath === true ? 'white' : 'black',  fontWeight: fasterPath === true ? '600' : '',  borderColor: fasterPath === true ? '#FF9900' : 'black' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={() => handleFasterPath(true)}
                  >Yes</Button>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: fasterPath === false ? '#FF9900' : '',  color: fasterPath === false ? 'white' : 'black',  fontWeight: fasterPath === false ? '600' : '',  borderColor: fasterPath === false ? '#FF9900' : 'black' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={() => handleFasterPath(false)}
                  >No</Button>
                </div>
              </LeftItem>
            </VerticalSpace>
          </LeftItem>

          <LeftItem sx={{ paddingTop: '25px' }}>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Was the route provided by UR-Active more suited to your needs?</Typography>
              <LeftItem>
                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: moreSuited === true ? '#FF9900' : '',  color: moreSuited === true ? 'white' : 'black',  fontWeight: moreSuited === true ? '600' : '',  borderColor: moreSuited === true ? '#FF9900' : 'black' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={() => handleMoreSuited(true)}
                  >Yes</Button>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: moreSuited === false ? '#FF9900' : '',  color: moreSuited === false ? 'white' : 'black',  fontWeight: moreSuited === false ? '600' : '',  borderColor: moreSuited === false ? '#FF9900' : 'black' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={() => handleMoreSuited(false)}
                  >No</Button>
                </div>
              </LeftItem>
            </VerticalSpace>
          </LeftItem>

          <LeftItem sx={{ paddingTop: '25px' }}>
            <VerticalSpace style={{ width: '100%' }}>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Please provide your reasons.</Typography>
              <TextField
                multiline
                rows={4}
                style={{ width: '100%' }}
                value={reasonsComments}
                onChange={handleReasonsCommentsChange}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "black",
                  }
                }}
              />
            </VerticalSpace>
          </LeftItem>

          <VerticalSpace style={{ display: 'flex', marginTop: '27px', marginBottom: '30px', justifyContent: 'space-between' }}>
            <LeftItem>
              <ReusableButton text="BACK" onClick={handleNoPage} color="primary" height="40px" width="130px" startIcon={<ArrowBackIcon style={{ color: 'white' }} />} />
            </LeftItem>
            <RightItem>
              {(fasterPath === true || fasterPath === false) && (moreSuited === true || moreSuited === false) && textFieldsFilled2 && <ReusableButton text="SUBMIT" onClick={submitOnClick} color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
            </RightItem>
          </VerticalSpace>

        </StyledFormContainer>

      </StyledContainer>
    );
  } else if (page === "thanks") {
    return (
      <StyledContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StyledFormContainer style={{ maxWidth: '280px' }}>
          
          <img src={CyclingImg} alt="Cycle-Pathic" style={{ width: '75px', height: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: '24px' }} />
          <Typography variant="h1">Thank You!</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>Your feedback is important in helping us improve UR-Active for everyone</Typography>

        </StyledFormContainer>
      </StyledContainer>
    )
  }
}

export default Feedback;