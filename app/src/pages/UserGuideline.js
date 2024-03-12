import React, { useState } from 'react';
import ReusableButton from '../components/ui/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import ug1 from '../assets/UserGuideline1.svg';
import ug2 from '../assets/UserGuideline2.svg';
import ug3 from '../assets/UserGuideline3.svg';
import ug4 from '../assets/UserGuideline4.svg';
import ug5 from '../assets/UserGuideline5.svg';


const StyledContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  });
  
const StyledFormContainer = styled('div')({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  });

const VerticalSpace = styled('div')({
    margin: '8px 0',
  });
  
const RightItem = styled('div')({
    textAlign: 'end',
    alignItems: 'end',
    width: '100%',
  });
  
const CenterItem = styled('div')({
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
  });


  function Gallery() {  

    const [UG0Visible, setUG0Visible] = useState(true);
    const handleButton1Click = () => {setUG1Visible(!UG1Visible); setUG0Visible(!UG0Visible)}; // Toggle visibility state
    const [UG1Visible, setUG1Visible] = useState(false);
    const handleButton2Click = () => {setUG2Visible(!UG2Visible); setUG1Visible(!UG1Visible)};
    const [UG2Visible, setUG2Visible] = useState(false);
    const handleButton3Click = () => {setUG3Visible(!UG3Visible); setUG2Visible(!UG2Visible)};
    const [UG3Visible, setUG3Visible] = useState(false);
    const handleButton4Click = () => {setUG4Visible(!UG4Visible); setUG3Visible(!UG3Visible)};
    const [UG4Visible, setUG4Visible] = useState(false);
    const handleButton5Click = () => {setUG5Visible(!UG5Visible); setUG4Visible(!UG4Visible)};
    const [UG5Visible, setUG5Visible] = useState(false);

    const goHome = () => {
        window.location.href = '/home';
      }

    return (
      <>
      <StyledContainer>
      <StyledFormContainer>

      <ArrowBackIosIcon sx={{ mt:'15px', mb:'30px', ml:'17px' }} onClick={goHome}/>

      <VerticalSpace>
        <Typography variant="header1">User Guideline</Typography>
      </VerticalSpace>

      <div>
      {/* Introduction */}

      {UG0Visible && (
            <>
      <VerticalSpace style={{marginTop: '20px' }}>
        <Typography variant="header2">Introduction</Typography>
      </VerticalSpace>

      <p style={{ fontSize: '16px', marginTop: '30px', lineHeight: '24.2px', fontWeight: 600, color: '#000000', marginLeft: '30px', marginRight: '30px'}}>
      Welcome to UR-Active, your personalized navigation companion, designed specifically for the best navigating experience using Singapore’s most comprehensive network system. 
      Using this Walking Cycling Network (WCN) allows UR-Active to ensure you reach your destination efficiently with routes carefully crafted by city planners. 
      Prepare to explore Singapore like never before with routes that offer personalized experience.
      </p>    

      <VerticalSpace style={{ marginBottom: '33px', marginTop: '228px' }}>
        <RightItem>
        <ReusableButton onClick={handleButton1Click}
          text="Get Started"
          height="40px"
          width="200px"
          icon={<ArrowForwardIcon style={{ color: 'white' }} />}
          >
        </ReusableButton>
        </RightItem>
      </VerticalSpace>
            </>
        )}  
      </div>


      <div>
      {/* Getting Started with Direction 1.1 */}

        {UG1Visible && (
            <>
      <VerticalSpace style={{marginTop: '20px' }}>
        <Typography variant="header2">Get Started with Directions</Typography>
      </VerticalSpace>

      <CenterItem>
      <img 
        src={ug1} alt="User Guideline 1" style={{ width: '355px', height: 'auto', marginBottom: '40px', marginTop: '20px' }}>
      </img>
      </CenterItem>

      <VerticalSpace style={{ marginBottom: '33px', marginTop: '39px' }}>
        <RightItem>
        <ReusableButton onClick={handleButton2Click}
          text="Next"
          height="40px"
          width="120px"
          icon={<ArrowForwardIcon style={{ color: 'white' }} />}
          >
        </ReusableButton>
        </RightItem>
      </VerticalSpace>
            </>
        )}
      </div>


      <div>
      {/* Getting Started with Direction 1.2 */}

        {UG2Visible && (
            <>
      <VerticalSpace style={{marginTop: '20px' }}>
        <Typography variant="header2">Get Started with Directions</Typography>
      </VerticalSpace>

      <CenterItem>
      <img 
        src={ug2} alt="User Guideline 2" style={{ width: '356px', height: 'auto', marginBottom: '40px', marginTop: '20px'}}>
      </img>
      </CenterItem>

      <VerticalSpace style={{ marginBottom: '33px', marginTop: '39px' }}>
        <RightItem>
        <ReusableButton onClick={handleButton3Click}
          text="Next"
          height="40px"
          width="120px"
          icon={<ArrowForwardIcon style={{ color: 'white' }} />}
          >
        </ReusableButton>
        </RightItem>
      </VerticalSpace>
            </>
        )}
      </div>


      <div>
      {/* Getting Started with Direction 1.3 */}

        {UG3Visible && (
            <>
      <VerticalSpace style={{marginTop: '20px' }}>
        <Typography variant="header2">Get Started with Directions</Typography>
      </VerticalSpace>

      <CenterItem>
      <img 
        src={ug3} alt="User Guideline 3" style={{ width: '355px', height: 'auto', marginBottom: '40px', marginTop: '20px' }}>
      </img>
      </CenterItem>

      <VerticalSpace style={{ marginBottom: '33px', marginTop: '39px' }}>
        <RightItem>
        <ReusableButton onClick={handleButton4Click}
          text="Next"
          height="40px"
          width="120px"
          icon={<ArrowForwardIcon style={{ color: 'white' }} />}
          >
        </ReusableButton>
        </RightItem>
      </VerticalSpace>
            </>
        )}
      </div>


      <div>
      {/* Selecting Route 1.4 */}

        {UG4Visible && (
            <>
      <VerticalSpace style={{marginTop: '20px' }}>
        <Typography variant="header2">Selecting Route</Typography>
      </VerticalSpace>

      <CenterItem>
      <img 
        src={ug4} alt="User Guideline 4" style={{ width: '356px', height: 'auto', marginBottom: '40px', marginTop: '80px' }}>
      </img>
      </CenterItem>

      <VerticalSpace style={{ marginBottom: '35px', marginTop: '85px' }}>
        <RightItem>
        <ReusableButton onClick={handleButton5Click}
          text="Next"
          height="40px"
          width="120px"
          icon={<ArrowForwardIcon style={{ color: 'white' }} />}
          >
        </ReusableButton>
        </RightItem>
      </VerticalSpace>
            </>
        )}
      </div>


      <div>
      {/* During Navigation 1.5 */}

        {UG5Visible && (
            <>
      <VerticalSpace style={{marginTop: '20px' }}>
        <Typography variant="header2">During Navigation</Typography>
      </VerticalSpace>

      <CenterItem>
      <img 
        src={ug5} alt="User Guideline 5" style={{ width: '356px', height: 'auto', marginBottom: '115px', marginTop: '80px' }}>
      </img>
      </CenterItem>

      <VerticalSpace style={{ marginBottom: '35px', marginTop: '85px' }}>
        <RightItem>
        <ReusableButton onClick={goHome}
          text="Done"
          height="40px"
          width="120px"
          icon={<ArrowForwardIcon style={{ color: 'white' }} />}
          >
        </ReusableButton>
        </RightItem>
      </VerticalSpace>
            </>
        )}
      </div>

      </StyledFormContainer>
      </StyledContainer>
      </>
    );
  }
  
  export default Gallery;