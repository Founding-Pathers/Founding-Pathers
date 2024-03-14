import React, { useState, useEffect } from 'react';
import { Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '30px'
});

const StyledFormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px',
});

const VerticalSpace = styled('div')({
  margin: '8px 0',
});

const LeftItem = styled('div')({
  textAlign: 'start',
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
  height: '100px',
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

const PrivacyPolicy = () => {
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

  return (
    <StyledContainer>

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
            whiteSpace: 'nowrap',
          }}
        >
          Privacy Policy
        </Typography>
      )}
    </FrozenBar>

      <StyledFormContainer>
          
          <VerticalSpace>
            <CenterItem>
              <LeftItem>
                <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
                <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">Privacy Policy</Typography>
              </LeftItem>
            </CenterItem>
          </VerticalSpace>

          <CenterItem>
            <VerticalSpace>
            <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>
                [to be replaced] UR-Active (the "Service") is provided by Founding Pathers (the “Company”) to our users in accordance to these Terms and Conditions ("Terms"). By using the Service, you agree to be bound by these Terms. Please read them carefully.
            </Typography>
            </VerticalSpace>
          </CenterItem>

    </StyledFormContainer>

    </StyledContainer>
  );
}

export default PrivacyPolicy;