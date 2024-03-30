import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CircleChecked from '@mui/icons-material/CheckCircleOutline'; 
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked'; 
import Typography from '@mui/material/Typography'; 

export default function FormControlLabelPosition({ value, label, labelPlacement, width, fontSize, checked, onChange }) {
  return (
    <FormControl component="fieldset">
      <FormControlLabel
        value={value}
        control={<Checkbox 
          icon={<CircleUnchecked sx={{ width: width }}/>}
          checkedIcon={<CircleChecked sx={{ width: width }}/>}
          checked={checked}
          onChange={onChange}
        />}
        label={<Typography variant="body1" sx={{ fontSize: fontSize }}>{label}</Typography>}
        labelPlacement={labelPlacement}
      />
    </FormControl>
  );
}