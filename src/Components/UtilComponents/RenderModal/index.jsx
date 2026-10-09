import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import NonLegacyModal from '../../NonLegacyModal';
import LegacyModal from '../../LegacyWorkoutModal';
import {getCalanderDate} from '../../UtilComponents/GetCurrentWeek'
import { legacyNameToId } from '../../../Store/util';

const ModalRender = (props) => {
  const [CourseInfo, setCourseInfo] = useState(props.CourseInfo);
  const orignalData = props.CourseInfo;
  const timeZone = useSelector(state => state.login.timezone);
  let modal = null;
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

  // A legacy course opens the progression modal only when Neon has its program
  // (legacyNameToId -> byo/program courseId). The Stretch Series courses (Front Split,
  // Middle Split, Thoracic Bridge) were legacy programs on AWS but are follow-along video
  // classes in Neon, so they open as a video like everywhere else, not an empty program.
  const hasNeonProgram = !!(CourseInfo && CourseInfo.classInfo
    && legacyNameToId[(CourseInfo.classInfo.title || '').replace('Foundation ', '')]);
  const isLegacyProgram = !!(CourseInfo && CourseInfo.legacy_course === "true" && hasNeonProgram);

  const isVideoCourse = !!(CourseInfo && (CourseInfo.legacy_course === "false"
    || (CourseInfo.legacy_course === "true" && !hasNeonProgram)));

  if (isVideoCourse && CourseInfo.classInfo) {
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
  else if (isLegacyProgram) {
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
