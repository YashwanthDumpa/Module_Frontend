import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Nav from '../Sidebar/nav'
import '../../Styles/home.css'
import BasicTabs from '../../Components/Pages/Users/LearningDevelopment/tabs'

const Userhome: React.FC = () => {

    const [userName, setuserName] = useState("")


    const [tokendata, setTokendata] = useState('')
    const [trainingData, setTrainingData] = useState([])
    const [onGoingTrainingData, setonGoingTrainingData] = useState([])
    const [registeredTrainingData, setregisteredTrainingData] = useState([])

    const Navigate = useNavigate()

    useEffect(() => {
        const token: string | null = sessionStorage.getItem("authToken")
        console.log("token>", token);
        async function getTraining() {
            const trainingData = await axios.get("http://localhost:8080/get-training-data", { headers: { Authorization: token } })
            const onGoingTrainingData = await axios.get("http://localhost:8080/get-ongoing-training", { headers: { Authorization: token } })
            const registeredTrainingData = await axios.get("http://localhost:8080/get-registered-training", { headers: { Authorization: token } })
           
            
            console.log(trainingData.data.trainingData);
            if (trainingData.data.message === "TokenExpiredError") {
                Navigate("/")
            }
            console.log("From Userhome", trainingData.data.trainingData)
            setTrainingData(trainingData.data.trainingData);
            setonGoingTrainingData(onGoingTrainingData.data.getOngoingTraining)
            setregisteredTrainingData(registeredTrainingData.data.getRegisteredTraining)
            setuserName(trainingData.data.userName);

        }

        if (token !== null) {
            setTokendata(token)
            getTraining()
        } else {
            sessionStorage.clear()
            Navigate('/')
        }
    }, []);


    return (
        <>
            <div className="navigation">
                <Nav name={userName} />
            </div>
            <div className="training">
                {/* <Training trainingData={trainingData} /> */}
                <BasicTabs trainingData={trainingData} onGoingTrainingData={onGoingTrainingData} registeredTrainingData={registeredTrainingData}/>
            </div>

        </>
    )
}

export default Userhome