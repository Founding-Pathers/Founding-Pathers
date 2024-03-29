import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Links({color, value, link, weight}) {
  return (
    <Box
      sx={{
        fontWeight: weight,
        padding: "5px"
      }}
    >
      <Link href={link} color={color} underline="none">{value}</Link>
    </Box>
  );
}