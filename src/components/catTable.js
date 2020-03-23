import React from "react";
import CatRow from './catRow';
import { useAllMedia } from "../hooks/ApiHooks";


const CatTable = () =>{
    const picArray = useAllMedia();
    console.log(picArray);
    
    const catRow = picArray.map((item,index) => {
        return <CatRow file={item} key={index}/>
    });
    return (
    <table>
        <tbody>
        {catRow}
        </tbody>
    </table>
    );
}


export default CatTable;