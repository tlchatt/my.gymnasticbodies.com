import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, IconButton } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import CoursePreviewCards from './CoursePreviewCards';
import SectionButtons from './SectionButtons';
import CoursePreivewData from './CoursePreivewData';
import IndividualCards from './IndividualCards';
import BackIcon from './BackIcon'

const useStyles = makeStyles(theme => ({
  title: {
    padding: '12px 18px',
    color: '#FF9435',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      padding: '12px 0px',
    },
  },
  backIcon: {
    position: 'absolute',
    top: 0,
    left: '-5%',
    [theme.breakpoints.down('md')]: {
      left: '0',
    }
  }
}))

const CoursePreview = (props) => {
  const { openCollapse, courseType } = props;
  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCourse, setSubCourse] = useState({});
  const [previewCourse, setPreviewCourse] = useState({});

  const [showPreview, setShowPreview] = useState(false);
  const [showSubcourseInfo, setShowSubcourseInfo] = useState(false);

  const reset = () => {
    setSubCourse({})
    setPreviewCourse({})
    setShowPreview(false)
    setShowSubcourseInfo(false)
  }

  useEffect(() => {
    setSelectedCategory('');
    reset();
  }, [props.type])


  const handleButtonSelect = (courseTypeName) => {

    if (selectedCategory === courseTypeName) {
      setSelectedCategory('')
    }
    else {
      setSelectedCategory(courseTypeName)
    }
    reset();
  }

  const handlePreviewSelections = (courseData) => {
    if (courseData.relatedWorkouts && courseData.relatedWorkouts.length) {
      setSubCourse(courseData);
      setShowSubcourseInfo(true);
      setShowPreview(false)
    }
    else {
      setPreviewCourse(courseData);
      setShowPreview(true);

      if (showSubcourseInfo) {
        setShowSubcourseInfo(false)
      }
    }
  }

  const handleBackButton = () => {
    if (showPreview && !showSubcourseInfo) {
      setPreviewCourse({});
      setShowPreview(false);
      if (subCourse.relatedWorkouts) {
        setShowSubcourseInfo(true);
      }
    }
    if (!showPreview && showSubcourseInfo) {
      setSubCourse({});
      setShowSubcourseInfo(false);
    }
  }

  const CardType = props.cardType === 'individualWorkouts' ? IndividualCards : CoursePreviewCards;


  return (
    <>
      <Typography variant='h5' className={classes.title}>
        {
          openCollapse
            ? props.cardType === 'individualWorkouts' && !selectedCategory
              ? 'Select A Level'
              : `Choose a ${props.type}`
            : 'Click a module to add to your workout'
        }
      </Typography>
      <Collapse in={openCollapse}>
        <Grid container justifyContent='center' style={{padding: 12}}>
          {
            openCollapse && courseType[props.type].showButtons
              ? courseType[props.type].buttons.map((courseTypeName, index) => <SectionButtons
                key={index}
                isSelected={selectedCategory === courseTypeName}
                handleButtonSelect={() => handleButtonSelect(courseTypeName)}
                courseType={courseTypeName}
                amountOfButtons={courseType[props.type].buttons.length}
              />)
              : null
          }
          <Grid item xs={12} sm={12} md={10} lg={10} style={{ margin: '12px 0px 24px', position: 'relative' }}>
            {
              showPreview || showSubcourseInfo
                ? <IconButton className={classes.backIcon} onClick={handleBackButton}>
                  <BackIcon />
                </IconButton>
                : null
            }
            <Grid container>
              {
                showSubcourseInfo ? <CoursePreivewData isSubCoursePreview={showSubcourseInfo} {...subCourse} /> : null
              }
              {
                showPreview ? <CoursePreivewData {...previewCourse} /> : null
              }
              {
                openCollapse && props.type && !courseType[props.type].showButtons && !subCourse.relatedWorkouts
                  ? courseType[props.type].courses.map((courseData, index) => <CardType
                    key={index}
                    showPreview={() => handlePreviewSelections(courseData)}
                    noAddButton={courseData.relatedWorkouts || courseData.isLegacy}
                    catType={props.type}
                    sectionIndex={props.sectionIndex}
                    sectionType={props.cardType}
                    handleOpenCollaps={ props.handleOpenCollaps}
                    {...courseData}
                  />)
                  : null
              }
              {
                openCollapse && selectedCategory.length && !subCourse.relatedWorkouts
                  ? courseType[props.type][selectedCategory]?.map((courseData, index) => <CardType
                    key={index}
                    showPreview={() => handlePreviewSelections(courseData)}
                    noAddButton={courseData.relatedWorkouts || courseData.isLegacy}
                    catType={props.type}
                    sectionIndex={props.sectionIndex}
                    sectionType={props.cardType}
                    handleOpenCollaps={ props.handleOpenCollaps}
                    {...courseData}
                  />)
                  : null
              }
              {
                openCollapse && subCourse && subCourse.relatedWorkouts
                  ? subCourse.relatedWorkouts.map((courseData, index) => <CardType
                    key={index}
                    showPreview={() => handlePreviewSelections(courseData)}
                    noAddButton={courseData.relatedWorkouts || courseData.isLegacy}
                    catType={props.type}
                    sectionIndex={props.sectionIndex}
                    sectionType={props.cardType}
                    handleOpenCollaps={ props.handleOpenCollaps}
                    {...courseData}
                  />)
                  : null
              }
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}

export default CoursePreview;
