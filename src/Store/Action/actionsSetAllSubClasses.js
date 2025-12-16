import * as actionTypes from './actionTypes';


export const SetAllSubClassesInitial = (allCourses) => {
  let workOuts = []

  for (let i = 0; i < allCourses.length; i++) {
    if (allCourses[i].classInfo && allCourses[i].classInfo.workouts.length) {
      let workout = allCourses[i].classInfo.workouts;

      for (let j = 0; j < workout.length; j++) {
        workOuts.push({
          wp_postid: workout[j].wp_postid,
          image_url: workout[j].image_url,
          legacy_course: 'false',
          playerScript: '',
          parentId: allCourses[i].wp_postid ,
          classInfo: {
            dayIndexes: workout[j].dayIndexes,
            title: workout[j].title,
            description: workout[j].content,
            image_url: workout[j].image_url,
            media_id: workout[j].media_id,
            playLists: workout[j].playLists,
            relatedSubCourses: workout.map(item => item.wp_postid)
          }
        });
      }
    }
  }
  return {
    type: actionTypes.SET_ALL_SUB_CLASSES,
    subClasses: workOuts
  }
}

export const SetAllSubClasses = (data) => {
  return {
    type: actionTypes.SET_ALL_SUB_CLASSES,
    subClasses: data
  }
}
