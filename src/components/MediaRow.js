import React from "react";
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import { makeStyles,IconButton,GridListTileBar} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) =>({
    root: {
        maxWidth:345,
    },
    media: {
        height: 140,
    },
    card: {
        boxShadow: '6px -6px 5px 0px rgba(0,0,0,0.56)',
        margin: 20,
    },
    icon: {
        color: 'rgba(255,255,255,0.54',
    },
}));

const MediaRow = (props) =>{
    const classes = useStyles();
    const {file} = props; 
    return (
        <>
            <img src={mediaUrl + file.thumbnails.w320} alt={file.title}/>
           <GridListTileBar
            title= {file.title}
            subtitle={file.description}
            actionIcon={
                <IconButton
                    aria-label={`info about ${file.title}`}
                    component={RouterLink}
                    to={'/single/' + file.file_id}
                    className={classes.icon}
                >
                    <PageviewIcon fontSize="large"/>
                    </IconButton>
            }
           />
        </> 
    );
};

MediaRow.propTypes = {
    file: PropTypes.object,
};

export default MediaRow;