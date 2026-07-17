import { toPlaylistItem } from '../../../../lib/video';

// Builds the follow-along playlists for the workout player.
//
// Previously each of these fetched every JW feed (content.jwplatform.com/feeds/{id})
// at runtime to resolve a media ID into a multi-quality MP4 `sources` array. Now that
// video is served from Vercel Blob, the id resolves directly to a single MP4 URL, so
// these are synchronous: they just map each id through toPlaylistItem(id) -> { src, poster }.
// The repeat/rounds/left-right SEQUENCING is unchanged — only the per-item value changed.
// VideoElement plays the resulting array in order, auto-advancing on `ended`.
const utilFunctions = {
  createFollowAlongPlaylist: (dayView, dateKey, arrayToProccess, singleProg, preVideo, leftRightArray, roundsVideos) => {
    const workout = arrayToProccess.map(workout => {
      let sets = 0;
      if (workout?.repsOrSecs?.charAt(workout?.repsOrSecs?.length - 1) === 's') {
        sets = parseInt(workout.repsOrSecs) / 5;
      }
      else {
        // PC - sets = parseInt(workout.repsOrSecs)
        sets = parseInt(workout.repsOrSecs ? workout.repsOrSecs : "0")
      }

      if (workout?.videos?.length > 1) {
        return {
          video: workout.videos[0].mediaId,
          videoB: workout.videos[1].mediaId,
          sets: sets,
        }
      } else {
        //PC
        return {
          video: workout.mediaId,
          sets: sets,
        }
      }
    })

    let ids = [];

    workout.forEach((prog, index) => {

      if (!singleProg && !prog.videoB) {
        ids = [...ids, preVideo[index]];
      }

      if (prog.videoB) {
        ids = [...ids, leftRightArray[index].a];
      }

      [...Array(prog.sets)].forEach(() => {
        ids = [...ids, prog.video]
      })

      if (prog.videoB) {
        ids = [...ids, leftRightArray[index].b];
        [...Array(prog.sets)].forEach(() => {
          ids = [...ids, prog.videoB]
        })
      }
    });

    if (!singleProg && dayView[dateKey]) {
      let rounds = dayView[dateKey].rounds;
      let origingalArray = ids;

      [...Array(rounds)].forEach((_, index) => {
        ids = [
          ...index === 0 ? [] : ids,
          roundsVideos[index],
          ...origingalArray
        ];
      })
    }

    return ids.map(toPlaylistItem);
  },
  generateBeginnerFollowAlong: (arrayToProccess) => {
    return arrayToProccess.map(prog => toPlaylistItem(prog.mediaId));
  },
  generateLevelsFollowAlong: (arrayToProccess) => {
    let ids = [];

    arrayToProccess.forEach(prog => {

      if (prog.isLegacy) {
        let chosenProgs = prog.chosenProgs;

        chosenProgs.forEach(chosen => {
          let workoutInfo = chosen.workoutInfo;
          let workoutInfoKeys = Object.keys(workoutInfo);
          let progSets = chosen.masterySteps[chosen.stepNo].sets;

          if (chosen.levelKey === 'LEVEL 1') {
            workoutInfoKeys = workoutInfoKeys.filter(key => key === 'Strength')
          }

          workoutInfoKeys.forEach(type => {
            if (chosen.levelKey === 'LEVEL 1') {
              ids = [...ids, workoutInfo[type].videos[0].videoName]
            }
            else {
              [...Array(progSets)].forEach(() => {
                ids = [...ids, workoutInfo[type].videos[0].videoName]
              })
            }
          })
        })
      }
      else {
        ids = [...ids, prog.mediaId]
      }
    })

    return ids.map(toPlaylistItem);
  },
  generateIndividualWorkout: (workout, roundsVideos, byoUserSchedule, dateKey) => {
    const mediaId = workout.mediaId;
    const rounds = byoUserSchedule[dateKey].rounds;
    let sets = 0;

    if (workout.repsOrSecs.charAt(workout.repsOrSecs.length - 1) === 's') {
      sets = parseInt(workout.repsOrSecs) / 5;
    }
    else {
      sets = parseInt(workout.repsOrSecs)
    }

    let ids = [...Array(sets)].map(() => mediaId);
    let origingalArray = ids;

    [...Array(rounds)].forEach((_, index) => {
      ids = [
        ...index === 0 ? [] : ids,
        roundsVideos[index],
        ...origingalArray
      ];
    })

    return ids.map(toPlaylistItem);
  },
}


export default utilFunctions;
