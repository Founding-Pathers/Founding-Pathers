import React, { useState, useEffect } from 'react';
import { Typography, styled } from '@mui/material';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const StyledContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '100vh',
    padding: '30px'
  });
  
const StyledFormContainer = styled('div')({
display: 'flex',
flexDirection: 'column',
paddingTop: '14px',
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

const Admin = () => {
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

  {/*
  const handleCallRoute = () => {
    
  };
  */}

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
            Admin
            </Typography>
        )}
      </FrozenBar>

      <StyledFormContainer>
        
        <VerticalSpace>
            <CenterItem>
              <LeftItem>
                <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
                <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">Admin</Typography>
              </LeftItem>
            </CenterItem>
          </VerticalSpace>
        
          <VerticalSpace>
            <CenterItem>
                <Button text="Call Route" /* onClick={handleCallRoute} */ color="primary" height="40px" width="auto" />
            </CenterItem>
          </VerticalSpace>
        
      </StyledFormContainer>
    </StyledContainer>
  );
}

export default Admin ;