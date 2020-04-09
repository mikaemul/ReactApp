import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Card, CardMedia,Typography,makeStyles, Button} from '@material-ui/core';
import BackButton from '../components/BackButton';

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

const Single = ({match, history}) => {
  const classes=useStyles();
  console.log('match',match.params.id);
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  if(file !== null){
  description = (JSON.parse(file.description));
  };
  return (
    <>
    { file !== null &&
    <Card>
      <BackButton/>
      <Typography component="h1" variant="h5">{file.title}</Typography>
      { description &&
      <CardMedia
        className={classes.thumbnail}
        image={mediaUrl + file.filename}
        title={file.title}
        style={
          {
              filter: `
          brightness(${description.filters.brightness}%)
          contrast(${description.filters.contrast}%) 
          saturate(${description.filters.saturation}%)
          sepia(${description.filters.sepia}%)
          `,
          }}
        />
        }
    </Card>
    }
    </>
  );
};

// TODO: add propTypes
Single.propTypes ={
    match: PropTypes.object,
    history: PropTypes.object
};

export default Single;