import Router from './Routes';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router></Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
