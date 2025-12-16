import React from 'react';
import { useState, useEffect } from 'react';
import { Divider, Grid } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import CoursePreviewCards from './CoursePreviewCards';
import SectionButtons from './SectionButtons';
import IndividualCards from './IndividualCards';


const CoursePreview = (props) => {
  const { openCollapse, courseType , handleOpenCollaps} = props;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCourse, setSubCourse] = useState({});
  // eslint-disable-next-line
  const [previewCourse, setPreviewCourse] = useState({});

  const reset = () => {
    setSubCourse({})
    setPreviewCourse({})
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
    }
    else {
      setPreviewCourse(courseData);
    }
  }


  const CardType = props.cardType === 'individualWorkouts' ? IndividualCards : CoursePreviewCards;

  return (
    <Collapse in={openCollapse}>
      <Grid container justifyContent='center' style={{ padding: 12 }}>
        {
          openCollapse && courseType[props.type].showButtons
            ? courseType[props.type].buttons.map((courseTypeName, index) => {
              return (
                <SectionButtons
                  key={index}
                  isSelected={selectedCategory === courseTypeName}
                  handleButtonSelect={() => handleButtonSelect(courseTypeName)}
                  courseType={courseTypeName}
                  amountOfButtons={3}
                />
              )
            })
            : null
        }
        <Grid item xs={12} sm={12} md={12}>
          {
            props.type && !courseType[props.type].showButtons
              ? <Grid container style={{ margin: "8px 0" }}>
                {
                  courseType[props.type].courses.map((courseData, index) => {
                    return (
                      <CardType
                        key={index}
                        showPreview={() => handlePreviewSelections(courseData)}
                        noAddButton
                        isMobileView
                        catType={props.type}
                        sectionIndex={props.sectionIndex}
                        sectionType={props.cardType}
                        handleOpenCollaps={handleOpenCollaps}
                        {...courseData}
                      />
                    )
                  })
                }
              </Grid>
              : null
          }

          {
            selectedCategory.length
              ? <Grid container style={{ margin: "8px 0" }}>
                {
                  courseType[props.type][selectedCategory]?.map((courseData, index) => {
                    return (
                      <CardType
                        key={index}
                        showPreview={() => handlePreviewSelections(courseData)}
                        noAddButton
                        isMobileView
                        catType={props.type}
                        sectionIndex={props.sectionIndex}
                        sectionType={props.cardType}
                        handleOpenCollaps={handleOpenCollaps}
                        {...courseData}
                      />
                    )
                  })
                }
              </Grid>
              : null
          }
          {
            subCourse && subCourse.relatedWorkouts?.length ? <Divider style={{ backgroundColor: "#707070" }} /> : null
          }
          {
            subCourse && subCourse.relatedWorkouts?.length
              ? <Grid container style={{ margin: "8px 0" }}>
                {subCourse.relatedWorkouts.map((courseData, index) => {
                  return (
                    <CardType
                      key={index}
                      showPreview={() => handlePreviewSelections(courseData)}
                      noAddButton
                      isMobileView
                      catType={props.type}
                      sectionIndex={props.sectionIndex}
                      sectionType={props.cardType}
                      handleOpenCollaps={handleOpenCollaps}
                      {...courseData}
                    />
                  )
                })}
              </Grid>
              : null
          }
        </Grid>
      </Grid>
    </Collapse>
  )
}

export default CoursePreview;
