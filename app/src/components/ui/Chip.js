import React from 'react';
import Chip from '@mui/material/Chip';

export default function ClickableChips({
  label,
  icon: IconComponent = () => null,
  iconWidth,
  iconHeight,
  width,
  height,
  borderRadius,
  pl,
  unselectedColor,
  selectedColor,
  isSelected = false,
  onClick,
  disabled
}) {
  return (
    <Chip
      label={label}
      icon={typeof IconComponent === 'string' ? <img src={IconComponent} alt={label} style={{ width: iconWidth, height: iconHeight, pl: pl }} /> : <IconComponent sx={{ width: iconWidth, height: iconHeight, pl: pl }} />}
      onClick={onClick}
      color={isSelected ? 'primary' : 'default'}
      sx={{
        mr: 0.5,
        my: 0.5,
        borderRadius: borderRadius,
        width: width, 
        height: height,
        backgroundColor: isSelected ? selectedColor : unselectedColor,
        "&:hover": {
          backgroundColor: selectedColor,
        },
      }}
      disabled={disabled}
    />
  );
}