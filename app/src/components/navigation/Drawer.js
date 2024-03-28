import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Location from '../../assets/Location.png';
import Destination from '../../assets/Destination.png';
import DottedLine from '../../assets/DottedLine.png';
import Switch from '../../assets/Switch.png';
import Chip from '../ui/Chip';
import Checkbox from '../ui/Checkbox';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LocationList from '../ui/List';
import { useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import NearMeIcon from '@mui/icons-material/NearMe';
import HistoryIcon from '@mui/icons-material/History';
import Saved from '../../assets/Saved.png';
import Route from '../../assets/Route.png';
import carIcon from '../../assets/filters/carIcon.png';
import foodIcon from '../../assets/filters/foodIcon.png';
import shelterIcon from '../../assets/filters/shelterIcon.png';
import trainIcon from '../../assets/filters/trainIcon.png';
import { useEffect, useState } from 'react';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
  overflowY: 'auto'
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  overflowY: 'auto'
}));

const ChipBox = styled('div')({
  marginLeft: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  flexWrap: "wrap",
  '& > *': {
    marginTop: 7,
    marginRight: 5
  },
  '@media (max-width:300px)': {
    flexDirection: "column",
  },
});

const Puller = styled('div')(({ theme }) => ({
  width: '75px',
  height: '5px',
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  marginBottom: 2,
  left: '50%', 
  transform: 'translateX(-50%)',
}));

