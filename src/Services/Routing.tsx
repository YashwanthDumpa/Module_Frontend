import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JinSignIn from '../Layout/jin_sign_in';
import Home from '../Components/home';
import Register from '../Layout/jin_register';
import Userhome from '../Layout/Userhome';

import CustomizedTables from '../Components/test';
import Nav from '../Components/nav';


const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

      {/* <Route path='/' element={<CustomizedTables />} /> */}
        <Route path='/' element={<JinSignIn />} />
        <Route path='/b' element={<Nav />} />

        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/userhome' element={<Userhome />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Routing