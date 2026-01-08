import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Divider from '@material-ui/core/Divider';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import clsx from 'clsx';

import Steps from './steps'
import Popover from './Popover'


const useStyles = makeStyles(theme => ({
  media: {
    aspectRatio: '3/2',
    borderRadius: 4,
    boxShadow: theme.shadows[2],
    paddingBottom: `${(2 / 3) * 100}%`
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: '100%',
    padding: '4px 0'
  },
  cardImageAction: {
    margin: '0 auto',
    width: '100%',
    borderRadius: 4,
    marginBottom: 8,
    maxWidth: 160,
    minWidth: 160,
    position: 'relative',
    paddingTop: 12,
    [theme.breakpoints.down(425)]: {
      maxWidth: 130,
      minWidth: 130,
    }
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
    margin: (isMobileView) => isMobileView ? 8 : '0 8px 8px',
    display: 'flex',
    flexDirection: 'column',
  },
  innerContent: {
    padding: 4
  },
  category: {
    backgroundColor: '#656464',
    color: 'white',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    top: 0,
    width: '100%',
    textTransform: 'uppercase',
  },
  mainTitle: {
    maxWidth: (isMobileView) => isMobileView ? null : 330,
    color: '#5D5D5D',
    fontFamily: 'Helvetica Neue, "Open Sans", sans-serif',
    fontSize: '1rem',
    textTransform: 'uppercase'
  },
  disabled: {
    color: '#4caf50 !important'
  }
}));


// get last letter of a tring


export default function CourseCardContent(props) {
  const {
    exerciseNotation,
    section,
    name,
    workoutInfo,
    showDivider,
    isMobileView,
    stepNo,
    workoutIndex,
    dateKey,
    dateKeyIndex,
    progressionIndex,
    exerciseId,
    isLogged,
    notes,
    handleLegacyPlayer,
    isBuildYourOwn
  } = props;
  const classes = useStyles(isMobileView);
  console.log("props?:", isLogged,"section:",section)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [type, setType] = React.useState('log');

  const handleClick = (event, type) => {
    setAnchorEl(event.currentTarget);
    setType(type)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const workoutInfoObjectkeys = Object.keys(workoutInfo);

  return (
    <>
      <div className={clsx(classes.subCardContent, { [classes.extraMargin]: props.extraMargin })}>
        <Typography gutterBottom variant='h6' noWrap className={classes.mainTitle} align='center'>
          {exerciseNotation} {section} - <span style={{ color: '#A3A3A3' }}> {name} </span>
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {
            workoutInfoObjectkeys.map((key, index) => {
              return (
                
                  <div className={classes.innerContent} key={index}>
                    <CardActionArea
                      className={classes.cardImageAction}
                      onClick={() => handleLegacyPlayer(
                        workoutInfo[key].name,
                        workoutInfo[key].setsAndReps,
                        workoutInfo[key].instructions,
                        workoutInfo[key].focusPoints,
                        workoutInfo[key].videos[0].videoName,
                        workoutInfo[key].technicalTips
                      )}
                    >
                      <div className={classes.category}>
                        <Typography align='center' style={{ fontFamily: 'Helvetica Neue, "Open Sans", sans-serif' }} >{key}</Typography>
                      </div>
                      <CardMedia
                        className={classes.media}
                        image={`https://gymfit-images.s3.amazonaws.com/exercises/${workoutInfo[key].imageName.split('.').join('').toUpperCase()}.jpg`}
                        title={workoutInfo[key].name}
                      />
                      <div className={`${classes.overLay}`}>
                        <PlayCircleOutlineIcon className={classes.playButtonIcon} />
                      </div>
                    </CardActionArea>
                    <Typography variant='subtitle2' style={{ color: "#FF9435", maxWidth: 160 }} noWrap>
                      {workoutInfo[key].setsAndReps} - {workoutInfo[key].name}
                    </Typography>
                  </div>
                
              )
            })
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 4 }}>
          <div>
            <Steps
              step={stepNo}
              section={section}
              min={1}
              max={9}
              workoutIndex={workoutIndex}
              progressionIndex={progressionIndex}
              dateKey={dateKey}
              dateKeyIndex={dateKeyIndex}
              exerciseId={exerciseId}
              disabled={isLogged}
              isMobileView={isMobileView}
            />
          </div>
          <div>
            <Button
              onClick={(e) => handleClick(e, 'log')}
              variant={isLogged ? 'text' : 'contained'}
              style={{ padding: '4px 18px' }}
              disabled={isLogged}
              classes={{ disabled: classes.disabled }}
            >
              {isLogged ? 'Logged' : 'Log'}
            </Button>
            <Button
              onClick={(e) => handleClick(e, 'notes')}
              style={{ marginLeft: 4 }}
            >
              {notes ? <EditOutlinedIcon /> : <NoteAddOutlinedIcon />}
            </Button>

            <Popover
              anchorEl={anchorEl}
              handleClose={handleClose}
              type={type}
              data={props}
              dateKey={dateKey}
              dateKeyIndex={dateKeyIndex}
              workoutIndex={workoutIndex}
              isBuildYourOwn={isBuildYourOwn}
            />
          </div>
        </div>

      </div>
      {showDivider && <Divider orientation="vertical" flexItem />}
      {isMobileView && <Divider />}
    </>
  );
}
