import '../Styles/nav.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import logo from "../assets/download.png"

import Menu from '@mui/icons-material/Menu';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FlightIcon from "@mui/icons-material/Flight";
import ReceiptIcon from "@mui/icons-material/Receipt";

import Build from '@mui/icons-material/AutoStories';
import Arrow from '@mui/icons-material/ArrowBackIos';
import Dashboard from './dashboard';



export default function Nav(props: any) {

    const [isClick, setIsClick] = useState(false)
    function handleClick() {
        setIsClick(!isClick)
    }
    const Navigate = useNavigate()
    function handleLogout() {
        sessionStorage.clear()
        Navigate('/')
    }

    const menuItems = [
        { title: "Dashboard", icon: <DashboardIcon />, navigate:"/dashboard" },
        { title: "Timesheet", icon: <AccessTimeIcon /> },
        { title: "Leave", icon: <PersonOffIcon /> },
        { title: "Work From Home", icon: <HomeWorkIcon /> },
        { title: "Survey", icon: <AssignmentIcon /> },
        { title: "Service Desk", icon: <LiveHelpIcon /> },
        { title: "Forms", icon: <AssignmentTurnedInIcon /> },
        { title: "Travel", icon: <FlightIcon /> },
        { title: "Expenses", icon: <ReceiptIcon /> },
        { title: "Learn & Development", icon: <Build />,navigate:"/userhome" },
    ];


    return (
        <>
            <ul className='menu'>
                <a href='https://jmangroup.com/' target="_blank"><img src={logo} className='logo' /></a>
                <li title="home"><a href="#" onClick={handleClick} className='menu-btn'><Menu  className='icon'/></a></li>
                {menuItems.map(item =>
                    <li title={item.title}><a href={item.navigate?item.navigate:"#"} className={item.title}>{item.icon}</a></li>
                )}

                <div className="signout-logo" onClick={handleLogout}>
                    <button className="signout-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                    </button>
                </div>
            </ul>


            <ul className={isClick ? "menu-bar open" : "menu-bar"}>
                <p className="username">
                    {props.name}
                </p>
                {/* sx={{ fontSize: 20 }} */}
                <li><a href="#" className="close-btn" onClick={handleClick}><Arrow className='icon'/></a></li>
                {menuItems.map(item =>
                    <li><a href={item.navigate?item.navigate:"#"}>{item.title}</a></li>
                )}


                <div className="bottom">
                    <div className="line"></div>

                    <p className="username">
                        {props.name}l
                    </p>
                    {/* <p className="username">Mohammed vajeeha</p> */}


                </div>
            </ul>
        </>
    )
}
