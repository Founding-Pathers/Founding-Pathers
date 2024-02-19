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
}) {
  return (
    <Chip
      label={label}
      icon={typeof IconComponent === 'string' ? <img src={IconComponent} alt={label} style={{ width: iconWidth, height: iconHeight, pl: pl }} /> : <IconComponent sx={{ width: iconWidth, height: iconHeight, pl: pl }} />}
      onClick={onClick}
      color={isSelected ? 'primary' : 'default'}
      sx={{
        borderRadius: borderRadius,
        width: width, 
        height: height,
        backgroundColor: isSelected ? selectedColor : unselectedColor,
        "&:hover": {
          backgroundColor: selectedColor,
        },
      }}
    />
  );
}