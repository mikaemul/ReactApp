import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import CatRow from './catRow';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const CatTable = () =>{
    const [picArray,setArray] = useState([]);
    const loadMedia = async () => {
        const response = await fetch(baseUrl + 'media');
        const json = await response.json();
        // haetaan thumbnails
        const items = await Promise.all(json.map( async (item) => {
            const response =  await fetch(baseUrl + 'media/' + item.file_id);
            return await response.json();
          }));
          console.log(items);
          setArray(items);
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