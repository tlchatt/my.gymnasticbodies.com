import _ from "lodash"
import moment from 'moment-timezone';

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const orderLegacyCoures = unorderedObj => {
  let orderedObj = {};
  Object.keys(unorderedObj).sort().forEach(key => orderedObj[key] = unorderedObj[key]);
  return orderedObj;
}

export const orderProgressionArray = progressionArray => {
  let orderedArray = _.orderBy(progressionArray, item => parseInt(item.exerciseNotation.substring(1)))
    .map((item, index) => {
      return {
        ...item,
        index: index
      }
    });
  return orderedArray;
}

export const getCurrentWeek = (timezone) => {
  var currentDate = moment().tz(timezone);

  var weekStart = currentDate.clone().startOf('isoWeek');

  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"));
  }
  return days;
}

export const filterWarmUps = (arr) => {

  let toRemove = ['Wrist stretches #1-4',  'Quadrupedal Warm Up', 'Ring mobility R1>iM1-8', 'Middle Split', 'Thoracic Bridge', 'Front Split'];

  let newArr = arr.filter((el) => !toRemove.includes(el));

  return newArr;
}

const API = process.env.REACT_APP_API;
export const AxiosConfig = (method, endPoint, webToken, ...args ) => {
  return {
    method: method,
    url: `${API}${endPoint}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
    ...args[0]
  }
}


export const areAllSameBool = (arr, name) => {
  const first = arr[0][name];
  return arr.every(item => item[name] === first) ? first : false;
}

// check if all items in array are the same
export const areAllSame = (arr, name) => {
  const first = arr[0][name];
  return arr.every(item => item[name] === first) ? first : 1;
}

export const idToClass = {
  59207: {
    classOrExerciseName: 'Foundation Core',
    image: 'foundation-core.jpg',
    trainingType: 'Foundation',
    orderingType: 13,
    classIdOrExerciseId: 59207
  },
  59219: {
    classOrExerciseName: 'Foundation Upper Body',
    image: "foundation-upper-body.jpg",
    trainingType: 'Foundation',
    orderingType: 13,
    classIdOrExerciseId: 59219
  },
  59213: {
    classOrExerciseName: 'Foundation Lower Body',
    image: 'foundation-lower-body.jpg',
    trainingType: 'Foundation',
    orderingType: 13,
    classIdOrExerciseId: 59213
  },
  59225: {
    classOrExerciseName: 'Handstand',
    image: 'handstand.jpg',
    trainingType: 'Skill',
    orderingType: 14,
    classIdOrExerciseId: 59225
  },
  59228: {
    classOrExerciseName: 'Movement',
    image: 'movement.jpg',
    trainingType: 'Skill',
    orderingType: 14,
    classIdOrExerciseId: 59228
  },
  60099: {
    classOrExerciseName: 'Rings',
    image: 'rings.jpg',
    trainingType: 'Skill',
    orderingType: 14,
    classIdOrExerciseId: 60099
  },
}


export const legacyNameToId = {
  'Core': 59207,
  'Upper Body': 59219,
  'Lower Body': 59213,
  'Handstand': 59225,
  'Movement': 59228,
  'Rings': 60099
}
