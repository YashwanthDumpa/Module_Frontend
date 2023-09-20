import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JinSignIn from '../Layout/jin_sign_in';
import Home from '../Components/home';
import Register from '../Layout/jin_register';
import Userhome from '../Layout/Userhome';
import Dashboard from '../Components/dashboard';
import RecycleBin from '../Components/recycleBin';
import ManageAccounts from '../Components/manageAccounts';



const Routing: React.FC = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JinSignIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/adminLearningDevelopment' element={<Home />} />
        <Route path='/LearningDevelopment' element={<Userhome />} />
        <Route path='/bin' element={<RecycleBin/>} />
        <Route path='/manageAccounts' element={<ManageAccounts/>} />
      
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing