import React from 'react';
import ReusableButton from '../components/Button'; 
import TextField from '../components/TextField';
import Link from '../components/Link';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import Logo from '../assets/Logo.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const Login = () => {
  return (
    <StyledContainer>
      <StyledFormContainer>
        
        <img src={Logo} alt="Cycle-Pathic" style={{ width: '75px', height: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: '24px' }} />

        <VerticalSpace>
        <Typography variant="h1">Sign Up</Typography>
        </VerticalSpace>

        <VerticalSpace>
        Email
        <TextField width="310px" id="outlined-required" label="" />
        </VerticalSpace>

        <VerticalSpace>
        Password
        <TextField width="310px" id="outlined-password-input" type="password" label="" />
        </VerticalSpace>

        <VerticalSpace>
        Confirm Password
        <TextField width="310px" id="outlined-password-input" type="password" label="" />
        </VerticalSpace>

        <VerticalSpace>
          <RightItem>
          <ReusableButton text="SIGN UP" color="primary" height="40px" width="140px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />
          </RightItem>
        </VerticalSpace>

        <VerticalSpace>
        <CenterItem>
          Already have an account? <Link link="/" value="Log in" color="primary"/>
        </CenterItem>
        </VerticalSpace>

      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Login;