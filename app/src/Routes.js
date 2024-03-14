import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Deleted from './pages/Deleted';
import Home from './pages/Home';
import Validation from './pages/Validation';
import Feedback from './pages/Feedback';
import UserGuideline from './pages/UserGuideline';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/deleted' element={<Deleted/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/validation' element={<Validation/>}></Route>
          <Route path='/feedback' element={<Feedback/>}></Route>
          <Route path='/guidelines' element={<UserGuideline/>}></Route>
          <Route path='/terms' element={<TermsAndConditions/>}></Route>
          <Route path='/privacy' element={<PrivacyPolicy/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;