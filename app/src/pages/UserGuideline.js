import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ug1 from '../assets/UserGuideline1.svg';
import ug2 from '../assets/UserGuideline2.svg';
import ug3 from '../assets/UserGuideline3.svg';
import ug4 from '../assets/UserGuideline4.svg';
import ug5 from '../assets/UserGuideline5.svg';

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
  paddingTop: '64px'
});

const VerticalSpace = styled('div')({
  margin: '8px 0'
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
  height: '100px',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'white',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'flex-end',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease'
});

const UserGuidelines = () => {
  const [page, setPage] = useState("introduction");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handleGuidelinePage = (page) => () => setPage(page);

  const guidelines = [
    { page: "introduction", buttonText: "Get Started", image: null, text: "Introduction", description: `Welcome to UR-Active, your personalised navigation companion, designed specifically for the best navigating experience using Singapore’s most comprehensive network system. Using this Walking Cycling Network (WCN) allows UR-Active to ensure you reach your destination efficiently with routes carefully crafted by city planners. Prepare to explore Singapore like never before with routes that offer personalised experience.` },
    { page: "guideline1", buttonText: "Next", image: ug1, text: "Entering your destination", description: null },
    { page: "guideline2", buttonText: "Next", image: ug2, text: "Selecting your search filters", description: null },
    { page: "guideline3", buttonText: "Next", image: ug3, text: "Selecting your travelling mode", description: null },
    { page: "guideline4", buttonText: "Next", image: ug4, text: "Selecting your route", description: null },
    { page: "guideline5", buttonText: "Done", image: ug5, text: "Managing your navigation", description: null }
  ];

  return (
    <StyledContainer>
      <StyledFormContainer>
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
              User Guidelines
            </Typography>
          )}
        </FrozenBar>

        <VerticalSpace>
          <CenterItem>
            <LeftItem>
              <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
              <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">User Guidelines</Typography>
            </LeftItem>
          </CenterItem>
        </VerticalSpace>

        {guidelines.map(({ page: guidelinePage, buttonText, image, text, description }, index) => (
          <React.Fragment key={index}>
            {page === guidelinePage && (
              <React.Fragment>
                <LeftItem style={{ paddingTop: '25px' }}>
                  <VerticalSpace>
                    <Typography variant="body1" sx={{ color: '#FF9900', fontSize: '20px', fontWeight: '600' }}>{text}</Typography>
                    <Typography sx={{ textAlign: 'start', marginTop: '10px' }}>{description}</Typography>
                  </VerticalSpace>
                </LeftItem>

                {image && <img src={image} alt={`User Guideline ${index + 1}`} style={{ width: '330px', height: 'auto', marginTop: '15px' }} />}

                <VerticalSpace style={{ display: 'flex', position: 'absolute', bottom: '22px', left: '30px', right: '30px', justifyContent: 'space-between' }}>
                  <LeftItem>
                    {page !== "introduction" && <Button text="BACK" onClick={handleGuidelinePage(guidelines[index - 1]?.page)} color="primary" height="40px" width="120px" startIcon={<ArrowBackIcon style={{ color: 'white' }} />} />}
                  </LeftItem>
                  <RightItem>
                    {page !== "guideline5" && <Button onClick={handleGuidelinePage(guidelines[index + 1]?.page)} text={buttonText} height="40px" width={buttonText === "Get Started" ? "200px" : "120px"} icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
                    {page === "guideline5" && <Button component={Link} to="/home" text="Done" height="40px" width="120px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />}
                  </RightItem>
                </VerticalSpace>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default UserGuidelines;