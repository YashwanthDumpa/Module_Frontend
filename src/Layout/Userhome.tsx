import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Training from '../Components/Training'
import Nav from '../Components/nav'
import '../Styles/home.css'

const Userhome: React.FC = () => {

    const [userName, setuserName] = useState("")
    const Navigate = useNavigate()

    console.log(userName);
    useEffect(() => {
        const token: string | null = sessionStorage.getItem("authToken")
        console.log("tokennnnnnn: ", token);
        async function getTraining() {
            const trainingData = await axios.get("http://localhost:8080/get-training-data", { headers: { Authorization: token } })
            setuserName(trainingData.data.userName);
            console.log("user :::", trainingData);
        }
        if (token !== null) {
            getTraining()
        } else {
            sessionStorage.clear()
            Navigate('/')
        }
    })

    return (
        <>
            <div className="navigation">
                <Nav name={userName} />
            </div>
            
            <div className="training">
                <Training />
            </div>
        </>
    )
}

export default Userhome