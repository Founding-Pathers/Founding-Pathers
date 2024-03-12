import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Deleted from './pages/Deleted';
import Home from './pages/Home';
import UserGuideline from './pages/UserGuideline';
import SavedLocationsMain from './pages/SavedLocationsMain';
import AddSavedLocations from './pages/AddSavedLocations';

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
          <Route path='/userguideline' element={<UserGuideline/>}></Route>
          <Route path='/savedlocations' element={<SavedLocationsMain/>}></Route>
          <Route path='/addsavedlocations' element={<AddSavedLocations/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;