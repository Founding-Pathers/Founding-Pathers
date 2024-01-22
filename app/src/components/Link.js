import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const preventDefault = (event) => event.preventDefault();

export default function Links({color, value, link}) {
  return (
    <Box
      sx={{
        fontWeight: "bold",
        padding: "5px"
      }}
      onClick={preventDefault}
    >
      <Link href={link} color={color} underline="none">{value}</Link>
    </Box>
  );
}