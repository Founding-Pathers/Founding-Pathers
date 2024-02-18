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
import { useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import carIcon from '../../assets/filters/carIcon.png';
import foodIcon from '../../assets/filters/foodIcon.png';
import shelterIcon from '../../assets/filters/shelterIcon.png';
import trainIcon from '../../assets/filters/trainIcon.png';


const drawerBleeding = 70;

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

function SwipeableEdgeDrawer(props) {
  const theme = useTheme();
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const container = window !== undefined ? () => window().document.body : undefined;

  // const [selectedPOIs, setSelectedPOIs] = useState([]);

  // const handleChange = (chipLabel) => {
  //   setSelectedPOIs((prevSelected) => {
  //     if (prevSelected.includes(chipLabel)) {
  //       return prevSelected.filter((label) => label !== chipLabel);
  //     } else {
  //       return [...prevSelected, chipLabel];
  //     }
  //   });
  // };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
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
          <Box sx={{ textAlign: 'center', mt: 4, mr: 1, display: open ? 'block' : 'none' }}>
            <img src={Location} style={{ width: '18px', height: '18px', margin: '10px 6px 0px 6px' }}></img>
          <TextField
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
                lineHeight: 1
                }
            }}
            id="outlined-basic"
            label="Location"
            variant="outlined"
            onClick={() => setOpen(true)}
            />
          </Box>

          <Box sx={{display: open ? 'flex' : 'none', justifyContent: 'space-between', ml: 3.5, mr: 0.5}}>
            <img src={DottedLine} style={{ width: '2px', height: '18px' }}></img>
            <img src={Switch} style={{ width: '18px', height: '18px', margin: '0px 6px' }}></img>
          </Box>

          <Box sx={{ textAlign: 'center', mt: open ? 0:4, mb: 2, mr: 1 }}>
            <img src={Destination} style={{ width: '18px', height: '18px', margin: '9px 6px' }}></img>
          <TextField
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
            onClick={() => setOpen(true)}
            />
          </Box>

          <Typography variant="filterh1" sx={{ px: 3.5, py: 1, display: "block" }}>1. Search Filters</Typography>
          <Typography variant="filterh2" sx={{ px: 3.5, py: 1, display: "block"  }}>Points of Interest:</Typography>
          <ChipBox>
          <Chip icon={foodIcon} iconWidth="20px" iconHeight="20px" label="Food & Beverages" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            // isSelected={selectedChips.includes("Food & Beverages")}
            // onClick={() => handleChipClick("Food & Beverages")}
            ></Chip>
          <Chip icon={AttractionsOutlinedIcon} iconWidth="20px" iconHeight="20px" label="Attractions" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            // isSelected={selectedChips.includes("Attractions")}
            // onClick={() => handleChipClick("Attractions")}
            ></Chip>
          <Chip icon={DirectionsBusFilledOutlinedIcon} iconWidth="20px" iconHeight="20px" label="Bus Stops" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            // isSelected={selectedChips.includes("Bus Stops")}
            // onClick={() => handleChipClick("Bus Stops")}
            ></Chip>
          <Chip icon={trainIcon} iconWidth="20px" iconHeight="20px" label="MRT Stations" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            // isSelected={selectedChips.includes("MRTs")}
            // onClick={() => handleChipClick("MRTs")}
            ></Chip>
          <Chip icon={carIcon} iconWidth="20px" iconHeight="20px" label="Pick-up / Drop-off" borderRadius="10px" unselectedColor={theme.palette.poiSelect.main} selectedColor={theme.palette.poiSelect.secondary}
            // isSelected={selectedChips.includes("Pick Ups")}
            // onClick={() => handleChipClick("Pick Ups")}
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
          <Chip icon={shelterIcon} iconWidth="20px" iconHeight="20px" label="Sheltered" borderRadius="10px" unselectedColor={theme.palette.pathSelect.main} selectedColor={theme.palette.pathSelect.secondary}></Chip>
          <Chip label="Nature" icon={ParkOutlinedIcon} iconWidth="20px" iconHeight="20px" borderRadius="10px" unselectedColor={theme.palette.pathSelect.main} selectedColor={theme.palette.pathSelect.secondary}></Chip>
          </ChipBox>
          <Box sx={{mx: 3.5, my: 1}}>
          <Checkbox width="17px" fontSize="14px" label="Remember my preferences for future paths"></Checkbox>
          </Box>

          <Typography variant="filterh1" sx={{ px: 3.5, py: 1.5, display: "block" }}>2. Travelling Mode</Typography>
          <ChipBox sx={{justifyContent: "space-evenly"}}>
            <Box sx={{textAlign: "center"}}>
            <Chip icon={DirectionsWalkIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Walking</Typography>
            </Box>
            <Box>
            <Chip icon={DirectionsBikeIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Cycling</Typography>
            </Box>
            <Box>
            <Chip icon={AccessibleForwardIcon} height="74px" width="74px" iconWidth="55px" iconHeight="55px" pl={1.5} borderRadius="50%" unselectedColor={theme.palette.travelSelect.main} selectedColor={theme.palette.travelSelect.secondary}></Chip>
            <Typography variant="filterLabel" sx={{ py: 1, display: "block", textAlign: "center" }}>Wheelchair</Typography>
            </Box>
          </ChipBox>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;