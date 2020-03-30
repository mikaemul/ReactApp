import React from "react";
import MediaRow from './MediaRow';
import { useAllMedia } from "../hooks/ApiHooks";
import { Container} from '@material-ui/core';


const MediaTable = () =>{
    const picArray = useAllMedia();
    console.log(picArray);
    
    const mediaRow = picArray.map((item,index) => {
        return <MediaRow file={item} key={index}/>
    });
    return (
    <Container fixed >
    
        {mediaRow}
    
    </Container>
    );
}


export default MediaTable;