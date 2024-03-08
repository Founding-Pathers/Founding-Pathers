import { useMemo, useState, useRef } from 'react';
import { useCombobox } from 'downshift';
import TextField from '@mui/material/TextField';
import List from '../ui/List';

export default function SearchBox({location, changeLocation}) {
  const [searchResult, setSearchResult] = useState({
    autocompleteSuggestions: [],
    status: '',
  });
  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    []
  );

  function handlePredictions(predictions, status) {
    if (status === "OK") {
      const autocompleteSuggestions = predictions.map((prediction) => {
        return {
          id: prediction.place_id,
          name: prediction.structured_formatting.main_text,
          address: prediction.structured_formatting.secondary_text
        };
      });
      setSearchResult({
        autocompleteSuggestions: autocompleteSuggestions,
        status: 'OK',
      })
    } else {
      setSearchResult({
        autocompleteSuggestions: [],
        status: status,
      });
    }
  }

  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    selectedItem,
  } = useCombobox({
    items: searchResult.autocompleteSuggestions,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === '') {
        setSearchResult({
          autocompleteSuggestions: [],
          status: '',
        });
        return;
      }
      service.getPlacePredictions({
        input: inputValue,
        sessionToken: sessionToken,
      }, handlePredictions
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        console.log(selectedItem)
        getInputProps().onChange({ target: { value: selectedItem.name } });
        setSearchResult({
            autocompleteSuggestions: [],
            status: '',
          });
          return;
      }
    },
  });

  return (
    <>
      <TextField
        type="search"
        value={location}
        onChange={changeLocation}
        {...getInputProps()}
        InputProps={{
          style: {
            borderRadius: "50px",
            borderColor: "#000000",
            width: "324px",
            height: 31,
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1
          }
        }}
        id="outlined-basic"
        label="Location"
        variant="outlined"
      />
      <ul
        {...getMenuProps()}
      >
        {
          searchResult.autocompleteSuggestions.length > 0
            ? searchResult.autocompleteSuggestions.map((item, index) => {
              return (
                <li
                  key={item.id}
                  {...getItemProps({
                    item,
                    index
                  })}
                >
                  <p dangerouslySetInnerHTML={{ __html: item.name }}></p>
                  <p dangerouslySetInnerHTML={{ __html: item.address }}></p>
                </li>
                // <List dictionary={searchResult.autocompleteSuggestions}></List>
              );
            })
            : null
        }
      </ul>
    </>
  )
};