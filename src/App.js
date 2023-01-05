import React, { Fragment, useEffect } from 'react';
import { Routes ,Route } from 'react-router-dom';


import Header from './components/Header'
import Home from './pages/Home'
import MonitorView from './pages/MonitorView'


const App = () => {

      
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/monitor/:monitorId/:hash/:capaId' element={<MonitorView/>} />
      </Routes>
    </Fragment>
  );
}

export default App;
