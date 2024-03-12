import React, { useState } from 'react';
import OutlinedButtons from '../components/ui/EditButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';



const StyledContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    marginTop: '30px'
  });
  
const StyledFormContainer = styled('div')({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  });



function AddSavedLocations() {
    const goHome = () => {
        window.location.href = '/home';
      };

    return (
    <>
    <StyledContainer>
    <StyledFormContainer>

    <ArrowBackIosIcon sx={{ mt:'15px', mb:'30px', ml:'17px' }} onClick={goHome}/>


    </StyledFormContainer>
    </StyledContainer>
    </>
    );
}

export default AddSavedLocations;