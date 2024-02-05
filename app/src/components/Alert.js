import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function ActionAlerts({alertMessage, onClick, src}) {
  return (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
      zIndex: 999, // adjust the z-index as needed
    }}
  >
    <Stack spacing={0} alignItems="center">
      <Alert
        sx={{ width: "270px", 
        height: "178.5px", 
        marginLeft: "auto", 
        marginRight: "auto", 
        borderRadius: "20px",
        fontSize: "18px", 
        color: "#000000",
        fontWeight: 600,
        bgcolor: 'background.paper',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0
       }}
        variant="outlined" 
        severity="warning"
        icon={false}
        action={
            <Button
              sx={{
                fontSize: '16px',
                color: "main",
                width: '250px',
                fontWeight: 600,
                textTransform: 'none',
                paddingTop: 0,
                marginLeft: 0,
                paddingLeft: 0,
                marginRight: "20px",
                marginBottom: "5px"
              }}
              onClick={onClick}
            >
              Close
            </Button>
        }
      >
        <div style={{display:"flex", justifyContent: "center", alignItems:"center", width:"100%", paddingLeft: 0}}>
        <img src={src} alt="icon" style={{ height: '45px', width: '45px', paddingRight: "auto", paddingLeft: "auto"}} />
        </div>
        <div style={{textAlign: "center", paddingLeft: "16px", paddingRight: "16px", paddingTop: "10px", paddingBottom: "10px"}}>
        {alertMessage}
        </div>
        <Divider />
      </Alert>
    </Stack>
    </div>
  );
}