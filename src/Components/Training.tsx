import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import '../Styles/LandDScreen.css';
import Card from './card';
import TrainingForm from './Form';
import CustomizedTables from './test';

import '../Styles/training.css';


const Training = (props: any) => {
    const trainingData = props.trainingData;


    
  const [searchTerm, setSearchTerm] = useState('');

  // Filter training titles based on the search term
  const filteredTraining = trainingData.filter((training:any) => {
    return training.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

    return (
        <>
            <h1 className="heading text-start mt-3">Learning & Development</h1>
            <div className="d-flex justify-content-between main-training-box w-100 p-4">
                    <input
                        type="text"
                        placeholder="Search for a training title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <TrainingForm />
                </div>
                <div className='show-mobile'>
                    {trainingData.map((data: any) =>
                        <div className="p-3">
                            < Card tdata={data} />
                        </div>
                    )}
                </div>
                <div className='show-monitor'>
                    <CustomizedTables trainingData={filteredTraining} />
                </div>
            </>
            );
}

            export default Training