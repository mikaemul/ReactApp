import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Card, CardMedia,Typography,makeStyles} from '@material-ui/core';

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
  thumbnail: {
    height: 600,
  },
});

const Single = ({match}) => {
  const classes=useStyles();
  console.log('match',match.params.id);
   // TODO: fetch single media based on id from path parameter
  const file = useSingleMedia(match.params.id);
  
  return (
    <Card>
      <Typography component="h1" variant="h5">{file.title}</Typography>
      <CardMedia
      className={classes.thumbnail}
      image={mediaUrl + file.filename}
      title={file.title}
      />
    </Card>
  );
};

// TODO: add propTypes
Single.propTypes ={
    match: PropTypes.object,
};

export default Single;