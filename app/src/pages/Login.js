import React, { useState } from 'react';
import ReusableButton from '../components/ui/Button'; 
import TextField from '../components/ui/TextField';
import Checkbox from '../components/ui/Checkbox';
import Link from '../components/ui/Link';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from "react-router";
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

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  function updateForm(value) {
    console.log(value)
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
async function onSubmit(e){
  e.preventDefault();

  await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(form),
  })
  // handles response object from backend
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })
  // receive parsed JSON response of the above .then(response)
  .then((data) => {
    console.log(data);
    if (data === "Success") {
      navigate("/home");
    } else {
      navigate("/");
      // add frontend element to return invalid credentials
      alert("Invalid credentials");
    }
    })
  .catch(error => {
    console.error("Error:", error.message);
    alert("An error occurred. Please try again.");
  })
}

  return (
    <StyledContainer>
      <StyledFormContainer onSubmit={onSubmit}>
        
        <img src={Logo} alt="Cycle-Pathic" style={{ width: '75px', height: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: '24px' }} />

        <VerticalSpace>
        <Typography variant="h1">Log In</Typography>
        </VerticalSpace>

        <VerticalSpace>
        Email
        <TextField width="310px" id="outlined-required" label="" name="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })}/>
        </VerticalSpace>

        <VerticalSpace>
        Password
        <TextField width="310px" id="outlined-password-input" type="password" label="" name="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })}/>
        </VerticalSpace>

        <VerticalSpace>
        <Checkbox labelPlacement="end" label="Keep me signed in" value="isLoggedIn" />
        </VerticalSpace>

        <VerticalSpace>
          <RightItem>
          <ReusableButton text="LOG IN" color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />
          </RightItem>
        </VerticalSpace>

        <VerticalSpace>
        <CenterItem>
          Don't have an account? <Link link="/create" weight="bold" value="Sign up" color="primary"/>
        </CenterItem>
        </VerticalSpace>

      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Login;