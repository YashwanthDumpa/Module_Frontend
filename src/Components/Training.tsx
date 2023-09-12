import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import '../Styles/LandDScreen.css';
import Card from './card';
import TrainingForm from './Form';
import CustomizedTables from './test';


const Training: React.FC = () => {
    const Navigate = useNavigate()

    const [tokendata, setTokendata] = useState('')
    const [trainingData, setTrainingData] = useState([])

    useEffect(() => {
        const token: string | null = sessionStorage.getItem("authToken")
        console.log("token>", token);
        async function getTraining() {
            const trainingData = await axios.get("http://localhost:8080/get-training-data", { headers: { Authorization: token } })
            console.log(trainingData.data.trainingData);
            if(trainingData.data.message === "TokenExpiredError"){
                Navigate("/")
            }
            setTrainingData(trainingData.data.trainingData)
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
            <TrainingForm />
            {trainingData.map(data =>
                <div className="p-3">
                    < Card tdata={data} />
                </div>
            )}
            <div>
                <CustomizedTables trainingData={trainingData} />
            </div>
        </>
    );
}

export default Training