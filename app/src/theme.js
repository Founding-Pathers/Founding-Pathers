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
    },
    navigationGo: {
      main: '#6ECC4D'
    },
    endNavigation: {
      main: '#EE6161'
    },
    green: {
      main: '#6ECC4D'
    },
    black: {
      main: '#000000'
    },
    white: {
      main: '#FFFFFF'
    },
    darkGrey: {
      main: '#A0A0A0', 
    }
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 14,
    h1: {
      fontSize: '30px', 
      fontWeight: 700, 
      color: '#FF9900',
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
    },
    cardDesc: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '14.52px',
      color: '#000000'
    },
    cardDesc2: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '14.52px',
      color: '#000000'
    },
    navigatingTitle: {
      fontSize: '20px',
      fontWeight: 800,
      lineHeight: '24.2px',
      color: '#FF9900'
    },
    navigatingSubtitle: {
      fontSize: '14px',
      fontWeight: 800,
      lineHeight: '16.94px',
      color: '#FF9900'
    },
    navigatingSaveDest: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '12.1px',
      color: '#000000',
      textDecoration: 'underline'
    },
    profile: {
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '17px',
      color: '#000000'
    },
    header1: {
      marginLeft: '30px',
      fontSize: '30px', 
      fontWeight: 800, 
      color: '#F0A73A'
    },
    header2: {
      marginLeft: '32px',
      fontSize: '20px', 
      fontWeight: 500, 
      color: '#F0A73A'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF9900',
            },
          },
        },
      },
    },
  },
});

export default theme;