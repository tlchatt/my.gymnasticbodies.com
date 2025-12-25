const utilFunctions =  {
  createFollowAlongPlaylist: async ( dayView, dateKey, arrayToProccess, singleProg, preVideo, leftRightArray, roundsVideos ) => {
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
      }else{
        //PC
        return {
          video: workout.mediaId,
          sets: sets,
        }
      }

      return {
        video: workout?.videos[0]?.mediaId,
        sets: sets,
      }
    })

    let followAlongArrayPromise = [];

    workout.forEach((prog, index) => {

      if (!singleProg && !prog.videoB) {
        followAlongArrayPromise = [...followAlongArrayPromise, { file: `https://content.jwplatform.com/feeds/${preVideo[index]}.json` }];
      }

      if (prog.videoB) {
        followAlongArrayPromise = [...followAlongArrayPromise, { file: `https://content.jwplatform.com/feeds/${leftRightArray[index].a}.json` }];
      }

      [...Array(prog.sets)].forEach((_, index) => {
        followAlongArrayPromise = [...followAlongArrayPromise, { file: `https://content.jwplatform.com/feeds/${prog.video}` }]
      })

      if (prog.videoB) {
        followAlongArrayPromise = [...followAlongArrayPromise, { file: `https://content.jwplatform.com/feeds/${leftRightArray[index].b}.json` }];
        [...Array(prog.sets)].forEach((_, index) => {
          followAlongArrayPromise = [...followAlongArrayPromise, { file: `https://content.jwplatform.com/feeds/${prog.videoB}` }]
        })
      }
    });

    if (!singleProg && dayView[dateKey]) {
      let rounds = dayView[dateKey].rounds;
      let origingalArray = followAlongArrayPromise;

      [...Array(rounds)].forEach((_, index) => {

        followAlongArrayPromise = [
          ...index === 0 ? [] : followAlongArrayPromise,
          {
            file: `https://content.jwplatform.com/feeds/${roundsVideos[index]}.json`
          },
          ...origingalArray
        ];
      })
    }

    try {
      var data = await Promise.all(
        followAlongArrayPromise.map(({ file }) => fetch(file).then(async res => {
          let data = await res.json();
          let arrayOfSources = data.playlist[0].sources.filter(({ type }) => type === "video/mp4");
          return {
            sources: arrayOfSources.reverse(),
            image: data.playlist[0].image,
          }
        }))
      )
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  generateBeginnerFollowAlong: async (arrayToProccess) => {
    let followAlongArrayPromise = [];

    followAlongArrayPromise = arrayToProccess.map(prog => {
      return {
        file: `https://content.jwplatform.com/feeds/${prog.mediaId}`
      }
    })

    try {
      var data = await Promise.all(
        followAlongArrayPromise.map(({ file }) => fetch(file).then(async res => {
          let data = await res.json();
          let arrayOfSources = data.playlist[0].sources.filter(({ type }) => type === "video/mp4");
          return {
            sources: arrayOfSources.reverse(),
            image: data.playlist[0].image,
          }
        }))
      )
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  generateLevelsFollowAlong: async (arrayToProccess) => {
    let followAlongArrayPromise = [];

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
              followAlongArrayPromise = [
                ...followAlongArrayPromise,
                {
                  file: `https://content.jwplatform.com/feeds/${workoutInfo[type].videos[0].videoName}`
                }
              ]
            }
            else {
              [...Array(progSets)].forEach(() => {
                followAlongArrayPromise = [
                  ...followAlongArrayPromise,
                  {
                    file: `https://content.jwplatform.com/feeds/${workoutInfo[type].videos[0].videoName}`
                  }
                ]
              })
            }
          })
        })
      }
      else {
        followAlongArrayPromise = [
          ...followAlongArrayPromise,
          {
            file: `https://content.jwplatform.com/feeds/${prog.mediaId}`
          }
        ]
      }
    })
    try {
      let data = await Promise.all(
        followAlongArrayPromise.map(({ file }) => fetch(file).then(async res => {
          let data = await res.json();
          let arrayOfSources = data.playlist[0].sources.filter(({ type }) => type === "video/mp4");
          return {
            sources: arrayOfSources.reverse(),
            image: data.playlist[0].image,
          }
        }))
      )
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  generateIndividualWorkout: async (workout, roundsVideos, byoUserSchedule, dateKey) => {
    const mediaId = workout.mediaId;
    const rounds = byoUserSchedule[dateKey].rounds;
    let sets = 0;

    if (workout.repsOrSecs.charAt(workout.repsOrSecs.length - 1) === 's') {
      sets = parseInt(workout.repsOrSecs) / 5;
    }
    else {
      sets = parseInt(workout.repsOrSecs)
    }

    let followAlongArrayPromise = [];

    followAlongArrayPromise = [...Array(sets)].map(() => {
      return {
        file: `https://content.jwplatform.com/feeds/${mediaId}`
      }
    })

    let origingalArray = followAlongArrayPromise;

    [...Array(rounds)].forEach((_, index) => {
      // if (index === 0) {
      //   followAlongArrayPromise = [{ file: `https://content.jwplatform.com/feeds/${roundsVideos[index]}.json` }, ...origingalArray];
      // }

      followAlongArrayPromise = [
        ...index === 0 ? [] : followAlongArrayPromise,
        {
          file: `https://content.jwplatform.com/feeds/${roundsVideos[index]}.json`
        },
        ...origingalArray
      ];
    })

    try {
      let data = await Promise.all(
        followAlongArrayPromise.map(({ file }) => fetch(file).then(async res => {
          let data = await res.json();
          let arrayOfSources = data.playlist[0].sources.filter(({ type }) => type === "video/mp4");
          return {
            sources: arrayOfSources.reverse(),
            image: data.playlist[0].image,
          }
        }))
      )
      return data;
    } catch (err) {
      console.log(err);
    }
  },
}


export default utilFunctions;
