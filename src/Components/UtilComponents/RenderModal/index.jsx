import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import NonLegacyModal from '../../NonLegacyModal';
import LegacyModal from '../../LegacyWorkoutModal';
import OhNoModal from '../../OhNoModal';
import {getCalanderDate} from '../../UtilComponents/GetCurrentWeek'

const ModalRender = (props) => {
  const [CourseInfo, setCourseInfo] = useState(props.CourseInfo);
  const orignalData = props.CourseInfo;
  const timeZone = useSelector(state => state.login.timezone);
  let modal;
  let RelatedCourses;
  let MainCourses;
  let RelatedSubCourses;

  useEffect(() => {
    if (CourseInfo && CourseInfo.wp_postid !== props.CourseInfo.wp_postid) {
      setCourseInfo(props.CourseInfo)
    }
    return () => {
      if (!props.open) {
        setCourseInfo(orignalData)
      }
    }
    // eslint-disable-next-line
  }, [props.open, orignalData])

  const handleSuggestedCourse = (suggestedCourseInfo) => {
    setCourseInfo(suggestedCourseInfo);
  }

  if (CourseInfo && CourseInfo.classInfo && CourseInfo.classInfo.relatedCourses && CourseInfo.classInfo.relatedCourses.length) {
    RelatedCourses = props.courseList.filter(
      course =>
        CourseInfo.classInfo.relatedCourses.find(
          ({ wp_postid }) => course.wp_postid === wp_postid
        )
    )
  }

  if (CourseInfo && CourseInfo.classInfo && CourseInfo.classInfo.workouts && CourseInfo.classInfo.workouts.length) {
    MainCourses = props.subCourses.filter(
      course => CourseInfo.classInfo.workouts.find(
        ({ wp_postid }) => course.wp_postid === wp_postid
      )
    )
  }

  if (CourseInfo && CourseInfo.classInfo && CourseInfo.classInfo.relatedSubCourses && CourseInfo.classInfo.relatedSubCourses.length) {
    const CurrentId = CourseInfo.wp_postid;
    const relatedSubCourses = CourseInfo.classInfo.relatedSubCourses;

    RelatedSubCourses = props.subCourses.filter(
      course => relatedSubCourses.find(
        wp_postid => course.wp_postid === wp_postid && course.wp_postid !== CurrentId
      )
    )
  }

  if (CourseInfo === undefined || !CourseInfo.classInfo) {
    modal = (<OhNoModal open={props.open} handleClose={props.close}/>);
  }
  else if (CourseInfo && CourseInfo.legacy_course === "false" && CourseInfo.classInfo) {
    modal = (
      <NonLegacyModal
        open={props.open}
        close={props.close}
        courseTitle={CourseInfo.classInfo.title}
        mediaId={CourseInfo.classInfo.playLists}
        playScript={CourseInfo.playerScript}
        subText={CourseInfo.classInfo.description}
        relatedCourses={RelatedCourses}
        handleSuggestedCourse={handleSuggestedCourse}
        mainCourses={MainCourses}
        // main id is a mess due to the annoyance of the strecch series and how it is structred
        mainId={
          props.parentId
            ? props.parentId
            : orignalData.wp_postid === CourseInfo.wp_postid
              ? CourseInfo.wp_postid
              : orignalData.wp_postid === 59257
                ? CourseInfo.wp_postid
                : orignalData.wp_postid
        }
        hideForStretchMainVideo={ CourseInfo.wp_postid === 59257 }
        thisCourseId={ CourseInfo.wp_postid }
        RelatedSubCourses={RelatedSubCourses}
      />
    )
  }
  // for legacy courses
  // this is a test comment
  else if (CourseInfo.legacy_course === "true" && CourseInfo.classInfo) {
    modal = <LegacyModal courseName={CourseInfo.classInfo.title} open={props.open} close={props.close} date={ props.currentDayIndex + 1 ? getCalanderDate(timeZone)[props.currentDayIndex] : null }/>;
  }
  return modal;
}

const mapStatetoProps = state => {
  return {
    courseList: state.classes,
    subCourses: state.subClasses
  }
}

export default connect(mapStatetoProps)(ModalRender)
