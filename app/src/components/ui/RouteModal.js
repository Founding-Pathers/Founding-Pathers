import React from 'react';
import { styled } from '@mui/system';
import { Modal, Typography, Box } from '@mui/material';
import Button from './Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CenterItem = styled('div')({
  textAlign: 'center',
  alignItems: 'center',
  width: '100%',
  paddingTop: '25px',
  justifyContent: 'center',
  display: 'flex'
});

export default function CustomModal({ isOpen, title1, title2, title3, description1, description2, description3, description4, description5, description6, description7, description8, icon, buttonText1, buttonText2, onClick1, onClick2 }) {
  const handleOnClick1 = () => {
    if (typeof onClick1 === 'function') {
      onClick1();
    } else if (typeof onClick1 === 'string') {
      window.location.href = onClick1;
    }
  };

  const handleOnClick2 = () => {
    if (typeof onClick2 === 'function') {
      onClick2();
    } else if (typeof onClick2 === 'string') {
      window.location.href = onClick2;
    }
  };

  return (
    <Modal
      icon={icon}
      open={isOpen}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '280px', height: 'auto', bgcolor: 'background.paper', borderRadius: '20px', padding: '25px' }} >
        <CenterItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px' }}>
          <Typography variant="h1" sx={{ color: '#000000' }}>
            {title1}<span style={{ color: '#FF9900' }}>{title2}</span>{title3}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ color: '#FF9900', fontWeight: '700' }}>{description1}</span>{description2}
            {description3 && <><br /><br /><span style={{ color: '#FF9900', fontWeight: '700' }}>{description3}</span>{description4}</>}
            {description5 && <><br /><br /><span style={{ color: '#FF9900', fontWeight: '700' }}>{description5}</span>{description6}</>}
            {description7 && <><br /><br /><span style={{ color: '#FF9900', fontWeight: '700' }}>{description7}</span>{description8}</>}
          </Typography>
        </CenterItem>

        <CenterItem style={{ display: 'grid', gap: '10px', paddingBottom: '10px' }}>
          {buttonText1 && <Button text={buttonText1} onClick={handleOnClick1} fontSize="18px" color="primary" height="40px" width="auto" textTransform="capitalize" icon={<ArrowForwardIcon style={{ color: 'white' }} />} ></Button>}
          {buttonText2 && <Button text={buttonText2} onClick={handleOnClick2} fontSize="18px" color="darkGrey" height="40px" width="auto" textTransform="capitalize" icon={<ArrowForwardIcon style={{ color: 'white' }} />} ></Button>}
        </CenterItem>
      </Box>
    </Modal>
  );
};