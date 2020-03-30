import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Button,Card, CardMedia, CardContent, makeStyles, Typography} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles({
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
});

const MediaRow = (props) =>{
    const classes = useStyles();
    const {file} = props; 
    return (
        <Card className={classes.card}>
           <CardMedia
            className={classes.media}
            image={mediaUrl + file.thumbnails.w160}
            title="Title"
           />
           <CardContent>
               <Typography variant="h5" component="h3">{file.title}</Typography>
               <Typography variant="body2" color="textSecondary" component="p">{file.description}</Typography>
           </CardContent>
           <Button fullWidth variant="outlined" color="primary">
               <Link to={'/single/' + file.file_id}>View</Link>
           </Button>
       </Card>
    
    );
};

MediaRow.propTypes = {
    file: PropTypes.object,
};

export default MediaRow;