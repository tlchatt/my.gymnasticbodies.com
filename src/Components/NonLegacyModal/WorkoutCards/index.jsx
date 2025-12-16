import React, { useState } from 'react';
import { makeStyles, IconButton, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import EditModal from '../../Calendar/DetailedView/AddToScheduleModal'


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
    padding: '12px 16px',
    [theme.breakpoints.down('md')]: {
      padding: '12px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '8px'
    },
  },
}));

export default function CourseCards(props) {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);

  const CourseInfo = props.courseInfo;

  return (
    <Grid className={`${classes.classFinderGrid}`} item sm={4} xs={6}>
      <Card className={classes.root}>
        <img
          onClick={ () => props.handleSuggestedCourse(CourseInfo) }
          src={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${CourseInfo.image_url}`}
          className={classes.media}
          alt=""
        />
        <IconButton className={classes.button} color="primary" variant="contained" onClick={()=>setEdit(true)}>
          {
            CourseInfo.classInfo && CourseInfo.classInfo.dayIndexes && CourseInfo.classInfo.dayIndexes.length > 0
              ? <EditIcon />
              : <AddIcon />
          }
        </IconButton>
      </Card>
      <EditModal
        open={edit}
        handleClose={()=> setEdit(false)}
        title={CourseInfo.title}
        img={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${CourseInfo.image_url}`}
        wpId={CourseInfo.wp_postid}
        mainId={props.mainId}
      />
    </Grid>
  );
}
