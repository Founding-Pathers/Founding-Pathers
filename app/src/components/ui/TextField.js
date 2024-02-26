import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields({id, label, type, value, onChange, width, onClick, placeholder}) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { width: {width}, my: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            placeholder={placeholder}
            id={id}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            onClick={onClick}
            InputProps={{
                style: {
                  borderRadius: "50px",
                  borderColor: "#000000",
                  border: "1px solid var(--Black, #000)",
                  width: "310px",
                  height: "40px",
                  paddingLeft: "3.5px",
                  paddingRight: "3.5px"
                }
              }}
          />
        </div>
      </Box>
    );
  }