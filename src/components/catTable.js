import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import CatRow from './catRow';

const CatTable = () =>{
    const [picArray,setArray] = useState([]);
    const loadMedia = async () => {
        const response = await fetch('test.json');
        const json = await response.json();
        console.log(json);
        setArray(json);
    };
    useEffect(() =>{
        loadMedia();
    }, []);
    
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

CatTable.propTypes = {
    media: PropTypes.array,
};

export default CatTable;