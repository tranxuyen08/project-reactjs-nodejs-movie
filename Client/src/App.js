import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.jsx';
import Slide from './components/Slide/Slide.jsx';
import ShowMovie from './components/ShowMovie/ShowMovie.jsx';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import Footer from './components/Footer/Footer.jsx';
import Search from './components/Search/Search';
import FindFilm from './components/FindFilms/FindFilm';
import LoginLayout from './layout/LoginLayout/LoginLayout';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import LayoutProfile from './layout/LayoutProfile/LayoutProfile';
import Profile from './components/Profile/Profile';
import Detail from './components/Detail/Detail';
import PlayingMovie from './components/PlayingMovie/PlayingMovie';
import BookMarked from './components/BookMarked/BookMarked';
import RequiredAuth from './components/RequireAuth';
function App() {
  return (
    <div >
      {/* <DefaultLayout /> */}
      <Routes>
        <Route path="/" element={
          <DefaultLayout>
            <Header />
            <Slide />
            <ShowMovie />
          </DefaultLayout>} />
        <Route path="/search" element={<DefaultLayout><Search /></DefaultLayout>} />
        <Route path='/explore' element={<DefaultLayout><FindFilm /></DefaultLayout>} />
        {/* kiem tra xem accessToken ddusng khong thi moi chi di den component do */}
        <Route element={<RequiredAuth />}>
          <Route path='/detail/:id' element={<DefaultLayout>
            <Detail />
          </DefaultLayout>} />
        </Route>
        <Route path='/playing-movie/:id' element={<DefaultLayout><PlayingMovie /></DefaultLayout>} />
        <Route path='/login' element={<LoginLayout><Login /></LoginLayout>} />
        <Route path='/register' element={<LoginLayout><Register /></LoginLayout>} />
        <Route path='/profile' element={<LayoutProfile><Profile /></LayoutProfile>} />
        <Route path='/bookmarked' element={<LayoutProfile><BookMarked /></LayoutProfile>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
