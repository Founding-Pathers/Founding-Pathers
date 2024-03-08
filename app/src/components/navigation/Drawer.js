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
import List from '../ui/List';
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
import { useEffect, useState, useMemo } from 'react';
import { GoogleMap, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import SearchBox from '../ui/Autocomplete';
import { useCombobox } from 'downshift';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
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
  '@media (max-width:390px)': {
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

function SwipeableEdgeDrawer({window, originRef, destinationRef, calculateRoute, duration, distance, filters, isRouting, handleEndRouting, handleSelecting}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [navigating, setNavigating] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setShowButton(((!open) && navigating));
  }, [open, navigating]);

  //POIs State
  const [selectedPOIs, setSelectedPOIs] = useState([]);

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
  const [selectedPaths, setSelectedPaths] = useState([]);

  const handleChipClickPath = (chipLabel) => {
    setSelectedPaths((prevSelected) => {
      if (prevSelected.includes(chipLabel)) {
        return prevSelected.filter((label) => label !== chipLabel);
      } else {
        return [...prevSelected, chipLabel];
      }
    });
  };

  //Travel Mode State
  const [selectedMode, setSelectedMode] = useState(null);

  const handleChipClickTravelMode = (chipLabel) => {
    setSelectedMode(chipLabel);
    setShowButton(true);
    setOpen(false);
    calculateRoute();
    handleSelecting();
    setNavigating(true);
  };

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

  const [isTextFieldFocused, setTextFieldFocused] = useState(false);
  // Function to handle opening the drawer and focusing on the text field
  const handleOpenDrawer = () => {
    setOpen(true);
    console.log(open)
    setTextFieldFocused(true);
  };

  // Function to handle clicking on a list item
  const handleListClick = (key) => {
    setTextFieldFocused(false);
    console.log("hello");
    setLocation(key);
    if (isTextFieldFocused === 'location') {
      setLocation(key);
    } else if (isTextFieldFocused === 'destination') {
      setDestination(key);
    }
    setOpen(false);
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
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - 70px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        onClick={() => setOpen(true)}
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
          <Box sx={{display: (isRouting && !(isEditing)) ? 'flex':'none', mt: 3, justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Button text="Edit" onClick={editFilters} width="60px" height="32px" fontSize="15px" textTransform="none" borderRadius="10px"/>
            <Box sx={{textAlign: 'center'}}>
              <Typography variant="navigatingSubtitle" sx={{display: 'block'}}>Estimated Arrival Time:</Typography>
              <Typography variant="navigatingTitle" sx={{display: 'block', mt: 0.5}}>{duration}</Typography>
              <Typography variant="filterLabel" sx={{display: 'block', mt: 0.5}}>{distance} away</Typography>
              <Typography variant="cardDesc" sx={{display: 'block', mt: 1}}><img src={Route} style={{width:"21px", height:"15px", marginRight: "5px"}}></img>{filters}</Typography>
              <Typography variant="navigatingSaveDest" sx={{display: 'block', mt: 0.5}}><img src={Saved} style={{width:"18px", height:"16px", marginRight: "5px"}}></img>Save Destination</Typography>
            </Box>
            <Button text="End" onClick={endRouting} color="endNavigation" width="60px" height="32px" fontSize="15px" textTransform="none" borderRadius="10px"/>
          </Box>

          <Box sx={{textAlign: 'center', mt: 3, display: (showButton || isRouting) ? 'block' : 'none'}}>
            <Button text="Edit Filters" onClick={ ()=> setOpen(true) } width="120px" height="32px" fontSize="15px" textTransform="none"/>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 4, mr: 1, display: open ? 'block' : 'none' }}>
            <img src={Location} style={{ width: '18px', height: '18px', margin: '10px 6px 0px 6px' }}></img>
            <SearchBox
            //  value={location}
             location={location}
             onChange={(e) => setLocation(e.target.value)}
            />
          </Box>

          <Box sx={{display: open ? 'flex' : 'none', justifyContent: 'space-between',
            '@media (min-width: 390px)': {
              ml: 3.5,
              mr: 0.5,
            }}}>
            <img src={DottedLine} style={{ width: '2px', height: '18px' }}></img>
            <img src={Switch} style={{ width: '18px', height: '18px', margin: '0px 6px' }} onClick={switchValues}></img>
          </Box>

          <Box sx={{ textAlign: 'center', mt: open ? 0:4, mb: 2, mr: 1 }}>
            <img src={Destination} style={{ width: '18px', height: '18px', margin: '9px 6px' }}></img>
              <SearchBox
              // value={destination}
              location={destination}
              onChange={(e) => setLocation(e.target.value)}
              />
              {/* <TextField
                inputRef={destinationRef}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onBlur={handleTextFieldBlur}
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
                onClick={() => handleOpenDrawer(destinationRef)}
                /> */}
          </Box>

          <Box sx={{
          display: isTextFieldFocused ? 'block' : 'none', // Conditionally display based on text field focus
          }}>
            <List dictionary={{'Current Location': ''}} icon={NearMeIcon} onItemClick={handleListClick}></List>
            {/* Replace dictionary with actual values */}
            <List dictionary={{'Bukit Timah Hill': '9km away', 'Pasir Ris Way': '17.4km away', 'East Coast Park': '9.9km away'}} icon={HistoryIcon}
            onItemClick={handleListClick}></List>
            <Typography variant="filterh1" sx={{ px: 3.5, pt: 2, display: "block" }}>Saved Locations</Typography>
            <List dictionary={{'Toa Payoh Public Library': '0.7km away'}} icon={Saved}
            onItemClick={handleListClick}></List>
          </Box>

          <Box sx={{
          display: isTextFieldFocused ? 'none' : 'block', // Conditionally display based on text field focus
          }}>
          <Typography variant="filterh1" sx={{ px: 3.5, py: 1, display: "block" }}>1. Search Filters</Typography>
          <Typography variant="filterh2" sx={{ px: 3.5, py: 1, display: "block"  }}>Points of Interest:</Typography>
          <ChipBox>
          <Chip icon={foodIcon} iconWidth="20px" iconHeight="20px" label="Food & Beverages" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("Food & Beverages")}
            onClick={() => handleChipClick("Food & Beverages")}
            ></Chip>
          <Chip icon={AttractionsOutlinedIcon} iconWidth="20px" iconHeight="20px" label="Attractions" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("Attractions")}
            onClick={() => handleChipClick("Attractions")}
            ></Chip>
          <Chip icon={DirectionsBusFilledOutlinedIcon} iconWidth="20px" iconHeight="20px" label="Bus Stops" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("Bus Stops")}
            onClick={() => handleChipClick("Bus Stops")}
            ></Chip>
          <Chip icon={trainIcon} iconWidth="20px" iconHeight="20px" label="MRT Stations" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("MRTs")}
            onClick={() => handleChipClick("MRTs")}
            ></Chip>
          <Chip icon={carIcon} iconWidth="20px" iconHeight="20px" label="Pick-up / Drop-off" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            isSelected={selectedPOIs.includes("Pick Ups")}
            onClick={() => handleChipClick("Pick Ups")}
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
          isSelected={selectedPaths.includes("Sheltered")}
          onClick={() => handleChipClickPath("Sheltered")}
          ></Chip>
          <Chip label="Nature" icon={ParkOutlinedIcon} iconWidth="20px" iconHeight="20px" borderRadius="10px" unselectedColor={theme.palette.pathSelect.main} selectedColor={theme.palette.pathSelect.secondary}
          isSelected={selectedPaths.includes("Nature")}
          onClick={() => handleChipClickPath("Nature")}
          ></Chip>
          </ChipBox>
          <Box sx={{mx: 3.5, my: 1}}>
          <Checkbox width="17px" fontSize="14px" label="Remember my preferences for future paths"></Checkbox>
          </Box>

          <Typography variant="filterh1" sx={{ px: 3.5, py: 1.5, display: "block" }}>2. Travelling Mode</Typography>
          <ChipBox sx={{justifyContent: "space-evenly"}}>
            <Box sx={{textAlign: "center"}}>
            <Chip icon={DirectionsWalkIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}
            isSelected={selectedMode === "Walk"}
            onClick={() => handleChipClickTravelMode("Walk")}
            ></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Walking</Typography>
            </Box>
            <Box>
            <Chip icon={DirectionsBikeIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}
            isSelected={selectedMode === "Cycle"}
            onClick={() => handleChipClickTravelMode("Cycle")}
            ></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Cycling</Typography>
            </Box>
            <Box>
            <Chip icon={AccessibleForwardIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}
            isSelected={selectedMode === "Wheelchair"}
            onClick={() => handleChipClickTravelMode("Wheelchair")}
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