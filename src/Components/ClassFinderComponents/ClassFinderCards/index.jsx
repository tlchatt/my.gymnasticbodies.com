import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, IconButton, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import OhNoModal from '../../OhNoModal';
import EditModal from '../../Calendar/DetailedView/AddToScheduleModal'
import ModalRender from '../../UtilComponents/RenderModal'
import './styles.scss';

const useStyles = makeStyles(theme =>({
  root: {
    maxWidth: 330,
    width: '100%',
    height: '100%',
    margin: 'auto',
    position: 'relative',
    cursor: 'pointer'
  },
  media: {
    width: '100%',
    height: '100%'
  },
  button: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    background: '#1e88e5',
    padding: 8,
    color: 'white',
    '&:hover':{
      background: '#2196f3',
    }
  },
  classFinderGrid: {
    padding: '8px',
    paddingBottom: '40px',
    [theme.breakpoints.down('md')]: {
      paddingBottom: '24px'
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '12px'
    },
  },
}));

export default function CourseCards(props) {
  const classes = useStyles();
  const timeoutRef = useRef(null);
  const [hiddenClass, setHiddenClase] = useState('');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const CourseInfo = props.courseInfo;

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    if (!CourseInfo.show) {
      timeoutRef.current = setTimeout(()=> {
        timeoutRef.current = null;
        setHiddenClase('display-none')
      },550);
    }
    else {
      timeoutRef.current = setTimeout(()=> {
        timeoutRef.current = null;
        setHiddenClase('')
      },400);
    }

  }, [CourseInfo.show]);

  const handleEditButton = () => {
    if (CourseInfo.wp_postid === 59257) return () => setOpen(true);
    else if (CourseInfo && CourseInfo.classInfo && CourseInfo.classInfo.workouts.length) return () => setOpen(true);
    else return () => setEdit(true)
  }

  return (
    <Grid className={`${classes.classFinderGrid} ${hiddenClass} ${props.addClass}`} item sm={4} xs={6}>
      <Card className={classes.root}>
        <img onClick={() => setOpen(true)} src={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${CourseInfo.image_url}`} className={classes.media} alt="" />
        {
          CourseInfo.wp_postid === 59257
            ? null
            : <IconButton
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={handleEditButton()}
              >
                {(CourseInfo.classInfo && CourseInfo.classInfo.dayIndexes && CourseInfo.classInfo.dayIndexes.length > 0) || CourseInfo.mySchedule === "MySchedule" ? <EditIcon /> : <AddIcon />}
              </IconButton>
        }
      </Card>
      <ModalRender CourseInfo={CourseInfo} open={open} close={()=>setOpen(false)}/>
      {
        CourseInfo.classInfo
          ? <EditModal
              open={edit}
              handleClose={()=> setEdit(false)}
              title={CourseInfo.classInfo.title}
              img={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${CourseInfo.image_url}`}
              wpId={CourseInfo.wp_postid}
            />
          : <OhNoModal open={edit} handleClose={()=> setEdit(false)}/>
      }

    </Grid>
  );
}
