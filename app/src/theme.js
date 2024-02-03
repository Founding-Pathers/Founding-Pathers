import { createTheme } from '@mui/material/styles';
import 'typeface-inter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9900', 
    },
    secondary: {
      main: '#FF9900', 
    }
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 14,
    h1: {
      fontSize: '30px', 
      fontWeight: 700, 
      color: '#F0A73A',
      textAlign: 'center'
    },
    h2: {
      fontSize: '30px',
      fontWeight: 700,
      color: '#00000'
    },
    button: {
      fontSize: '20px', 
      fontWeight: 500, 
      color: '#FFFFFF'
    },
  },
});

export default theme;