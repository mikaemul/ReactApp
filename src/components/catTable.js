import React from "react";
import PropTypes from 'prop-types';
import CatRow from './catRow';

const CatTable = (props) =>{
    const {media} = props;
    const catRow = media.map((item,index) => {
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