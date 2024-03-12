import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModeIcon from '@mui/icons-material/Mode';
import { ThemeProvider} from '@mui/material/styles';
import theme from '../../theme';



export default function OutlinedButtons({handleClick1, handleClick2, handleClick3}) {
  
  const [clicked, setClicked] = useState({
    1: false,
    2: false,
    3: false,
  });

  const toggleClicked = (buttonNumber) => {
    setClicked(prevState => ({
      ...prevState,
      [buttonNumber]: !prevState[buttonNumber]
    }));
  };

  const handleClick = (buttonNumber) => {
    toggleClicked(buttonNumber);
    switch (buttonNumber) {
      case 1:
        window.location.href = '/addsavedlocations';
        break;
      case 2:
        handleClick2();
        break;
      case 3:
        handleClick3();
        break;
      default:
        break;
    }
  };
  

    return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={1}>
        <Button 
          variant="outlined" 
          color={clicked[1] ? "editButtonClicked" : "editButton"} 
          size="small" 
          style={{color: clicked[1] ? '#FFFFFF' : '#606060', background: clicked[1] ? '#F0A73A' : ''}}
          onClick={() => handleClick(1)}
          disabled={clicked[2] || clicked[3]}
          >
            <AddIcon fontSize="small" style={{color: clicked[1] ? '#FFFFFF' : '#858585'}}/>
            Add
        </Button>

        <Button 
          variant="outlined" 
          color={clicked[2] ? "editButtonClicked" : "editButton"} 
          size="small" 
          style={{color: clicked[2] ? '#FFFFFF' : '#606060', background: clicked[2] ? '#F0A73A' : '', marginLeft: '30px'}}
          onClick={() => handleClick(2)}
          disabled={clicked[1] || clicked[3]}
          // disabled
          >
            <ModeIcon fontSize="small" style={{color: clicked[2] ? '#FFFFFF' : '#858585'}}/>
            Edit
        </Button>

        <Button 
          variant="outlined" 
          color={clicked[3] ? "editButtonClicked" : "editButton"}
          size="small" 
          style={{color: clicked[3] ? '#FFFFFF' : '#606060', background: clicked[3] ? '#EE6161' : '', marginLeft: '30px'}} 
          // href="#delete-button"
          onClick={() => handleClick(3)}
          disabled={clicked[1] || clicked[2]}
          >
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="inherent" style={{color: clicked[3] ? '#FFFFFF' : ''}}/>
            </IconButton>
            Delete
        </Button>
      </Stack>
    </ThemeProvider>
    );
  }