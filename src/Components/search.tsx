import React, { useState } from 'react';
import CustomizedTables from './test';

const Search = (props: any) => {

    

    const trainingData: any[] = props.data;


    // const [searchTerm, setSearchTerm] = useState('');



    const senddata = (value:string) => {

        const filteredTraining = trainingData.filter((training: any) => {
            return training.trainingTitle.includes(value)
        });

        // console.log(filteredTraining);
        

        props.callback(filteredTraining);

    }


    // Filter training titles based on the search term

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a training title"
                onChange={(e) => { senddata(e.target.value) }}
            />
        </div>
    );
};

export default Search;
