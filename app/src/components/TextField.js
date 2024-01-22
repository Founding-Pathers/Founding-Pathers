import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields({id, label, type, width}) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: {width} },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id={id}
            label={label}
            type={type}
          />
        </div>
      </Box>
    );
  }