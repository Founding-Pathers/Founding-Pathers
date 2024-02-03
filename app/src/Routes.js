import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Create from './pages/Create';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;