import { useState } from 'react';
import '../Styles/LandDScreen.css';
import Card from './card';
import TrainingForm from './Form';
import TrainingTable from './trainingTable';
import '../Styles/training.css';
import SearchIcon from '@mui/icons-material/Search';

import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Training = (props: any) => {
    const trainingData = props.trainingData;

    const [searchTerm, setSearchTerm] = useState('');

    // Filter training titles based on the search term
    const filteredTraining = trainingData.filter((training: any) => {
        return training.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='container-fluid pe-4'>
            <h1 className="heading text-start mt-3">Learning & Development</h1>
            <div className="d-flex justify-content-between main-training-box w-100 p-4">
                {/* <div className='search'>
                    <abbr title='Search for a training title' className='d-flex justify-content-between'>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <SearchIcon style={{ color: '#6a6c71' }} className='search-icon' />
                    </abbr>
                </div> */}
                <abbr title='Search for a training title' style={{ textDecoration: 'none', backgroundColor: "rgb(245,250,250)" }}>

                    <TextField
                        label="" size="small" placeholder='Search...'
                        id="outlined-start-adornment" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ maxHeight: 30 }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><SearchIcon sx={{ height: 20 }} /></InputAdornment>,
                        }}
                    />
                </abbr>
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
                <TrainingTable trainingData={filteredTraining} />
            </div>
        </div>
    );
}

export default Training