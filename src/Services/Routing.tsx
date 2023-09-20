import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JinSignIn from '../Components/SignIn/jin_sign_in';
import Home from '../Layout/Admin/home';
import Register from '../Components/Registration/jin_register';
import Userhome from '../Layout/User/Userhome';
import Dashboard from '../Layout/Dashboard/dashboard';
import RecycleBin from '../Components/Pages/Admin/recycleBin';
import ManageAccounts from '../Components/Pages/Admin/manageAccounts';



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