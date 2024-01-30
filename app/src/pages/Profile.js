import React, { useState } from 'react';
import ReusableButton from '../components/Button';
import TextField from '../components/TextField';
import Link from '../components/Link';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import User from '../assets/User.png';
import Dialog from '../components/Dialog';

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

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <StyledContainer>
      <StyledFormContainer>
        <img
          src={User}
          alt="Cycle-Pathic"
          style={{
            width: '75px',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '24px',
          }}
        />

        <CenterItem>
            <Typography variant="h2">John Doe</Typography>
        </CenterItem>

        <CenterItem>
            <Link link="/" value="Log Out" color="primary" />
        </CenterItem>

        <VerticalSpace>
          First Name
          <TextField
            width="310px"
            id="outlined-required"
            label=""
            disabled={!editMode}
          />
        </VerticalSpace>

        <VerticalSpace>
          Last Name
          <TextField
            width="310px"
            id="outlined-required"
            label=""
            disabled={!editMode}
          />
        </VerticalSpace>

        <VerticalSpace>
          Email
          <TextField
            width="310px"
            id="outlined-required"
            label=""
            disabled={!editMode}
          />
        </VerticalSpace>

        <VerticalSpace>
          Password
          <TextField
            width="310px"
            id="outlined-password-input"
            type="password"
            label=""
            disabled={!editMode}
          />
        </VerticalSpace>

        <RightItem>
          <Dialog
            buttonText="Delete Account"
            textColor="#000000"
            fontSize="14px"
            textTransform="none"
            dialogHeader="Are you sure you want to delete your account?"
            dialogContent="This action cannot be undone."
            agreeText="Yes"
            closeText="No"
          />
        </RightItem>

        <VerticalSpace><VerticalSpace>
          <CenterItem>
            <ReusableButton
              text={editMode ? 'UPDATE' : 'EDIT'}
              color="primary"
              height="40px"
              width="120px"
              onClick={handleEditClick}
            />
          </CenterItem>
        </VerticalSpace></VerticalSpace>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Profile;