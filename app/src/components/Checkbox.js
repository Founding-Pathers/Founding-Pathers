import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function FormControlLabelPosition({value, label, labelPlacement}) {
  return (
    <FormControl component="fieldset">
        <FormControlLabel
          value={value}
          control={<Checkbox />}
          label={label}
          labelPlacement={labelPlacement}
        />
    </FormControl>
  );
}