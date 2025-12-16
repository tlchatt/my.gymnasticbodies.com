import * as actionTypes from './actionTypes';
import _ from 'lodash'


export const SetAllClassesInitial = (data) => {
  let newData = _.cloneDeep(data);
  // Checks for sub courses and updates parent course to show in class finder
  data.forEach((element, index) => {
    if (element.classInfo && element.classInfo.workouts) {
      let updatedObj = _.cloneDeep(element);
      let isInSchedule = updatedObj.classInfo.workouts.find(item => item.dayIndexes) ? true : false;

      if (isInSchedule) {
        updatedObj.mySchedule = "MySchedule"
        newData[index] = updatedObj;
      }
    }
  });
  return {
    type: actionTypes.SET_ALL_CLASSES,
    classes: newData
  }
}


export const SetAllClasses = (data) => {
  return {
    type: actionTypes.SET_ALL_CLASSES,
    classes: data
  }
}
