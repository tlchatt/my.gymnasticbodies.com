import React, { useState, useEffect } from 'react';
import ReactJWPlayer from 'react-jw-player';
import { useSelector, useDispatch } from 'react-redux';
import utilFunctions from './genVideo';

import { getNewSignedUrl } from '../../../../Store/Action/loginActions';
import { getAndCheckMedia } from '../../../../lib/commonFunctions';
import VideoComp from '../../../VideoComp';


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
  const playerSignedUrl = useSelector(state => state.login.signedUrl);
  const dayView = useSelector(state => state.freeMember.dayView);
  let postAWS = useSelector(state => state.login.postAWS);
  // const { open, singleProg, dateKey, levelsPlayer, withIcons, isBeginnerPlan} = props;
  //PC
  const { open, singleProg, dateKey, levelsPlayer = true, withIcons, isBeginnerPlan = true } = props;
  const beginnerVideos = useSelector(state => state.levels.userSchedule);
  const byoSchedule = useSelector(state => state.buildYourOwn.userSchedule);
  const [followAlongArray, setFollowAlongArray] = useState([])
  const [mediaUrl, setMediaUrl] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAutoPilotData() {
      let data = await utilFunctions.createFollowAlongPlaylist(dayView, dateKey, singleProg ? singleProg : dayView[dateKey].exerciseListForDay, singleProg, preVideo, leftRightArray, roundsVideos);
      console.log("data 1 is:", data)
      setFollowAlongArray(data ? data : []);
    }

    async function getBeginnerFollowAlong() {

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

      let data = await utilFunctions.generateBeginnerFollowAlong(beginnerVideos[dateKey].classesList)
      console.log("data 2 is:", data)
      const handleCheckMedia = async () => {
        let url = await getAndCheckMedia(data)

        setFollowAlongArray(url);
      };
      handleCheckMedia()

      setFollowAlongArray(data ? data : []);
    }

    async function getLevelsFollowAllong() {
      let data = await utilFunctions.generateLevelsFollowAlong(beginnerVideos[dateKey])
      console.log("data 3 is:", data)
      setFollowAlongArray(data ? data : []);
    }

    async function buildIndividualWorkout(prog) {
      let data = await utilFunctions.generateIndividualWorkout(prog, roundsVideos, byoSchedule, dateKey)
      console.log("data 4 is:", data)
      setFollowAlongArray(data ? data : []);
    }

    if (open) {
      if (levelsPlayer && singleProg) {
        if (singleProg[0].isIndividualVideo && singleProg[0].isBuildYourOwn) {
          buildIndividualWorkout(singleProg[0]);
        }
        else {


          // if (postAWS) {
          const handleCheckMedia = async () => {
            // const url = `https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/${videoId}.mp4`;
            let url = await getAndCheckMedia(singleProg[0].mediaId)
            // console.log("result is:", result)
            setFollowAlongArray(url);
          };

          handleCheckMedia()
          // } 
          // else {
          //   setFollowAlongArray(`https://content.jwplatform.com/feeds/${singleProg[0].mediaId}`)
          // }
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


  useEffect(() => {
    console.log("props is:", props)
    const handleCheckMedia = async () => {
      let mediaId = props?.singleProg[0]?.videos[0]?.mediaId
      if (props?.singleProg[0]?.videos?.length > 1) {
        console.error("handle it, more than one video found in singleProg")
      }
      const url = await getAndCheckMedia(mediaId);
      // console.log("result is:", result)
      if (url) setMediaUrl(url);
    };
    handleCheckMedia()
  })
  const handleOnError = (errorObj) => {
    console.log('handleOnError', errorObj.code);
  }

  const handleOnSetupError = (errorObj) => {
    console.log(errorObj.code);
    if (errorObj.code === 100013) {
      dispatch(getNewSignedUrl());
    }
  }


  console.log("followAlongArray:", followAlongArray)
  return (
    <>
      {/* {
        !postAWS && props.open && followAlongArray.length ?
          <ReactJWPlayer
            playerId='my-jwplayer'
            playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${playerSignedUrl}`}
            playlist={followAlongArray}
            customProps={{ nextUpDisplay: false }}
            onError={handleOnError}
            onSetupError={handleOnSetupError}
          />
          : null
      } */}
      {
        props.open && followAlongArray?.length && !mediaUrl ?
          <VideoComp url={followAlongArray} />
          : null
      }
      {
        props.open && mediaUrl ?
          <VideoComp url={mediaUrl} />
          : null
      }
    </>

  );
}

export default React.memo(VideoPlayer);
