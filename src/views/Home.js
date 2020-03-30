import React from 'react';
import MediaTable from '../components/MediaTable';
import {Typography} from '@material-ui/core';

const Home = () =>{
    return (
        <>
            <Typography component="h1" variant="h5">Home</Typography>
            <MediaTable />
        </>    
    );
};


export default Home;
