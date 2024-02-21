import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function BasicList({ dictionary, icon: IconComponent, onItemClick }) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List sx={{ py: 0 }}>
          {Object.entries(dictionary).map(([key, value]) => (
            <ListItem key={key} disablePadding onClick={()=>onItemClick(key)}>
              <ListItemButton>
                <ListItemIcon>
                {typeof IconComponent === 'string' ? 
                    <img src={IconComponent} alt={key} style={{ width: "28px", height: "28px", marginLeft: "10px" }} /> : 
                    IconComponent ? 
                    <IconComponent sx={{ width: "28px", height: "28px", ml: 1 }} /> : 
                    null
                  }
                </ListItemIcon>
                <ListItemText primary={key} secondary={value} 
                primaryTypographyProps={{ style: { fontSize: '14px' } }}
                secondaryTypographyProps={{ style: { fontSize: '11px' } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}