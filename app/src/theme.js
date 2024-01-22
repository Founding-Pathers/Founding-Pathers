import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6CB661', 
    },
    secondary: {
      main: '#6CB661', 
    }
  },
  typography: {
    fontFamily: 'sans-serif',
    h1: {
      fontSize: '30px', 
      fontWeight: 700, 
      color: '#6CB661'
    },
    button: {
      fontSize: '20px', 
      fontWeight: 500, 
      color: '#FFFFFF'
    },
  },
});

export default theme;