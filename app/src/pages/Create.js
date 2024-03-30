import React, { useState } from 'react';
import { useNavigate } from "react-router";
import ReusableButton from '../components/ui/Button'; 
import TextField from '../components/ui/TextField';
import Link from '../components/ui/Link';
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

const Create = () => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const navigate = useNavigate();
  
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const validationErrors = {};

    if (!form.email) {
      validationErrors.email = "Email is required";
    }
    if (!form.password) {
      validationErrors.password = "Password is required";
    }
    if (!form.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    }
    if (form.password !== form.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors); // Set the errors state

    if (Object.keys(validationErrors).length === 0) {

      const namePort = process.env.REACT_APP_NAMEPORT;
      const protocol = process.env.REACT_APP_PROTOCOL;
      
      // If there are no validation errors, proceed with form submission
      try {
        const response = await fetch(`${protocol}://${namePort}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error('Failed to register');
        }

        //add user preferences for later use
        const userData = {
          email: form.email,
          wheelchair_friendly: false,
          f_and_b: false,
          is_sheltered: false,
          tourist_attraction: false,
          bus_stop: false,
          mrt: false,
          pickup_dropoff: false,
          nature: false
        };
        
        await fetch(`${protocol}://${namePort}/userpref/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error("There was a problem with the request:", error);
        });

        setForm({ email: "", password: "", confirmPassword: "" });
        // Handle successful registration (redirect or show success message)
        navigate("/");
      } catch (error) {
        console.error('Registration error:', error);
        // Handle registration error (show error message to user)
        window.alert(error);
      }
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
          <TextField width="310px" id="email" label="" name="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} />
          {/* change the styling for FE */}{errors.email && <span className="error" style={{ color: 'red', backgroundColor: 'pink', borderRadius: '10px', padding: '5px', marginBottom: '10px' }}>{errors.email}</span>}
        </VerticalSpace>

        <VerticalSpace data-testid="password-form">
          Password
          <TextField width="310px" id="outlined-password-input" type="password" label="" name="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
          {/* change the styling for FE */}{errors.password && <span className="error" style={{ color: 'red', backgroundColor: 'pink', borderRadius: '10px', padding: '5px', marginBottom: '10px' }}>{errors.password}</span>}
        </VerticalSpace>

        <VerticalSpace data-testid="confirm-password-form">
          Confirm Password
          <TextField width="310px" id="outlined-confirmPassword-input" type="password" label="" name="confirmPassword" value={form.confirmPassword} onChange={(e) => updateForm({ confirmPassword: e.target.value })} />
          {/* change the styling for FE */}{errors.confirmPassword && <span className="error" style={{ color: 'red', backgroundColor: 'pink', borderRadius: '10px', padding: '5px', marginBottom: '10px' }}>{errors.confirmPassword}</span>}
        </VerticalSpace>

        <VerticalSpace>
          <RightItem>
          <ReusableButton onClick={onSubmit} type="submit" text="SIGN UP" color="primary" height="40px" width="140px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />
          </RightItem>
        </VerticalSpace>

        <VerticalSpace>
        <CenterItem>
          Already have an account? <Link link="/" weight="bold" value="Log in" color="primary"/>
        </CenterItem>
        </VerticalSpace>

      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Create;