import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

export default function GoogleMaps({inputRef , inputValue, setInputValue, autocompleteService, onClick, onKeyDown, label}) {
  const [value, setValue] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.getPlacePredictions(
            { ...request, componentRestrictions: { country: 'SG' } },
            callback
          );
      }, 400),
    [autocompleteService]
  );

  React.useEffect(() => {
    let active = true;
  
    if (!autocompleteService && window.google) {
      autocompleteService =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService) {
      return undefined;
    }
  
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
  
    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];
  
        if (value) {
          newOptions = [value];
        }
  
        if (results) {
          newOptions = [...newOptions, ...results];
        }
  
        setOptions(newOptions);
      }
    });
  
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, autocompleteService]);


  return (
    <Autocomplete
      id="google-map-demo"
      sx={{
        "& .MuiOutlinedInput-root": {
            padding: 0 + "!important",
        },
        width: 310,
        height: 40,
        marginBottom: 1,
        marginLeft: 0.5
      }}
      InputProps={{
        style: {
          width: 310,
          height: 40,
          border: "1px solid var(--Black, #000)",
          borderRadius: "50px",
          padding: 0
        },
      }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        if (newValue) {
            setInputValue(newValue.description); // Set input value to the selected option
          }
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
    //   onInputChange={(event, newInputValue) => {
    //     setInputValue(newInputValue);
    //   }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          inputRef={inputRef}
          style= {{
            width: "100%",
            height: 40,
            borderRadius: 0,
            padding: 0,
          }}
          onClick={onClick}
          onKeyDown={onKeyDown}
        />
      )}
      inputValue={inputValue}
      // Set the inputValue to the value of the inputRef
      onInputChange={(event, newInputValue) => {
        setInputValue(inputRef.current.value);
      }}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}