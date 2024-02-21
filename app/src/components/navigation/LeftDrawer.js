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

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //finish once routes to other pages are done
  const handleButtonClick = (buttonText) => {
    switch (buttonText) {
      case 'Report Obstruction':
        // history.push('/report-obstruction');
        break;
      case 'Saved Locations':
        // history.push('/saved-locations');
        break;
      case 'Terms and Conditions':
        // history.push('/terms-and-conditions');
        break;
      case 'User Guidelines':
        // history.push('/user-guidelines');
        break;
      default:
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 210 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ height: 200, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <img src={UserIcon} style={{width:"50px", height: "50px", padding: 2}}/>
        <Typography variant="profile" sx={{pt: 1}}>John Doe</Typography>
        <Typography variant="cardDesc" sx={{pt: 1}}>johndoe@gmail.com</Typography>
      </Box>
      <Divider />
      <List sx={{backgroundColor: "#FF9900"}}>
        {['Report Obstruction', 'Saved Locations', 'Terms and Conditions', 'User Guidelines'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleButtonClick(text)}>
              <ListItemText sx={{fontSize: 16}} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{backgroundColor: "#FF9900", height: "100%", display: "flex", alignContent: "flex-end"}}>
        <Typography variant="filterLabel" sx={{mt: 30, ml: 2}}>Log Out</Typography>
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