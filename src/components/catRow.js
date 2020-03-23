import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const CatRow = (props) =>{
    const {file} = props; 
    return (
        <tr>
           <td>
               <img src={mediaUrl + file.thumbnails.w160} alt="Title" />
            </td>
           <td>
               <h3>{file.title}</h3>
               <p>{file.description}</p>
           </td>
           <td>
               <Link to={'/single/' + file.file_id}>View</Link>
           </td>
       </tr>
    );
};

CatRow.propTypes = {
    file: PropTypes.object,
};

export default CatRow;