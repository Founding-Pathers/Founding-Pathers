import { createTheme } from '@mui/material/styles';
import 'typeface-inter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9900', 
    },
    secondary: {
      main: '#FF9900', 
    },
    poiSelect: {
      main: '#93D1FF59',
      secondary: '#93D1FF'
    },
    pathSelect: {
      main: '#A0E1894D',
      secondary: '#A0E189'
    },
    travelSelect: {
      main: '#FF931566',
      secondary: '#FF9900'
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
    filterh1: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '19.36px',
      fontWeight: 'bold',
      color: '#00000'
    },
    filterh2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16.94px',
      textDecoration: 'underline',
      color: '#00000'
    },
    filterLabel: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16.94px',
      color: '#00000'
    }
  },
});

export default theme;