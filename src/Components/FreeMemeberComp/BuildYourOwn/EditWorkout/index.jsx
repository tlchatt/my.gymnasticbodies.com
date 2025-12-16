import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import axios from 'axios';

import { AxiosConfig } from '../../../../Store/util';

import CategoryCard from './CategoryCard';
import VerticalText from './EditRounds/VerticalText'
import CoursePreview from './CoursePreview';

import {courseType} from './CoursePreview/data'

const useStyles = makeStyles(theme => ({
  conatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    overflowX: 'scroll'
  },
  dividerSection: {
    display: 'flex',
    flexShrink: 0
  },
  gradient: {
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
  }
}));


const EditWorkout = (props) => {
  const classes = useStyles();
  const [openCollapse, setOpenCollapse] = useState({
    type: '',
    openCollapse: false,
    cardType: ''
  });

  const buildYourOwn = useSelector(state => state.buildYourOwn);
  const webToken = useSelector(state => state.login.webToken);
  // Will need to add some kinda check to see if the user is single point
  const isSinnglePoint = useSelector(state => !state.login.isAllAccessUser);

  const {
    // hasWorkouts,
    // wokrouts,
    isMobileMode
  } = props;


  const handleOpenCollapse = (cat, cardType, sectionIndex, categoryId) => {
    if (sectionIndex === openCollapse.sectionIndex && openCollapse.cardType === cardType) {
      setOpenCollapse({
        type: '',
        openCollapse: false,
        cardType: ''
      })
    }
    else {
      axios(AxiosConfig('get', `/byo/schedule/builder/category/${categoryId}`, webToken)).then(res => {
        let courseData = courseType[cat];

        if (cat === 'Follow Along') {
          courseData = {
            ...courseData,
            ...res.data
          }
        }
        else if (cat === 'Foundation' || cat === 'Skill') {
          let legacyCourses = res.data[cat] ? res.data[cat] : [];
          legacyCourses = legacyCourses.map(item => { return { ...item, isLegacy: true } });
          courseData.courses = legacyCourses;
        }
        else if (cat === 'Push' || cat === 'Pull' || cat === 'Core' || cat === 'Legs' || cat === 'Mobility') {
          let singleProgs = res.data;
          let singleProKeys = Object.keys(singleProgs);

          singleProKeys.forEach((key, index) => {
            singleProgs[courseData.buttons[index]] = singleProgs[key];

            delete singleProgs[key];
          })

          courseData = {
            ...courseData,
            ...singleProgs
          }
        }
        else {
          courseData.courses = res.data[cat] ? res.data[cat] : []
        }

        setOpenCollapse({
          type: cat,
          openCollapse: true,
          cardType: cardType,
          sectionIndex: sectionIndex,
          courseType: {[cat] : courseData}
        });

      })
    }
  }


  return (
    <div className={clsx({ [classes.gradient]: !isMobileMode }) }>
      <div className={clsx({ [classes.conatiner]: !isMobileMode })}>
        {
          buildYourOwn.mainCourses.map((section, index) => {
            return <CategoryCard
              key={index}
              isSelected={index === openCollapse.sectionIndex && openCollapse.cardType === 'mainCourses'}
              category={section.category}
              isMobileMode={isMobileMode}
              handleOpenCollaps={() => handleOpenCollapse(section.category, 'mainCourses', index, section.categoryId)}
              openCollapse={openCollapse}
              courseData={section.hasWorkout ? section.courseData : {}}
              hasData={section.hasWorkout}
              sectionIndex={index}
              sectionType='mainCourses'
              isLegacy={section.isLegacy}
              count={section.count}
              maxCount={section.maxCount}
            />
          })
        }
        {
          isSinnglePoint
            ? null
            : <>
              <div className={clsx({
                [classes.dividerSection]: !props.isMobileMode,
                [classes.dividerSectionMobile]: props.isMobileMode
              })}
              >
                <VerticalText text='Individual exercises' isMobileMode={isMobileMode} />
              </div>
              {
                buildYourOwn.individualWorkouts.map((section, index) => {
                  return <CategoryCard
                    key={index}
                    isSelected={index === openCollapse.sectionIndex && openCollapse.cardType === 'individualWorkouts'}
                    category={section.category}
                    size={section.hasWorkout ? '' : 'sm'}
                    isMobileMode={isMobileMode}
                    handleOpenCollaps={() => handleOpenCollapse(section.category, 'individualWorkouts', index, section.categoryId)}
                    openCollapse={openCollapse}
                    sectionIndex={index}
                    sectionType='individualWorkouts'
                    count={section.count}
                    hasData={section.hasWorkout}
                    courseData={section.hasWorkout ? section.courseData : {}}
                    maxCount={section.maxCount}
                  />
                })
              }
            </>
        }


      </div>
      {
        !props.isMobileMode
          ? <CoursePreview handleOpenCollaps={() => handleOpenCollapse(openCollapse.type, openCollapse.cardType, openCollapse.sectionIndex)} {...openCollapse} />
          : null
      }
    </div>
  )

}

export default EditWorkout;
