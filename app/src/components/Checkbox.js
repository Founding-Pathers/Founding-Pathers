import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CircleChecked from '@mui/icons-material/CheckCircleOutline'; 
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked'; 

export default function FormControlLabelPosition({ value, label, labelPlacement }) {
  return (
    <FormControl component="fieldset">
      <FormControlLabel
        value={value}
        control={<Checkbox 
          icon={<CircleUnchecked />}
          checkedIcon={<CircleChecked />}
        />}
        label={label}
        labelPlacement={labelPlacement}
      />
    </FormControl>
  );
}