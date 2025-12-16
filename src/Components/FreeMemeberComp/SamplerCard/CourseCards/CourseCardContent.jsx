import React from 'react';
import { makeStyles } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  media: {
    aspectRatio: '3/2',
    borderRadius: 4,
    boxShadow: theme.shadows[2],
    paddingBottom: `${(2/3) * 100 }%`
  },
  cardActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: '100%',
    padding: '4px 0'
  },
  cardImageAction: {
    margin: '0 auto',
    width: '100%',
    borderRadius: 4,
    maxWidth: 160,
  },
  playButtonIcon: {
    fontSize: '3rem',
    opacity: 0.6,
    color: '#ffffff',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      opacity: 1,
      fontSize: '4rem',
    }
  },
  overLay: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subCardContent: {
    minWidth: 160
  },
  extraMargin: {
    margin: '0 8px'
  }
}));



export default function CourseCardContent(props) {
  const classes = useStyles();

  return (
    <>
      <div className={clsx(classes.subCardContent, { [classes.extraMargin]: props.extraMargin })}>
        <CardActionArea className={classes.cardImageAction} onClick={props.playVideo} disabled={props.isPreviousDay}>
          <CardMedia
            className={classes.media}
            image={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.image}`}
            title={props.title}
          />
          <div className={`${classes.overLay}`}>
            <PlayCircleOutlineIcon className={classes.playButtonIcon} />
          </div>
        </CardActionArea>
      </div>
      <div className={classes.cardActions}>
        <Typography variant='h6' style={{ maxWidth: 180, color: '#5D5D5D' }} align='center' noWrap >
          {props.title}
        </Typography>
        {
          props.showNote && <Typography style={{ color: "#FF9435", maxWidth: 210 }} title={props.showNote}>
            {props.showNote}
          </Typography>
        }
      </div>
      {props.divider && <Divider  orientation="vertical" flexItem />}
    </>
  );
}
