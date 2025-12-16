import React from 'react';
import { makeStyles, Box, Card, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  media: {
    aspectRatio: '3/2',
    maxWidth: 150,
    width: '100%',
    borderRadius: 4,
  },
}));

export default function MobileConent(props) {
  const classes = useStyles();

  return (
    <div className={clsx("gf-grid-levels", "gf-with-title ")}>
      <Box className='gf-sampler-title'>
        <Typography variant='h5' gutterBottom align='center' style={{ width: '100%', color: '#FF9435', fontWeight: 400 }}>
          {props.trainingType}
        </Typography>
      </Box>
      <Box className="gf-sampler-image-container">
        <Card elevation={0}>
          <img
            className={classes.media}
            alt={props.title}
            src={props.sectionType === 'individualWorkouts'
              ? `https://gymfit-images.s3.amazonaws.com/exercises/${props.image.split('.')[0].toUpperCase()}.jpg`
              : `https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.image}`
            }
          />
        </Card>
      </Box>
      <Box className="gf-grid-data-section">
        <Typography variant='h6' align='left' style={{ width: '100%', color: '#5D5D5D' }}>
          {props.title}
        </Typography>
        {
          props.sectionType === 'individualWorkouts' ? null : <Typography align='left' style={{ color: "#FF9435", paddingRight: 8 }}>
            {props.timeStamp}
          </Typography>
        }
      </Box>
      <Box className="gf-icon gf-icon-jc-center">
        <IconButton component="span" style={{ padding: 10, marginBottom: 4 }} onClick={props.handleAdd} disabled={props.count === props.maxCount}>
          <AddIcon />
        </IconButton>
        <IconButton aria-label="upload picture" component="span" onClick={props.handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </div>
  );
}
