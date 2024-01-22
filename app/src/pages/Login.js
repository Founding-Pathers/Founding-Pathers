import React from 'react';
import ReusableButton from '../components/Button'; 
import TextField from '../components/TextField';
import Checkbox from '../components/Checkbox';
import Link from '../components/Link';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import Logo from '../assets/Logo.png';

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
        <Typography variant="h1">Log In</Typography>
        </VerticalSpace>

        <VerticalSpace>
        Email
        <TextField width="40ch" id="outlined-required" label="" />
        </VerticalSpace>

        <VerticalSpace>
        Password
        <TextField width="40ch" id="outlined-password-input" type="password" label="" />
        </VerticalSpace>

        <VerticalSpace>
        <Checkbox labelPlacement="end" label="Keep me signed in" value="isLoggedIn" />
        </VerticalSpace>

        <VerticalSpace>
          <RightItem>
          <ReusableButton text="LOG IN" color="primary" />
          </RightItem>
        </VerticalSpace>

        <VerticalSpace>
        <CenterItem>
          Don't have an account? <Link value="Sign up" color="primary" />
        </CenterItem>
        </VerticalSpace>

      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Login;