import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F0A73A', 
    },
    secondary: {
      main: '#F0A73A', 
    }
  },
  typography: {
    fontFamily: 'sans-serif',
    fontSize: '14px',
    h1: {
      fontSize: '30px', 
      fontWeight: 700, 
      color: '#F0A73A'
    },
    button: {
      fontSize: '20px', 
      fontWeight: 500, 
      color: '#FFFFFF'
    },
  },
});

export default theme;