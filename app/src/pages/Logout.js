import Logo from '../assets/Logo.png';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import Link from '../components/Link';

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

const CenterItem = styled('div')({
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: '15px',
    justifyContent: 'center',
    display: 'flex',
    paddingLeft: 7
});

const Deleted = () => {
    return (
      <StyledContainer>
        <StyledFormContainer>
          
          <img src={Logo} alt="Cycle-Pathic" style={{ width: '75px', height: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: '24px' }} />

          <VerticalSpace>
            <Typography variant="h1">You are now</Typography>
            <Typography variant="h1">logged out</Typography>
          </VerticalSpace>

          <CenterItem>
            Got another account? <Link link="/" weight="bold" value="Log In" color="primary"/>
          </CenterItem>

        </StyledFormContainer>
      </StyledContainer>
    );
  };
  
  export default Deleted;