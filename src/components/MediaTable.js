import React from "react";
import MediaRow from './MediaRow';
import { useAllMedia } from "../hooks/ApiHooks";


const MediaTable = () =>{
    const picArray = useAllMedia();
    console.log(picArray);
    
    const mediaRow = picArray.map((item,index) => {
        return <MediaRow file={item} key={index}/>
    });
    return (
    <table>
        <tbody>
        {mediaRow}
        </tbody>
    </table>
    );
}


export default MediaTable;