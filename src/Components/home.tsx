// import LandD from "./LandDScreen";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/home.css';
import Training from "./Training";
import Nav from "./nav";

const Home = () => {

    const [userName, setuserName] = useState("")
    const [tokendata, setTokendata] = useState('')
    const [trainingData, setTrainingData] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const token: string | null = sessionStorage.getItem("authToken")
        console.log("token>", token);
        async function getTraining() {
            const trainingData = await axios.get("http://localhost:8080/get-training-data", { headers: { Authorization: token } })
            console.log(trainingData.data.trainingData);
            if (trainingData.data.message === "TokenExpiredError") {
                Navigate("/")
            }
            console.log("From Userhome", trainingData.data.trainingData)
            setTrainingData(trainingData.data.trainingData);
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

        <div>
            <div className="navigation">
                <Nav Nav name={userName} />
            </div>
            <div className="training">
                <Training trainingData={trainingData}/>
            </div>
        </div>

    )

}

export default Home