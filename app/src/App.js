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

// DB testing form - to test, uncomment and comment out above code
// import React from 'react';
// import { Route, Routes } from "react-router-dom";
// import RecordList from "./components/testRecordList";
// import Edit from "./components/testEdit";
// import Create from "./components/testCreate";
 
// const App = () => {
//  return (
//    <div>
//      <Routes>
//        <Route exact path="/" element={<RecordList />} />
//        <Route path="/testEdit/:id" element={<Edit />} />
//        <Route path="/testCreate" element={<Create />} />
//      </Routes>
//    </div>
//  );
// };
 
// export default App;
