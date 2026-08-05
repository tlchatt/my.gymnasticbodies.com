import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import utilFunctions from './genVideo';

import VideoElement from '../../../VideoElement';
import { resolvePlaylist } from '../../../../lib/video';


const preVideo = ['Q3ZceB5O', '5l7lZtsw', 'y1Ves9uz', 'aoGlNem1', 'Qgf6i6Rq'];

const leftRightArray = [
  {
    a: 'J1TlD1tV',
    b: 'C27NSsu6',
  },
  {
    a: 'diFX6Eln',
    b: 'MOSN2H2H',
  },
  {
    a: 'eWwZkRa2',
    b: 'bgXNzcep',
  },
  {
    a: 'Mwa0wiUJ',
    b: 'VuoRoFnW',
  },
  {
    a: 'mLrHq1Q0',
    b: 'Z93z4hdz',
  },
]

const roundsVideos = ['dv3fDTHu', 'p27gF1IA', '3fYLcxKE', 'GSI3BdwX', 'CumrD3vW'];



const VideoPlayer = props => {
  const dayView = useSelector(state => state.freeMember.dayView);
  // const { open, singleProg, dateKey, levelsPlayer, withIcons, isBeginnerPlan} = props;
  //PC
  const { open, singleProg, dateKey, levelsPlayer = true, withIcons, isBeginnerPlan = true } = props;
  const beginnerVideos = useSelector(state => state.levels.userSchedule);
  const byoSchedule = useSelector(state => state.buildYourOwn.userSchedule);
  const [followAlongArray, setFollowAlongArray] = useState([])

  useEffect(() => {
    function getAutoPilotData() {
      let data = utilFunctions.createFollowAlongPlaylist(dayView, dateKey, singleProg ? singleProg : dayView[dateKey].exerciseListForDay, singleProg, preVideo, leftRightArray, roundsVideos);
      setFollowAlongArray(data ? data : []);
    }

    function getBeginnerFollowAlong() {

      let classesList = []
      beginnerVideos[dateKey].map((item) => {
        if (item.mediaId) {
          classesList.push({ mediaId: item.mediaId })
        } else {
          if (item.chosenProgs) {
            item.chosenProgs.map((prog) => {
              if (prog.workoutInfo) {
                for (const key in prog.workoutInfo) {
                  if (prog?.workoutInfo[key]?.videos[0]?.videoName) {
                    classesList.push({ mediaId: prog?.workoutInfo[key]?.videos[0]?.videoName })

                  }
                }
              }
            })
          }
        }
      })
      beginnerVideos[dateKey].classesList = classesList

      let data = utilFunctions.generateBeginnerFollowAlong(beginnerVideos[dateKey].classesList)

      setFollowAlongArray(data ? data : []);
    }

    function getLevelsFollowAllong() {
      let data = utilFunctions.generateLevelsFollowAlong(beginnerVideos[dateKey])
      setFollowAlongArray(data ? data : []);
    }

    function buildIndividualWorkout(prog) {
      let data = utilFunctions.generateIndividualWorkout(prog, roundsVideos, byoSchedule, dateKey)
      setFollowAlongArray(data ? data : []);
    }

    if (open) {
      if (levelsPlayer && singleProg) {
        if (singleProg[0].isIndividualVideo && singleProg[0].isBuildYourOwn) {
          buildIndividualWorkout(singleProg[0]);
        }
        else {
          // Whiteboard/AutoPilot single exercises carry their video at
          // videos[0].mediaId (JW signed-feed format), not a top-level mediaId.
          const prog = singleProg[0];
          const id = prog.mediaId || (prog.videos && prog.videos[0] && prog.videos[0].mediaId);
          setFollowAlongArray(resolvePlaylist(id))
        }
      }
      else if (levelsPlayer && !singleProg && isBeginnerPlan) {
        getBeginnerFollowAlong();
      }
      else if (levelsPlayer && !singleProg && !isBeginnerPlan) {
        getLevelsFollowAllong();
      }
      else {
        getAutoPilotData();
      }
    }
  }, [open, dayView, dateKey, singleProg, levelsPlayer, beginnerVideos, isBeginnerPlan, byoSchedule])

  useEffect(() => {
    let head = document.head;
    let link = document.createElement("link");
    if (!withIcons) {

      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = 'wihtoutIcons.css';

      head.appendChild(link);
    }
    else {
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = 'withIcons.css';
      head.appendChild(link);
    }
    return () => { head.removeChild(link); }
  }, [withIcons]);


  return (
    <>
      {
        props.open && followAlongArray.length ?
          <VideoElement playlist={followAlongArray} />
          : null
      }
    </>

  );
}

export default React.memo(VideoPlayer);
