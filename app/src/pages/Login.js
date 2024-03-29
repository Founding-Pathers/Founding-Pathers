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
  const namePort = process.env.REACT_APP_NAMEPORT;
  const protocol = process.env.REACT_APP_PROTOCOL;
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    userNotExist: ''
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
async function onSubmit(e){
  e.preventDefault();
  const validationErrors = {};

  if (!form.email) {
    validationErrors.email = "Email is required";
  }
  if (!form.password) {
    validationErrors.password = "Password is required";
  }

  setErrors(validationErrors); // Set the errors state
  
  if (Object.keys(validationErrors).length === 0) {

    await fetch(`${protocol}://${namePort}/login`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    credentials: 'include',
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
    if (data.message === "Success") {
      localStorage.setItem("userEmail",data.email);
      navigate("/home");
    }
    else if (data.message === "User does not exist"){
      setErrors(prevErrors => ({
        ...prevErrors,
        userNotExist: "User does not exist / Invalid credentials"
      }));
    }
    else {
      navigate("/");
    }
    })
  }
}

  return (
    <StyledContainer>
      <StyledFormContainer onSubmit={onSubmit}>
        
        <img src={Logo} alt="Cycle-Pathic" style={{ width: '75px', height: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: '24px' }} />

        <VerticalSpace>
        <Typography variant="h1">UR-Active</Typography>
        </VerticalSpace>

        <VerticalSpace data-testid="email-form">
        Email
        <TextField width="310px" id="outlined-required" label="" name="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })}/>
        {/* change the styling for FE */}{errors.email && <span className="error" style={{ color: 'red', backgroundColor: 'pink', borderRadius: '10px', padding: '5px', marginBottom: '10px' }}>{errors.email}</span>}
        </VerticalSpace>

        <VerticalSpace data-testid="password-form">
        Password
        <TextField width="310px" id="outlined-password-input" type="password" label="" name="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })}/>
        {/* change the styling for FE */}{errors.password && <span className="error" style={{ color: 'red', backgroundColor: 'pink', borderRadius: '10px', padding: '5px', marginBottom: '10px' }}>{errors.password}</span>}
        </VerticalSpace>

        {errors.userNotExist && <span className="error" style={{ color: 'red', backgroundColor: 'pink', borderRadius: '10px', padding: '5px', marginBottom: '10px', textAlign: 'center', display: 'block' }}>{errors.userNotExist}</span>}

        <VerticalSpace>
        <Checkbox labelPlacement="end" label="Keep me signed in" value="isLoggedIn" />
        </VerticalSpace>

        <VerticalSpace>
          <RightItem>
          <ReusableButton data-testid="submit-form" onClick={onSubmit} text="LOG IN" color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />
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