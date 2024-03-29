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
  const [textFieldValue1, setTextFieldValue1] = useState('');
  const [textFieldValue2, setTextFieldValue2] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [yesClicked1, setyesClicked1] = useState(false);
  const [noClicked1, setnoClicked1] = useState(false);
  const [yesClicked2, setyesClicked2] = useState(false);
  const [noClicked2, setnoClicked2] = useState(false);
  const [yesClicked3, setyesClicked3] = useState(false);
  const [noClicked3, setnoClicked3] = useState(false);
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

  const handleTextFieldChange1 = (event) => {
    setTextFieldValue1(event.target.value);
  };

  const handleTextFieldChange2 = (event) => {
    setTextFieldValue2(event.target.value);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleYesClick1 = () => {
    setyesClicked1(true);
    setnoClicked1(false);
  };
  
  const handleNoClick1 = () => {
    setnoClicked1(true);
    setyesClicked1(false);
  };  

  const handleYesClick2 = () => {
    setyesClicked2(true);
    setnoClicked2(false);
  };
  
  const handleNoClick2 = () => {
    setnoClicked2(true);
    setyesClicked2(false);
  };

  const handleYesClick3 = () => {
    setyesClicked3(true);
    setnoClicked3(false);
  };
  
  const handleNoClick3 = () => {
    setnoClicked3(true);
    setyesClicked3(false);
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
    if (textFieldValue1.trim() !== '') {
      setTextFieldsFilled1(true);
    } else {
      setTextFieldsFilled1(false);
    }
  }, [textFieldValue1]);

  useEffect(() => {
    // Check if all text fields are filled
    if (textFieldValue2.trim() !== '') {
      setTextFieldsFilled2(true);
    } else {
      setTextFieldsFilled2(false);
    }
  }, [textFieldValue2]);

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

  async function onSubmit(){
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

          <CenterItem>
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
          </CenterItem>

          <CenterItem>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Do you have any general comments about your experience using UR-Active?</Typography>
              <TextField
                multiline
                rows={4}
                style={{ width: '100%' }}
                value={textFieldValue1}
                onChange={handleTextFieldChange1}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "black",
                  }
                }}
              />
            </VerticalSpace>
          </CenterItem>

          <CenterItem>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Have you previously used this route or path on a different mapping application, such as Google Maps?</Typography>
              <LeftItem>
                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: yesClicked1 ? '#FF9900' : noClicked1 ? '' : '',  color: yesClicked1 ? 'white' : noClicked1 ? '' : 'black',  fontWeight: yesClicked1 ? '600' : noClicked1 ? '' : '',  borderColor: yesClicked1 ? 'white' : noClicked1 ? '' : 'primary' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={handleYesClick1}
                  >Yes</Button>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: noClicked1 ? '#FF9900' : yesClicked1 ? '' : '',  color: noClicked1 ? 'white' : yesClicked1 ? '' : 'black',  fontWeight: noClicked1 ? '600' : yesClicked1 ? '' : '',  borderColor: noClicked1 ? 'white' : yesClicked1 ? '' : 'primary' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={handleNoClick1}
                  >No</Button>
                </div>
              </LeftItem>
            </VerticalSpace>
          </CenterItem>

          <VerticalSpace style={{ display: 'flex', marginTop: '27px', marginBottom: '30px', justifyContent: 'space-between' }}>
            <RightItem>
              {selectedRating && yesClicked1 && textFieldsFilled1 && <ReusableButton text="NEXT" onClick={handleYesPage} color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
              {selectedRating && noClicked1 && textFieldsFilled1 && <ReusableButton text="SUBMIT" onClick={submitOnClick} color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
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

          <CenterItem>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Was the path generated by UR-Active faster than the paths you have previously used in other mapping applications?</Typography>
              <LeftItem>
                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: yesClicked2 ? '#FF9900' : noClicked2 ? '' : '',  color: yesClicked2 ? 'white' : noClicked2 ? '' : 'black',  fontWeight: yesClicked2 ? '600' : noClicked2 ? '' : '',  borderColor: yesClicked2 ? 'white' : noClicked2 ? '' : 'primary' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={handleYesClick2}
                  >Yes</Button>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: noClicked2 ? '#FF9900' : yesClicked2 ? '' : '',  color: noClicked2 ? 'white' : yesClicked2 ? '' : 'black',  fontWeight: noClicked2 ? '600' : yesClicked2 ? '' : '',  borderColor: noClicked2 ? 'white' : yesClicked2 ? '' : 'primary' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={handleNoClick2}
                  >No</Button>
                </div>
              </LeftItem>
            </VerticalSpace>
          </CenterItem>

          <CenterItem>
            <VerticalSpace>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Was the route provided by UR-Active more suited to your needs?</Typography>
              <LeftItem>
                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: yesClicked3 ? '#FF9900' : noClicked3 ? '' : '',  color: yesClicked3 ? 'white' : noClicked3 ? '' : 'black',  fontWeight: yesClicked3 ? '600' : noClicked3 ? '' : '',  borderColor: yesClicked3 ? 'white' : noClicked3 ? '' : 'primary' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={handleYesClick3}
                  >Yes</Button>
                  <Button
                    variant="outlined"
                    color="black"
                    size="small"
                    style={{ backgroundColor: noClicked3 ? '#FF9900' : yesClicked3 ? '' : '',  color: noClicked3 ? 'white' : yesClicked3 ? '' : 'black',  fontWeight: noClicked3 ? '600' : yesClicked3 ? '' : '',  borderColor: noClicked3 ? 'white' : yesClicked3 ? '' : 'primary' }}
                    sx={{ fontSize: '16px', fontWeight: 'regular', textTransform: 'capitalize', borderRadius: '10px' }}
                    onClick={handleNoClick3}
                  >No</Button>
                </div>
              </LeftItem>
            </VerticalSpace>
          </CenterItem>

          <CenterItem>
            <VerticalSpace style={{ width: '100%' }}>
              <Typography sx={{ textAlign: 'start', marginBottom: '20px' }}>Please provide your reasons.</Typography>
              <TextField
                multiline
                rows={4}
                style={{ width: '100%' }}
                value={textFieldValue2}
                onChange={handleTextFieldChange2}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    borderColor: "black",
                  }
                }}
              />
            </VerticalSpace>
          </CenterItem>

          <VerticalSpace style={{ display: 'flex', marginTop: '27px', marginBottom: '30px', justifyContent: 'space-between' }}>
            <LeftItem>
              <ReusableButton text="BACK" onClick={handleNoPage} color="primary" height="40px" width="130px" startIcon={<ArrowBackIcon style={{ color: 'white' }} />} />
            </LeftItem>
            <RightItem>
              {(yesClicked2 || noClicked2) && (yesClicked3 || noClicked3) && textFieldsFilled2 && <ReusableButton text="SUBMIT" onClick={handleThanksPage} color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
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