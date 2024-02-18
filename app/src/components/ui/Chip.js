import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableChips({label, borderRadius, selectedColor, unselectedColor, icon: IconComponent = () => null, iconWidth, iconHeight, width, height, pl}) {

  const [selectedChips, setSelectedChips] = React.useState([]);

  const handleClick = (chipLabel) => () => {
    setSelectedChips((prevSelected) => {
      // Check if the chip is already selected
      const index = prevSelected.indexOf(chipLabel);
      if (index === -1) {
        // If not selected, add it to the selected chips
        return [...prevSelected, chipLabel];
      } else {
        // If already selected, remove it from the selected chips
        return prevSelected.filter((label) => label !== chipLabel);
      }
    });
  };

  const isChipSelected = (chipLabel) => {
    return selectedChips.includes(chipLabel);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label={label}
        icon={typeof IconComponent === 'string' ? <img src={IconComponent} alt={label} style={{ width: iconWidth, height: iconHeight, pl: pl }} /> : <IconComponent sx={{ width: iconWidth, height: iconHeight, pl: pl }} />}
        onClick={handleClick("Clickable")}
        color={isChipSelected("Clickable") ? 'primary'  : 'default'}
        sx= {{px:1 , py: 2, borderRadius: {borderRadius}, width: width, height: height,
        backgroundColor: isChipSelected("Clickable") ? selectedColor : unselectedColor,
        "&:hover": {
            backgroundColor: selectedColor,
          } }}>
        </Chip>
    </Stack>
  );
}