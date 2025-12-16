import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'


import Aux from '../../../../HOC/aux'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
    maxWidth: 330,
    position: 'relative',
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%'
  },
  progressionInfo: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  strentgh: {
    background: 'linear-gradient(-90deg, rgba(255,255,255,0) 75%, #FDAF17 100%)'
  },
  mobility: {
    background: 'linear-gradient(-90deg, rgba(255,255,255,0) 75%, #0181C8 100%)'
  },
  padding: {
    padding: 12
  },
  cardConent: {
    padding: "0 !important"
  },
  overLay: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  playButton: {
    margin: 'auto',
  },
  playButtonIcon: {
    fontSize: '4rem',
    opacity: 0.9,
    color: '#ffffff',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      opacity: 1,
    }
  },
  mobIcon: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
  },
  cardType: {
    position: 'absolute',
    left: '-26px',
    top: '40%',
    transform: 'rotate(90deg)',
    color: 'white',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    boxShadow: '0 0 4rem rgba( 0, 0, 0.2)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    minWidth: '83px'
  }
});

const  ExceriseCard = props=> {
  const classes = useStyles();
  const preventDefault = (event) => {
    event.preventDefault();
    props.handleEditOpen();
  };

  return (
    <Aux>
      <Grid item xs={6} sm={6} md={3} lg={3} className={`${classes.padding}`} >
        <Paper className={classes.media} elevation={4}>
          <div className={`${classes.overLay} ${props.type === 'Strength' ? classes.strentgh : classes.mobility}`}>
            <Typography variant="h6" className={classes.cardType}>
             {props.type}
            </Typography>
            <IconButton className={classes.playButton} onClick={props.handlePlayer}>
              <PlayCircleOutlineIcon className={classes.playButtonIcon} />
            </IconButton>
          </div>
          <img
            className={classes.img}
            src={`https://gymfit-images.s3.amazonaws.com/exercises/${props.imageName.split('.').join('').toUpperCase()}.jpg`}
            alt="Something"
          />
        </Paper>
      </Grid>
      <Grid item xs={6} sm={6} md={9} lg={9} className={`${classes.progressionInfo} ${classes.padding}`}>
        <CardContent className={classes.cardConent}>
          <Typography variant="h5" component="h2">
            {props.exerciseNotation}: {props.name}
          </Typography>
          {
            props.isWarmup
              ? <Typography variant="body2" color="textSecondary" component="p"> {props.setsAndReps}</Typography>
              : <Typography variant="body2" color="textSecondary" component="p"> Step {props.stepNum}/9: {props.setsAndReps}</Typography>
          }
          {
            props.type === 'Strength' && !props.hideSeeMore ? <Link variant="body2" href="#" onClick={preventDefault}> See More </Link> : null
          }

        </CardContent>
      </Grid>
    </Aux>
  );
}

export default ExceriseCard;
