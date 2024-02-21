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
    console.log(value)
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
      // If there are no validation errors, proceed with form submission
      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error('Failed to register');
        }

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
        <Typography variant="h1">Sign Up</Typography>
        </VerticalSpace>

        <VerticalSpace>
          Email
          <TextField width="310px" id="email" label="" name="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} />
          {/* change the styling for FE */}{errors.email && <span className="error" style={{ color: 'red', backgroundColor: 'pink' }}>{errors.email}</span>}
        </VerticalSpace>

        <VerticalSpace>
          Password
          <TextField width="310px" id="outlined-password-input" type="password" label="" name="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
          {/* change the styling for FE */}{errors.password && <span className="error" style={{ color: 'red', backgroundColor: 'pink' }}>{errors.password}</span>}
        </VerticalSpace>

        <VerticalSpace>
          Confirm Password
          <TextField width="310px" id="outlined-confirmPassword-input" type="password" label="" name="confirmPassword" value={form.confirmPassword} onChange={(e) => updateForm({ confirmPassword: e.target.value })} />
          {/* change the styling for FE */}{errors.confirmPassword && <span className="error" style={{ color: 'red', backgroundColor: 'pink' }}>{errors.confirmPassword}</span>}
        </VerticalSpace>

        <VerticalSpace>
          <RightItem>
          <ReusableButton type="submit" text="SIGN UP" color="primary" height="40px" width="140px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />
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