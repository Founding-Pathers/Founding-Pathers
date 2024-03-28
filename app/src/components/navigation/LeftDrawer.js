import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import UserIcon from '../../assets/User.png';
import Menu from '../../assets/Menu.png';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router";
import LogoutIcon from '@mui/icons-material/Logout';

const namePort = process.env.REACT_APP_NAMEPORT;
const protocol = process.env.REACT_APP_PROTOCOL;

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const goProfile = () => {
    navigate('/profile')
  }

  //finish once routes to other pages are done
  const handleButtonClick = (buttonText) => {
    switch (buttonText) {
      case 'Feedback Form':
        navigate('/feedback');
        break;
      case 'Terms and Conditions':
        navigate('/terms');
        break;
      case 'Privacy Policy':
        navigate('/privacy');
        break;
      case 'User Guidelines':
        navigate('/guidelines');
        break;
      case 'Log Out':
          // Call logout endpoint to clear the cookie
          const logout = async () => {
            try {
              const response = await fetch(`${protocol}://${namePort}/logout`, {
                method: 'POST',
                credentials: 'include' // Include cookies in the request
              });
              console.log(response)
              if (response.ok) {
                console.log('Logout successful');
              } else {
                console.error('Logout failed:', response.statusText);
              }
            } catch (error) {
              console.error('Error during logout:', error);
            }
          };
      
          logout();
        navigate('/logout');
        break;
      default:
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 210, height: '100%' }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ height: 200, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <img src={UserIcon} onClick={goProfile} style={{width:"50px", height: "50px", padding: 2}}/>
        <Typography variant="profile" sx={{pt: 1}}>John Doe</Typography>
        <Typography variant="cardDesc" sx={{pt: 1}}>johndoe@gmail.com</Typography>
      </Box>
      <Divider />
      <Box sx={{backgroundColor: "#FF9900", height: "100%", display: "flex", alignItems: "flex-start"}}>
        <List style={{ width: '100%' }}>
          {['Feedback Form', 'Terms and Conditions', 'Privacy Policy', 'User Guidelines', 'Log Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleButtonClick(text)}>
                {text === 'Log Out' && <LogoutIcon sx={{height: "20px", mr: 1}} />}
                <ListItemText sx={{fontSize: 16}} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <div style={{display: 'flex', paddingTop: 1, margin: '0 0 0 0', background: 'transparent', zIndex: 0}}>
      <Button onClick={toggleDrawer(true)} style={{ padding: '0 0 0 0', margin: '0 0 0 0'}}><img src={Menu} style={{width: '80px', height: '80px', padding: '0 0 0 0', margin: '0 0 0 0'}}/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)} PaperProps={{ style: { overflow: 'visible', height: 900 } }}>
        {DrawerList}
      </Drawer>
    </div>
  );
}