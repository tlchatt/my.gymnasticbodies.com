import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import axios from 'axios'
import { useDispatch } from 'react-redux';

import MobileContent from './MobileConent'
import EditWorkout from '../CoursePreview/MobileCoursePreview';
import { removeCategory, addNewCategory } from '../../../../../Store/Action/WorkoutBuilderActions'

const useStyles = makeStyles(() => ({
  root: {
    margin: 4,
    border: 'dashed 2px #656464',
    background: (props) => props.hasData || props.isSelected ? 'white' : '#E6E6E6',
    minHeight: 280,
    display: 'flex',
    maxWidth: (props) => props.size === 'sm' ? 90 : 120,
    width: '100%',
    textAlign: 'center',
    flexShrink: 0
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textTransform: 'uppercase',
    color: (props) => props.hasData ? '#FF9435' : '#656464',
    fontFamily: 'Helvetica Neue',
    fontWeight: (props) => props.hasData ? 500 : 400,
  },
  coursePreview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
    alignItems: 'center'
  },
  media: {
    aspectRatio: '3/2',
    borderRadius: 4,
    // paddingBottom: `${(2 / 3) * 100}%`,
    width: '90%'
  },
  isMobileMode: {
    minHeight: (props) => props.size === 'sm' ? 56 : 64,
    maxWidth: 'unset !important',
    width: 'auto',
    background: '#EFEFEF',
  },
  categoryText: {
    textTransform: 'uppercase',
    color: (props) => props.isSelected && props.isMobileMode ? '#FF9435' : '#656464',
    fontFamily: 'Helvetica Neue',
    fontWeight: 400
  },
  singleProgText: {
    color: '#FF9435',
    fontFamily: 'Helvetica Neue',
    fontWeight: 400,
    maxWidth: '90%'
  }
}));


function display(seconds) {
  const format = val => `0${Math.floor(val)}`.slice(-2)
  const minutes = (seconds % 3600) / 60

  return [minutes, seconds % 60].map(format).join(':')
}

export default function CategoryCard(props) {
  const classes = useStyles(props);
  const [timeStamp, setTimeStamp] = React.useState('');
  const dispatch = useDispatch();

  const {
    courseData,
    hasData,
    isMobileMode,
    handleOpenCollaps,
    isLegacy,
  } = props;

  const { mediaId } = courseData;

  useEffect(() => {
    const fetchDurration = () => {
      axios.get(`https://content.jwplatform.com/feeds/${mediaId}`).then(res => {
        setTimeStamp(display(res.data.playlist[0].duration))
      })
    }
    if (hasData && !isLegacy && mediaId ) {
      fetchDurration();
    }
  }, [hasData, isLegacy, mediaId])

  const handleAddNewCat = () => {
    dispatch(addNewCategory(props.category, props.sectionIndex, props.sectionType, props.count))
  }

  const handleDelete = () => {
    dispatch(removeCategory(props.sectionIndex, props.sectionType))
  }

  return (
    <>
      <Card className={clsx(classes.root, { [classes.isMobileMode]: isMobileMode })} elevation={0}>
        {
          hasData
            ? isMobileMode
              ? <MobileContent
                handleOpenCollaps={handleOpenCollaps}
                handleAdd={handleAddNewCat}
                handleDelete={handleDelete}
                image={courseData.image}
                title={courseData.classOrExerciseName}
                timeStamp={timeStamp}
                trainingType={courseData.trainingType}
                count={props.count}
                sectionType={props.sectionType}
                maxCount={props.maxCount}
              />
              : <CardContent style={{ padding: 0, width: '100%' }}>
                <div className={classes.coursePreview}>
                  <Typography className={classes.pos} noWrap style={{ maxWidth: '90%' }} >
                    {courseData.trainingType}
                  </Typography>
                  <IconButton aria-label="Add" onClick={handleAddNewCat} disabled={props.count === props.maxCount}>
                    <AddIcon />
                  </IconButton>
                  <img
                    className={classes.media}
                    alt={courseData.trainingType}
                    src={props.sectionType === 'individualWorkouts'
                      ? `https://gymfit-images.s3.amazonaws.com/exercises/${courseData.image.split('.')[0].toUpperCase()}.jpg`
                      : `https://gymfit-images.s3.amazonaws.com/CourseIcons/${courseData.image}`
                    }
                  />
                  {
                    props.sectionType === 'individualWorkouts'
                      ? <Typography className={classes.singleProgText} color="textSecondary" noWrap title={courseData.classOrExerciseName}>{courseData.classOrExerciseName}</Typography>
                      : <Typography className={classes.pos} color="textSecondary" style={{ marginBottom: props.isLegacy ? 24 : 0 }} noWrap >
                        {
                          timeStamp ? timeStamp : ''
                        }
                      </Typography>
                  }
                  <div>
                    <IconButton aria-label="delete" onClick={handleDelete} style={{ marginRight: 4 }} >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            : <CardActionArea onClick={handleOpenCollaps}>
              <Typography className={classes.categoryText} color="textSecondary"  >
                {
                  props.isMobileMode && props.isSelected
                    ? `Choose a ${props.category}`
                    : props.category
                }
              </Typography>
            </CardActionArea>
        }
      </Card>
      {
        props.isMobileMode && props.openCollapse?.type === props.category && props.openCollapse?.sectionIndex === props.sectionIndex ? <EditWorkout handleOpenCollaps={handleOpenCollaps} {...props.openCollapse} /> : null
      }
    </>
  );
}
