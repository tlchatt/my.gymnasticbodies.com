import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles({
  cardContent: {
    padding: '12px !important'
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '4px 8px',
  },
  image: {
    borderRadius: '50%',
    width: 75,
    height: 75,
    objectFit: 'cover',
    border: '2px solid #707070'
  },
  complete: {
    border: '3px solid #40ea40'
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        component="img"
        alt={props.description}
        src={`https://gymfit-images.s3.amazonaws.com/nutrition/${props.image}`}
        className={clsx(classes.image, {[classes.complete]: props.isCompleted})}
      />
      <Typography variant='overline' style={{color: '#6C6C6C'}}>
        {props.description}
      </Typography>
    </div>
  );
}
