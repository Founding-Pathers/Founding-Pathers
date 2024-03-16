import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields({id, label, type, value, onChange, width, height, border, borderRadius, borderColor, paddingLeft, paddingRight, onClick}) {
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
            id={id}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            onClick={onClick}
            InputProps={{
              style: {
                width: width ? width : "310px",
                height: height ? height : "40px",
                border: border ? border : "1px solid var(--Black, #000)",
                borderRadius: borderRadius ? borderRadius : "50px",
                borderColor: borderColor ? borderColor : "#000000",
                paddingLeft: paddingLeft ? paddingLeft : "3.5px",
                paddingRight: paddingRight ? paddingRight : "3.5px"
              }
            }}
          />
        </div>
      </Box>
    );
  }