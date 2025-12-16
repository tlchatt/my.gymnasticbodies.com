import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: 8
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  content: {
    flex: '1 0 auto',
    whiteSpace: 'nowrap',
    padding: 12
  },
  cover: {
    minWidth: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1/2),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const PlayerPreview = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`https://gymfit-images.s3.amazonaws.com/exercises/${props.imageName.split('.').join('').toUpperCase()}.jpg`}
        title={props.videoTitle}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" noWrap={true}>
            {props.videoTitle}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="play/pause" onClick={props.handlePlayer}>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

export default PlayerPreview;