function SwipeableEdgeDrawer({window, originRef, destinationRef, calculateRoute, duration, distance, selectedPaths, setSelectedPaths, selectedPOIs, setSelectedPOIs, isRouting, handleRemoveMarks, handleEndRouting, handleSelecting}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [navigating, setNavigating] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [rememberPreferences, setRememberPreferences] = useState(false); 

  const handlePreferencesChange = () => {
    console.log(rememberPreferences)
    setRememberPreferences(!rememberPreferences); 
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setShowButton(((!open) && navigating));
  }, [open, navigating]);

  //POIs
  const handleChipClick = (chipLabel) => {
    setSelectedPOIs((prevSelected) => {
      if (prevSelected.includes(chipLabel)) {
        return prevSelected.filter((label) => label !== chipLabel);
      } else {
        return [...prevSelected, chipLabel];
      }
    });
  };

  //Path Preferences State
  const handleChipClickPath = (chipLabel) => {
    if (selectedPaths === chipLabel) {
      setSelectedPaths(null); 
    } else {
      setSelectedPaths(chipLabel); 
    }
  };

  //Travel Mode State
  const handleChipClickTravelMode = (chipLabel) => {
    setShowButton(true);
    setOpen(false);
    handleSelecting();
    handleRemoveMarks();
    handleRememberPreferences();
    setNavigating(true);
    if (calculateRoute && chipLabel !== null) {
      calculateRoute(chipLabel);
    }
  };

  //get email
  const [userEmail, setUserEmail] = useState(''); 

  //Remember preferences
  const handleRememberPreferences = async () => {
    // Check if the checkbox is checked
    setUserEmail(localStorage.getItem('userEmail'));
    console.log(rememberPreferences)
    if (rememberPreferences) {
      var map = { FNB: "f_and_b", sheltered: "is_sheltered", TOURISM: "tourist_attraction", BUSSTOP: "bus_stop", MRT: "mrt", PICKUP: "pickup_dropoff", nature: "nature" }
      var mapped = { f_and_b: "false", sheltered: "false", tourist_attraction: "false", bus_stop: "false", mrt: "false", pickup_dropoff: "false", nature: "false" }

      for (var i = 0; i < selectedPaths.split(", ").length; i++) { 
        mapped[map[selectedPaths.split(", ")[i]]] = "true";
      }
      
      console.log(selectedPOIs);
      for (var i = 0; i < selectedPOIs.split(", ").length; i++) { 
        mapped[map[selectedPOIs.split(", ")[i]]] = "true";
      }

      console.log(mapped)

      try {
        const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/userpref/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"), 
            f_and_b: mapped["f_and_b"],
            is_sheltered: mapped["is_sheltered"],
            tourist_attraction: mapped["tourist_attraction"],
            bus_stop: mapped["bus_stop"],
            mrt: mapped["mrt"],
            pickup_dropoff: mapped["pickup_dropoff"],
            nature: mapped["nature"]
          })
        });
        if (response.ok) {
          console.log('User preference updated successfully');
        } else {
          console.error('Failed to update user preference');
        }
      } catch (error) {
        console.error('Error updating user preference:', error.message);
      }
    } else {
      console.log('Checkbox is not checked');
    }
  };

  //get remembered preferences
  async function getUserPreferences() {
    setUserEmail(localStorage.getItem('userEmail'));
    console.log(userEmail)
    try {
      const response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_NAMEPORT}/userpref/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('userEmail') })
      });
  
      console.log('Response status code:', response.status);
  
      if (response.status === 200) {
        const responseBody = await response.text();
        if (!responseBody) {
          console.log('Empty response body');
          return null;
        }

        const preferences = JSON.parse(responseBody);
        console.log('User preferences:', preferences);

        var map = { f_and_b: "FNB", is_sheltered: "sheltered", tourist_attraction: "TOURISM" , bus_stop : "BUSSTOP", mrt: "MRT", pickup_dropoff: "PICKUP", nature: "nature" }

        for (var key in map) {
          if (preferences[key] == true) {
            if (key == "is_sheltered" || key == "nature") {
              console.log(map[key]);
              handleChipClickPath(map[key]);
            }
            else {
              console.log(map[key])
              handleChipClick(map[key]);
            }
          }
        }

        return preferences;
      } else {
        console.error('Failed to fetch user preferences');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error.message);
      return null;
    }
  }

  useEffect(() => {
    getUserPreferences();
  }, []);

  //Switch start and destination
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const switchValues = () => {
    const temp = location;
    setLocation(destination);
    setDestination(temp);
  };

  useEffect(() => {
    console.log("Location:", location);
    console.log("Destination:", destination);
  }, [location, destination]);

  const [isTextFieldFocused, setTextFieldFocused] = useState(null);

  // Function to handle opening the drawer and focusing on the text field
  const handleOpenDrawer = (field) => {
    setOpen(true);
    setTextFieldFocused(field);
    console.log(isTextFieldFocused)
  };

  // Function to handle clicking on a list item
  const handleListClick = (key) => {
    if (isTextFieldFocused === 'location') {
      setLocation(key);
    } else if (isTextFieldFocused === 'destination') {
      setDestination(key);
    }
    setTextFieldFocused(null);
  };

  const [isEditing, setEditing] = useState(false);
  function editFilters() {
    setOpen(true);
    setEditing(true);
    console.log(isEditing)
  }

  function endRouting() {
    setShowButton(false);
    handleEndRouting();
  }

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '@media (min-height: 755px)': {
            '.MuiDrawer-root > .MuiPaper-root': {
              height: 'calc(80% - 70px)',
              overflow: 'visible',
            },
          },
          '@media (max-height: 755px)': {
            '.MuiDrawer-root > .MuiPaper-root': {
              height: 'calc(90% - 70px)',
              overflow: 'visible',
            },
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={70}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: (isRouting && !(isEditing)) ? -160 : -70,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            pointerEvents: 'all',
            zIndex: 999
          }}
        >
          <Puller />
          {/* IS ROUTING */}
          <Box sx={{display: (isRouting && !isEditing) ? 'flex':'none', mt: 3, justifyContent: 'space-evenly', alignItems: 'start'}}>
            <Box sx={{textAlign: 'center', ml: 12}}>
              <Typography variant="navigatingSubtitle" sx={{display: 'block'}}>Estimated Arrival Time:</Typography>
              <Typography variant="navigatingTitle" sx={{display: 'block', mt: 0.5}}>{(duration/1).toFixed(0)} minutes</Typography>
              <Typography variant="filterLabel" sx={{display: 'block', mt: 0.5}}>{(distance/1000).toFixed(1)} km away</Typography>
              <Typography variant="cardDesc" sx={{display: 'block', mt: 1}}><img src={Route} style={{width:"21px", height:"15px", marginRight: "5px"}}></img>{selectedPOIs}</Typography>
              <Typography variant="navigatingSaveDest" sx={{display: 'block', mt: 0.5}}><img src={Saved} style={{width:"18px", height:"16px", marginRight: "5px"}}></img>Save Destination</Typography>
            </Box>
            <Box sx={{ml: 2}}>
              <Button text="End" onClick={endRouting} color="endNavigation" width="60px" height="32px" fontSize="15px" textTransform="none" borderRadius="10px"/>
            </Box>
          </Box>

          <Box sx={{textAlign: 'center', mt: 3, display: (showButton || isRouting) ? 'block' : 'none'}}>
            <Button text="Edit Filters" onClick={ ()=> setOpen(true) } width="120px" height="32px" fontSize="15px" textTransform="none"/>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 4, mr: 1, display: open ? 'block' : 'none' }}>
            <img src={Location} style={{ width: '18px', height: '18px', margin: '10px 3px 0px 3px' }}></img>
            {/* <SearchBox
            //  value={location}
             location={location}
             onChange={(e) => setLocation(e.target.value)}
            /> */}
            <TextField
                inputRef={originRef}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                    style: {
                    borderRadius: "50px",
                    borderColor: "#000000",
                    width: "324px",
                    height: 31,
                    }
                }}
                InputLabelProps={{
                    // shrink: true,
                    style: {
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1,
                    paddingBottom: 3
                    }
                }}
                id="outlined-basic"
                label=""
                variant="outlined"
                onClick={() => handleOpenDrawer('location')}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    setTextFieldFocused(null);
                  }
                }}
                />
          </Box>

          <Box sx={{display: open ? 'flex' : 'none', justifyContent: 'space-between',
            '@media (min-width: 385px)': {
              ml: 3.5,
              mr: 0.5,
            },
            '@media (max-width: 385px)': {
              ml: 2,
              mr: 0.5,
            }}}>
            <img src={DottedLine} style={{ width: '2px', height: '18px' }}></img>
            <img src={Switch} style={{ width: '18px', height: '18px', margin: '0px 6px' }} onClick={switchValues}></img>
          </Box>

          <Box sx={{ textAlign: 'center', mt: open ? 0:4, mb: 2, mr: 1 }}>
            <img src={Destination} style={{ width: '18px', height: '18px', margin: '9px 3px',
          '@media (maxWidth: 360px)': {
            margin: '9px 2px', // Adjusted margin for screens up to 360px width
          } }}></img>
              {/* <SearchBox
              // value={destination}
              location={destination}
              onChange={(e) => setLocation(e.target.value)},
              /> */}
              <TextField
                inputRef={destinationRef}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                InputProps={{
                    style: {
                    borderRadius: "50px",
                    borderColor: "#000000",
                    width: "324px",
                    height: 31,
                    }
                }}
                InputLabelProps={{
                    // shrink: true,
                    style: {
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1,
                    paddingBottom: 3
                    }
                }}
                id="outlined-basic"
                label="Where to?"
                variant="outlined"
                onClick={() => handleOpenDrawer('destination')}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    setTextFieldFocused(null);
                  }
                }}
                />
          </Box>

          <Box sx={{
          display: isTextFieldFocused ? 'block' : 'none', // Conditionally display based on text field focus
          }}>
            <Typography variant="filterh1" sx={{ px: 3.5, pb: 1, display: "block" }}>Past Searches</Typography>
            <LocationList dictionary={{'Current Location': ''}} icon={NearMeIcon} onItemClick={handleListClick}></LocationList>
            {/* Replace dictionary with actual values */}
            <LocationList dictionary={{'City Hall MRT': '9km away', 'Clarke Quay': '17.4km away', 'Fort Canning': '9.9km away'}} icon={HistoryIcon}
            onItemClick={handleListClick}></LocationList>
          </Box>

          <Box sx={{
          display: isTextFieldFocused ? 'none' : 'block', // Conditionally display based on text field focus
          }}>
          <Typography variant="filterh1" sx={{ px: 3.5, py: 0.5, display: "block" }}>1. Search Filters</Typography>
          <Typography variant="filterh2" sx={{ px: 3.5, py: 0.5, display: "block"  }}>Points of Interest:</Typography>
          <ChipBox>
          <Chip icon={foodIcon} iconWidth="20px" iconHeight="20px" label="Food & Beverages" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("FNB")}
            onClick={() => handleChipClick("FNB")}
            ></Chip>
          <Chip icon={AttractionsOutlinedIcon} iconWidth="20px" iconHeight="20px" label="Attractions" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("TOURISM")}
            onClick={() => handleChipClick("TOURISM")}
            ></Chip>
          <Chip icon={DirectionsBusFilledOutlinedIcon} iconWidth="20px" iconHeight="20px" label="Bus Stops" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("BUSSTOP")}
            onClick={() => handleChipClick("BUSSTOP")}
            ></Chip>
          <Chip icon={trainIcon} iconWidth="20px" iconHeight="20px" label="MRT Stations" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("MRT")}
            onClick={() => handleChipClick("MRT")}
            ></Chip>
          <Chip icon={carIcon} iconWidth="20px" iconHeight="20px" label="Pick-up / Drop-off" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("PICKUP")}
            onClick={() => handleChipClick("PICKUP")}
            ></Chip>
          </ChipBox>

          <Box sx={{ display: "flex", alignItems: "center"}}>
          <Typography variant="filterh2" sx={{ pl: 3.5, pr: 1, pt: 1.5, pb: 1, display: "block"  }}>Path Preferences:</Typography>
          <Modal icon={InfoOutlinedIcon} size="small" modalTitle="Path Preferences"
          modalDesc={{
            'Sheltered: ': 'protected from wind, rain, or other bad weather',
            'Nature: ': 'scenic view of plants, or those including PCN, trials, etc.',
            'Wheelchair-friendly: ': 'smooth terrain without staircases, steep ramps'
          }}
          ></Modal>
          </Box>
          <ChipBox>
          <Chip icon={shelterIcon} iconWidth="20px" iconHeight="20px" label="Sheltered" borderRadius="10px" unselectedColor={theme.palette.pathSelect.main} selectedColor={theme.palette.pathSelect.secondary}
          isSelected={selectedPaths == "sheltered"}
          onClick={() => handleChipClickPath("sheltered")}
          ></Chip>
          <Chip label="Nature" icon={ParkOutlinedIcon} iconWidth="20px" iconHeight="20px" borderRadius="10px" unselectedColor={theme.palette.pathSelect.main} selectedColor={theme.palette.pathSelect.secondary}
          isSelected={selectedPaths == "nature"}
          onClick={() => handleChipClickPath("nature")}
          ></Chip>
          </ChipBox>
          <Box sx={{mx: 3.5, my: 0.5}}>
          <Checkbox checked={rememberPreferences} onChange={handlePreferencesChange} width="17px" fontSize="14px" label="Remember my preferences for future paths"></Checkbox>
          </Box>

          <Typography variant="filterh1" sx={{ px: 3.5, pt: 1.5, pb: 0.5, display: "block" }}>2. Travelling Mode</Typography>
          <ChipBox sx={{justifyContent: "space-evenly"}}>
            <Box sx={{textAlign: "center"}}>
            <Chip icon={DirectionsWalkIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}
            // isSelected={selectedMode === "walk"}
            onClick={() => handleChipClickTravelMode("walk")}
            ></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Walking</Typography>
            </Box>
            <Box>
            <Chip icon={DirectionsBikeIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}
            // isSelected={selectedMode === "cycling"}
            onClick={() => handleChipClickTravelMode("cycling")}
            disabled={selectedPaths === "sheltered"}
            ></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Cycling</Typography>
            </Box>
            <Box>
            <Chip icon={AccessibleForwardIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}
            // isSelected={selectedMode === "bfa"}
            onClick={() => handleChipClickTravelMode("bfa")}
            ></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Wheelchair</Typography>
            </Box>
          </ChipBox>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;