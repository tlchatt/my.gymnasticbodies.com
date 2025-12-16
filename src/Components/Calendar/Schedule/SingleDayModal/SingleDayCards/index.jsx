import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { connect, useDispatch } from 'react-redux';

import Aux from '../../../../../HOC/aux'
import DeleteModal from '../../../DeleteModal';
import ModalRender from '../../../../UtilComponents/RenderModal';

import { LogNonLegacyCourse } from '../../../../../Store/Action/calendarActions';


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    margin: '4px auto 4px 0',
    height: 48,
    [theme.breakpoints.down(415)]: {
      minWidth: 300,
    },
  },
  cardHeader: {
    padding: 4,
    display: 'flex',
    cursor: 'pointer'
  },
  auxButtons: {
    padding: 8,
    margin: 'auto'
  },
  cardTitle: {
    fontSize: '1rem',
    lineHeight: 1.1,
    letterSpacing: '0.5px'
  },
  actionOverrid: {
    margin: 'auto'
  },
  logged: {
    backgroundColor: 'rgba(0,200,83,0.5) !important',
    color: 'white !important'
  }
}));

const SingleDayCard = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openNonLegacy, setNonLegacy] = React.useState(false);
  const dispatch = useDispatch();
  const CourseInfo = props.parentId && props.parentId !== 59257
    ? props.subClasses.filter(course => course.wp_postid === props.id)[0]
    : props.courseList.filter(course => course.wp_postid === props.id)[0];

  const handleNonLegacyLog = () => {
    const { currentDayIndex, calId, id } = props;
    dispatch(LogNonLegacyCourse(id, currentDayIndex, calId))
  }

  return (
    <>
      <DeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        title={props.title}
        wpId={props.id}
        taskId={props.calId}
        currentDayIndex={props.currentDayIndex}
      />
      <ModalRender
        CourseInfo={CourseInfo}
        open={openNonLegacy}
        close={() => setNonLegacy(false)}
        currentDayIndex={props.currentDayIndex}
        parentId={props.parentId}
      />
      <Card className={classes.root} elevation={0}>
        <CardHeader
          classes={{action: classes.actionOverrid}}
          disableTypography={true}
          avatar={
            <Avatar src={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.imageId}`}/>
          }
          title={
            <Typography variant='h6' className={classes.cardTitle} onClick={()=>setNonLegacy(true)}>
              {props.title}
            </Typography>
          }
          subheader={
            <Typography variant='body2'>
              {props.amount}
            </Typography>
          }
          className={classes.cardHeader}
          action={
            <Aux>
              {
                props.type === 'Classes' || props.type === 'WarmUp'
                  ? <IconButton
                      disabled={props.workoutData.completed === props.workoutData.total}
                      className={`${classes.auxButtons} ${props.workoutData.completed === props.workoutData.total && classes.logged}`}
                      aria-label="settings"
                      onClick={handleNonLegacyLog}
                     >
                      <CheckIcon />
                    </IconButton>
                  : props.workoutData.completed >= props.workoutData.total
                    ? <IconButton disabled={true} className={`${classes.auxButtons} ${classes.logged}`} aria-label="settings"><CheckIcon /></IconButton>
                    : null
              }
              <IconButton
                className={classes.auxButtons}
                aria-label="settings"
                onClick={()=> setOpen(true)}
              >
                <DeleteIcon />
              </IconButton>
            </Aux>
          }
        />
        </Card>
    </>
  );
}

const mapStatetoProps = state => {
  return {
    courseList: state.classes,
    subClasses: state.subClasses
  }
}

export default connect(mapStatetoProps)(SingleDayCard);

