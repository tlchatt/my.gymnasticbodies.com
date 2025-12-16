import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { connect, useDispatch } from 'react-redux';

import ModalRender from '../../../UtilComponents/RenderModal'
import AreYouSure from '../../../UtilComponents/AreYouSure'
import Aux from '../../../../HOC/aux'
import DeleteModal from '../../DeleteModal';

import { LogNonLegacyCourse } from '../../../../Store/Action/calendarActions';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 344,
    margin: 8,
    height: 48,
    background: '#eeeeee',
    [theme.breakpoints.down(415)]: {
      minWidth: 275,
    },
  },
  avatar: {
    backgroundColor: blue[600],
    cursor: 'pointer'
  },
  cardHeader: {
    padding: 4,
    display: 'flex'
  },
  auxButtons: {
    padding: 8,
    margin: 'auto'
  },
  cardTitle: {
    fontSize: '1rem',
    lineHeight: 1.1,
    letterSpacing: '0.5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  actionOverrid: {
    margin: 'auto'
  },
  logged: {
    backgroundColor: 'rgba(0,200,83,0.5) !important',
    color: 'white !important'
  },
  contentOverride: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  }
}));

const DetiledCard = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openNonLegacy, setNonLegacy] = React.useState(false);
  const [openMobileSave, setOpenMobileSave] = React.useState(false);

  const CourseInfo = props.parentId && props.parentId !== 59257
    ? props.subClasses.filter(course => course.wp_postid === props.wpId)[0]
    : props.courseList.filter(course => course.wp_postid === props.wpId)[0];

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


  const handleNonLegacyLog = () => {
    const { dayIndex, id, wpId } = props;
    dispatch(LogNonLegacyCourse(wpId, dayIndex, id))
  }



  return (
    <Aux>
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        title={props.title}
        wpId={props.wpId}
        taskId={props.id}
        currentDayIndex={props.dayIndex}
        parentId={props.parentId ? props.parentId : null}
      />
      <AreYouSure cb={handleNonLegacyLog} handleClose={() => setOpenMobileSave(false)} cbMessage='Log' message='DO YOU WANT TO MARK THIS CLASS COMPLETE?' open={openMobileSave}/>
      <ModalRender CourseInfo={CourseInfo} open={openNonLegacy} close={() => setNonLegacy(false)} currentDayIndex={props.dayIndex} parentId={props.parentId} />
      <Draggable
        key={props.id}
        draggableId={props.id}
        index={props.index}
      >
        {(provided, snapshot) => (
          <Card className={classes.root}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <CardHeader
              classes={{action: classes.actionOverrid, content:classes.contentOverride}}
              disableTypography={true}
              avatar={
                <Avatar src={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.imgUrl}`} />
              }
              title={
                <Typography variant='h6' className={classes.cardTitle} onClick={()=>setNonLegacy(true)}>
                  {props.title}
                </Typography>
              }
              subheader={
                <Typography variant='body2' onClick={()=>setNonLegacy(true)}>
                  {
                    `${props.amount.completed} / ${props.amount.total}`
                  }
                </Typography>
              }
              className={classes.cardHeader}
              action={
                <Aux>
                  {
                    props.type === 'Classes' || props.type === 'WarmUp'
                      ? <IconButton disabled={props.amount.completed === props.amount.total} className={`${classes.auxButtons} ${props.amount.completed === props.amount.total && classes.logged}`} aria-label="settings" onClick={ props.isMobile ? ()=>setOpenMobileSave(true) : handleNonLegacyLog }><CheckIcon /></IconButton>
                      : props.amount.completed >= props.amount.total ? <IconButton disabled={true} className={`${classes.auxButtons} ${classes.logged}`} aria-label="settings"><CheckIcon /></IconButton> : null
                  }
                  <IconButton className={classes.auxButtons} aria-label="settings" onClick={handleClickOpenDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Aux>
              }
            />
            </Card>
        )}

      </Draggable>

    </Aux>
  );
}

const mapStatetoProps = state => {
  return {
    courseList: state.classes,
    subClasses: state.subClasses
  }
}


export default connect(mapStatetoProps)(DetiledCard);
