import axios from 'axios'
import * as Sentry from "@sentry/react";
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const API = process.env.REACT_APP_API;

const legacyNameToId = {
  'Core': 59207,
  'Upper Body': 59219,
  'Lower Body': 59213,
  'Handstand': 59225,
  'Movement': 59228,
  'Rings': 60099
}

export const OpenModal = (exerciseId) => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  const workoutType = state.legacyCourse.name;
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;
  const workoutName = state.legacyCourse.name;
  let config;

  if (isBuildYourOwn) {
    config = {
      method: 'get',
      url: `${API}/byo/settings/videos/exercise/${exerciseId}/users/${userData.UserId}?workoutType=${legacyNameToId[workoutName]}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      }
    };
  }
  else {
    config = {
      method: 'get',
      url: `${API}/workout-service/videos/exercise/${exerciseId}/users/${userData.UserId}?workoutType=${workoutType}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      }
    };
  }


  axios(config).then(res => {
    console.log("exerciseId:", exerciseId)
    console.log("res in DemoModalActions:", res)
    dispatch({ type: OPEN_MODAL, data: res.data.body })
  }).catch(error => {
    let responseData = {}
    if (exerciseId == "1") {
      responseData = {
        "Strength": {
          "name": "Bent Hollow Body Hold",
          "setsAndReps": "5x60s",
          "imageName": "FLPE1",
          "demoVideoName": "Bent Hollow Body Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1,
              "exerciseId": 1,
              "tag": 1,
              "videoName": "beTWQnnC.json?exp=1768821214576&sig=011f0e88652d2e1de65ec780f6ad2756",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Cat-Cow",
          "setsAndReps": "5x5r",
          "imageName": "FLPE1IM",
          "demoVideoName": "Cat-Cow Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 2,
              "exerciseId": 1,
              "tag": 2,
              "videoName": "D5ovGHOR.json?exp=1768821214576&sig=8c740394e8cef140549eaaf04f8fddca",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "2") {
      responseData = {
        "Strength": {
          "name": "Bent Hollow Body Rock",
          "setsAndReps": "5x60r",
          "imageName": "FLPE2",
          "demoVideoName": "Bent Hollow Body Rock Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 29,
              "exerciseId": 2,
              "tag": 1,
              "videoName": "vWwjwCfc.json?exp=1768821238705&sig=54db367f12cca5b02d7ad40e2b045e85",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Table",
          "setsAndReps": "5x30s",
          "imageName": "FLPE2IM",
          "demoVideoName": "Table Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 30,
              "exerciseId": 2,
              "tag": 2,
              "videoName": "lOYPi26v.json?exp=1768821238706&sig=993b49299d743c69ac4683280e8582aa",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "3") {
      responseData = {
        "Strength": {
          "name": "Straddle Hollow Body Hold",
          "setsAndReps": "5x60s",
          "imageName": "FLPE3",
          "demoVideoName": "Straddle Hollow Body Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 57,
              "exerciseId": 3,
              "tag": 1,
              "videoName": "9EY4bjQ4.json?exp=1768821241803&sig=a0cdc70ad50d0f628ab26fedfe00aada",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Table Rock",
          "setsAndReps": "5x5r",
          "imageName": "FLPE3IM",
          "demoVideoName": "Table Rock Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 58,
              "exerciseId": 3,
              "tag": 2,
              "videoName": "MzJ3fTPy.json?exp=1768821241803&sig=d17d4a13df78214a8c5166168c5a8593",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "4") {
      responseData = {
        "Strength": {
          "name": "Straddle Hollow Body Rock",
          "setsAndReps": "5x60r",
          "imageName": "FLPE4",
          "demoVideoName": "Straddle Hollow Body Rock Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 85,
              "exerciseId": 4,
              "tag": 1,
              "videoName": "h9RHgycp.json?exp=1768821247783&sig=b6232d14b8c5d8bc54515d38635bc1e5",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Table Inside Out",
          "setsAndReps": "5x5r",
          "imageName": "FLPE4IM",
          "demoVideoName": "Table Inside Out Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 86,
              "exerciseId": 4,
              "tag": 2,
              "videoName": "tW4zNQZ2.json?exp=1768821247784&sig=0cbaa60c1ec428fa7a4cd251c46d2189",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "5") {
      responseData = {
        "Strength": {
          "name": "Hollow Body Hold",
          "setsAndReps": "5x60s",
          "imageName": "FLPE5",
          "demoVideoName": "Hollow Body Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 113,
              "exerciseId": 5,
              "tag": 1,
              "videoName": "pZWNlEYq.json?exp=1768821250847&sig=87463afd59fcb32ee7ff06abf6a6aa46",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Bridge",
          "setsAndReps": "5x30s",
          "imageName": "FLPE5IM",
          "demoVideoName": "Shoulder Bridge Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 114,
              "exerciseId": 5,
              "tag": 2,
              "videoName": "1ek8p1EW.json?exp=1768821250847&sig=7cf751e78863649254f0821e314cd95e",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "6") {
      responseData = {
        "Strength": {
          "name": "Hollow Body Rock",
          "setsAndReps": "5x60r",
          "imageName": "FLPE6",
          "demoVideoName": "Hollow Body Rock Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 141,
              "exerciseId": 6,
              "tag": 1,
              "videoName": "5VurhvVf.json?exp=1768821254355&sig=15ccd748b5c55633f1237c73750a8f1e",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Bridge Rock",
          "setsAndReps": "5x5r",
          "imageName": "FLPE6IM",
          "demoVideoName": "Shoulder Bridge Rock Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 142,
              "exerciseId": 6,
              "tag": 2,
              "videoName": "6l7qEhX5.json?exp=1768821254355&sig=01c6779a8376068eddf4632a86cd3965",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "7") {
      responseData = {
        "Strength": {
          "name": "Scapular Shrugs",
          "setsAndReps": "5x15r",
          "imageName": "sPLPE1",
          "demoVideoName": "Scapular Shrugs Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 167,
              "exerciseId": 7,
              "tag": 1,
              "videoName": "g3VEVzG9.json?exp=1768818761213&sig=4d3c9c39eda9bd6201674f40c9328115",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Swivel Hips",
          "setsAndReps": "5x5r",
          "imageName": "sPLPE1IM",
          "demoVideoName": "Swivel Hips Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 168,
              "exerciseId": 7,
              "tag": 2,
              "videoName": "DAaTAFO3.json?exp=1768818761214&sig=638623216486866e65b96eb6f7d0e8eb",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "8") {
      responseData = {
        "Strength": {
          "name": "Forearm Plank",
          "setsAndReps": "5x60s",
          "imageName": "sPLPE2",
          "demoVideoName": "Forearm Plank Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 195,
              "exerciseId": 8,
              "tag": 1,
              "videoName": "LHjfJ0GC.json?exp=1768818767187&sig=2acdeca136fac8c5218952ae2b04b04d",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Straddle Running Man",
          "setsAndReps": "5x10r",
          "imageName": "sPLPE2IM",
          "demoVideoName": "Straddle Running Man Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 196,
              "exerciseId": 8,
              "tag": 2,
              "videoName": "MsYiM8U8.json?exp=1768818767187&sig=e5483f7c697cdb84624807df5c385182",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "9") {
      responseData = {
        "Strength": {
          "name": "Plank",
          "setsAndReps": "5x60s",
          "imageName": "sPLPE3",
          "demoVideoName": "Plank Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 223,
              "exerciseId": 9,
              "tag": 1,
              "videoName": "6bpZTxQ4.json?exp=1768818771851&sig=6e43d8b04db11a51fd1d13c480fb36ac",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Straddle Modified Reverse Hyper",
          "setsAndReps": "5x5r",
          "imageName": "sPLPE3IM",
          "demoVideoName": "Straddle Modified Reverse Hyper Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 224,
              "exerciseId": 9,
              "tag": 2,
              "videoName": "9qAI6BgJ.json?exp=1768818771851&sig=9da71587fa4ba8886edcbe6305b999b4",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "10") {
      responseData = {
        "Strength": {
          "name": "Single Arm Plank",
          "setsAndReps": "5x30s",
          "imageName": "sPLPE4",
          "demoVideoName": "Single Arm Plank Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 251,
              "exerciseId": 10,
              "tag": 1,
              "videoName": "JLu3XmNJ.json?exp=1768818777099&sig=b6be882d49ec9690ab1bf93ba412fb7c",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Straddle Donkey Kick",
          "setsAndReps": "5x10r",
          "imageName": "sPLPE4IM",
          "demoVideoName": "Straddle Donkey Kick Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 252,
              "exerciseId": 10,
              "tag": 2,
              "videoName": "gWZvkz6n.json?exp=1768818777099&sig=c407c0e55eb7c798372f03815e44e072",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "11") {
      responseData = {
        "Strength": {
          "name": "Planche Lean",
          "setsAndReps": "5x30s",
          "imageName": "sPLPE5",
          "demoVideoName": "Planche Lean Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 279,
              "exerciseId": 11,
              "tag": 1,
              "videoName": "PoZYNKOS.json?exp=1768818782503&sig=928ce018f51dddbf0352ab59c5305a18",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Half Straddle Planche Hold",
          "setsAndReps": "5x10s",
          "imageName": "sPLPE5IM",
          "demoVideoName": "Prone Half Straddle Planche Hold Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 280,
              "exerciseId": 11,
              "tag": 2,
              "videoName": "QkceuRfF.json?exp=1768818782503&sig=90c55f6daad5e997cd8707be561df7eb",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "12") {
      responseData = {
        "Strength": {
          "name": "Elevated Planche Lean",
          "setsAndReps": "5x30s",
          "imageName": "sPLPE6",
          "demoVideoName": "Elevated Planche Lean Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 307,
              "exerciseId": 12,
              "tag": 1,
              "videoName": "zsef3sS2.json?exp=1768818788622&sig=cdf8d1447f62244db944c34e94b61412",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Half Straddle Planche Single Leg Extension",
          "setsAndReps": "5x10r",
          "imageName": "sPLPE6IM",
          "demoVideoName": "Prone Half Straddle Planche Single Leg Extension Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 308,
              "exerciseId": 12,
              "tag": 2,
              "videoName": "VXkLi8v4.json?exp=1768818788622&sig=5496cd01c307c3c80c0f9843af3fae60",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "13") {
      responseData = {
        "Strength": {
          "name": "Seated Russian Twist",
          "setsAndReps": "5x30r",
          "imageName": "SLPE1",
          "demoVideoName": "Seated Russian Twist Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 333,
              "exerciseId": 13,
              "tag": 1,
              "videoName": "i79XFmvl.json?exp=1768821357019&sig=29eafb7e5802241ff69b5e8302f649f4",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Standing Hip Circle",
          "setsAndReps": "5x10r",
          "imageName": "SLPE1IM",
          "demoVideoName": "Standing Hip Circle Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 334,
              "exerciseId": 13,
              "tag": 2,
              "videoName": "RoHm6iH1.json?exp=1768821357019&sig=583f4be51a04c68f0b495fb83cab19f2",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "14") {
      responseData = {
        "Strength": {
          "name": "Elbow Side Plank Twist",
          "setsAndReps": "5x10r@",
          "imageName": "SLPE2",
          "demoVideoName": "Elbow Side Plank Twist Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 361,
              "exerciseId": 14,
              "tag": 1,
              "videoName": "93ck7miq.json?exp=1768821360469&sig=b032516817389d8c68d360f0763f6ff6",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Standing Trunk Circle",
          "setsAndReps": "5x10r",
          "imageName": "SLPE2IM",
          "demoVideoName": "Standing Trunk Circle Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 362,
              "exerciseId": 14,
              "tag": 2,
              "videoName": "ZeHTPgJE.json?exp=1768821360469&sig=7094cf0dbd35a1ed8c41c1de79d5d491",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "15") {
      responseData = {
        "Strength": {
          "name": "Side Over Arch",
          "setsAndReps": "5x10r@",
          "imageName": "SLPE3",
          "demoVideoName": "Side Over Arch Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 389,
              "exerciseId": 15,
              "tag": 1,
              "videoName": "ULM4zdC7.json?exp=1768821363839&sig=274567d82f2088d10c9dbcad2b123261",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Elbow Bounces",
          "setsAndReps": "5x10r",
          "imageName": "SLPE3IM",
          "demoVideoName": "Elbow Bounces Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 390,
              "exerciseId": 15,
              "tag": 2,
              "videoName": "6reyBMha.json?exp=1768821363839&sig=55e4f469128171083427b5bec0d4c584",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "16") {
      responseData = {
        "Strength": {
          "name": "Arch Up",
          "setsAndReps": "5x10r",
          "imageName": "SLPE4",
          "demoVideoName": "Arch Up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 417,
              "exerciseId": 16,
              "tag": 1,
              "videoName": "UNBX2EkQ.json?exp=1768821368876&sig=130ceea2728a531a3424ef0a00b527b3",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Standing Weighted Oblique Stretch",
          "setsAndReps": "5x30s",
          "imageName": "SLPE4IM",
          "demoVideoName": "Standing Weighted Oblique Stretch Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 418,
              "exerciseId": 16,
              "tag": 2,
              "videoName": "eStfEJ00.json?exp=1768821368876&sig=bd5aaa52279f9b1a85574d8fc8c0fb20",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "17") {
      responseData = {
        "Strength": {
          "name": "Twisting Arch Up",
          "setsAndReps": "5x10r@",
          "imageName": "SLPE5",
          "demoVideoName": "Twisting Arch Up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 445,
              "exerciseId": 17,
              "tag": 1,
              "videoName": "LZGCevJE.json?exp=1768821372061&sig=abf3540e20b3dab09704af7da41aee5b",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Standing Weighted Oblique Reps",
          "setsAndReps": "5x5r",
          "imageName": "SLPE5IM",
          "demoVideoName": "Standing Weighted Oblique Reps Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 446,
              "exerciseId": 17,
              "tag": 2,
              "videoName": "OROo1fPh.json?exp=1768821372062&sig=d4f14ef7998ddadda0d980c5d728cc1c",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "18") {
      responseData = {
        "Strength": {
          "name": "Circle Arch Up",
          "setsAndReps": "5x10r",
          "imageName": "SLPE6",
          "demoVideoName": "Circle Arch Up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 473,
              "exerciseId": 18,
              "tag": 1,
              "videoName": "l38Cie9X.json?exp=1768821375062&sig=a8664e356a6cc467c5671802992bffbf",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Outside Inside Outside Back",
          "setsAndReps": "5x5r",
          "imageName": "SLPE6IM",
          "demoVideoName": "Outside Inside Outside Back Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 474,
              "exerciseId": 18,
              "tag": 2,
              "videoName": "XZ26XoDf.json?exp=1768821375062&sig=1e93482ad792ed42f0dfd4591fdd1c3f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "19") {
      responseData = {
        "Strength": {
          "name": "Tuck-Up",
          "setsAndReps": "5x15r",
          "imageName": "MNPE1",
          "demoVideoName": "Tuck-Up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 501,
              "exerciseId": 19,
              "tag": 1,
              "videoName": "CKtwdizz.json?exp=1768821383002&sig=925249c5525640f74117eec0672ffcc9",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Stiff Leg Windmill",
          "setsAndReps": "5x5r",
          "imageName": "MNPE1IM",
          "demoVideoName": "Stiff Leg Windmill Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 502,
              "exerciseId": 19,
              "tag": 2,
              "videoName": "LtC8WEXn.json?exp=1768821383002&sig=dfbe63d3753c002d8cee61b4f2e935de",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "20") {
      responseData = {
        "Strength": {
          "name": "Straddle Up",
          "setsAndReps": "5x15r",
          "imageName": "MNPE2",
          "demoVideoName": "Straddle Up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 529,
              "exerciseId": 20,
              "tag": 1,
              "videoName": "RbeTzAhj.json?exp=1768821386092&sig=3992e5ab14ea3069b859d026a660cc4f",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Jefferson Curl",
          "setsAndReps": "5x5r",
          "imageName": "MNPE2IM",
          "demoVideoName": "Jefferson Curl Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 530,
              "exerciseId": 20,
              "tag": 2,
              "videoName": "bJRairkT.json?exp=1768821386092&sig=c87edcb8418fce358a37120a1673f993",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "21") {
      responseData = {
        "Strength": {
          "name": "V-Ups",
          "setsAndReps": "5x15r",
          "imageName": "MNPE3",
          "demoVideoName": "V-Ups Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 557,
              "exerciseId": 21,
              "tag": 1,
              "videoName": "zBkkVt4v.json?exp=1768821389440&sig=b27b85485e3325519a93fa665634e6b0",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Pike Lean",
          "setsAndReps": "5x30s",
          "imageName": "MNPE3IM",
          "demoVideoName": "Pike Lean Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 558,
              "exerciseId": 21,
              "tag": 2,
              "videoName": "DdpxHpC0.json?exp=1768821389440&sig=14d2b3f35ce660a6addf26006c7a6734",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "22") {
      responseData = {
        "Strength": {
          "name": "1/2 Tuck Hanging Leg Lift",
          "setsAndReps": "5x5r",
          "imageName": "MNPE4",
          "demoVideoName": "1/2 Tuck Hanging Leg Lift Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 585,
              "exerciseId": 22,
              "tag": 1,
              "videoName": "JGkPnr4Z.json?exp=1768821394353&sig=d227c570198c7e751bfe60a08588ae4f",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Standing Weighted Pike Hang",
          "setsAndReps": "5x30s",
          "imageName": "MNPE4IM",
          "demoVideoName": "Standing Weighted Pike Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 586,
              "exerciseId": 22,
              "tag": 2,
              "videoName": "rDVLhDuc.json?exp=1768821394353&sig=16f9bbacdde4301c275d01edf7d32f84",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "23") {
      responseData = {
        "Strength": {
          "name": "1/2 Hanging Leg Lift",
          "setsAndReps": "5x5r",
          "imageName": "MNPE5",
          "demoVideoName": "1/2 Hanging Leg Lift Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 609,
              "exerciseId": 23,
              "tag": 1,
              "videoName": "6bFNtnp2.json?exp=1768821397669&sig=efe3095c8dd746c04798097982b72490",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Vertical Pike Walk",
          "setsAndReps": "5x1r",
          "imageName": "MNPE5IM",
          "demoVideoName": "Vertical Pike Walk Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 610,
              "exerciseId": 23,
              "tag": 2,
              "videoName": "rgGcBnZ1.json?exp=1768821397669&sig=6673af9751cb600b875ce3af4c691a3e",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "24") {
      responseData = {
        "Strength": {
          "name": "Negative Hanging Leg Lift ",
          "setsAndReps": "5x5rx10s",
          "imageName": "MNPE6",
          "demoVideoName": "Negative Hanging Leg Lift  Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 637,
              "exerciseId": 24,
              "tag": 1,
              "videoName": "qTdWw1Zh.json?exp=1768821400965&sig=fec626928b740d1c31fb793cfae8a563",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Vertical Pike Pull",
          "setsAndReps": "5x5r",
          "imageName": "MNPE6IM",
          "demoVideoName": "Vertical Pike Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 638,
              "exerciseId": 24,
              "tag": 2,
              "videoName": "DTIsdlNA.json?exp=1768821400965&sig=c68527f25ee787cf202a98f9cee382a0",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "30") {
      responseData = {
        "Strength": {
          "name": "Incline Pushup",
          "setsAndReps": "5x15r",
          "imageName": "HBPPE1",
          "demoVideoName": "Incline Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 798,
              "exerciseId": 30,
              "tag": 1,
              "videoName": "VNAIf59d.json?exp=1768818285015&sig=d5ceae261788e1241b5881bc6ccd7904",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "German Arm Swing",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE1IM",
          "demoVideoName": "German Arm Swing Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 799,
              "exerciseId": 30,
              "tag": 2,
              "videoName": "sSwaZ69q.json?exp=1768818285015&sig=7b7d59e2f8da4c04a4e96dd75e574508",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "31") {
      responseData = {
        "Strength": {
          "name": "Pushup",
          "setsAndReps": "5x15r",
          "imageName": "HBPPE2",
          "demoVideoName": "Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 826,
              "exerciseId": 31,
              "tag": 1,
              "videoName": "N1mmYWwe.json?exp=1768818364375&sig=c91cbcfb147410d98d2b1360d0e993f9",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Xiaopeng Forward",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE2IM",
          "demoVideoName": "Xiaopeng Forward Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 827,
              "exerciseId": 31,
              "tag": 2,
              "videoName": "QT6UUPyU.json?exp=1768818364375&sig=4b653438dbb8870d5238a4f1ff2f7d1d",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "32") {
      responseData = {
        "Strength": {
          "name": "Pseudo Planche Pushup",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE3",
          "demoVideoName": "Pseudo Planche Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 854,
              "exerciseId": 32,
              "tag": 1,
              "videoName": "irjAn1yY.json?exp=1768818382737&sig=3d2619295ffbef45b5781cc1f432348e",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Xiaopeng Backward",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE3IM",
          "demoVideoName": "Xiaopeng Backward Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 855,
              "exerciseId": 32,
              "tag": 2,
              "videoName": "ShEklRnB.json?exp=1768818382737&sig=043b19cb5e9615bc6e3d9489dc7dba47",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "33") {
      responseData = {
        "Strength": {
          "name": "Bench Dip",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE4",
          "demoVideoName": "Bench Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 882,
              "exerciseId": 33,
              "tag": 1,
              "videoName": "GLst45PR.json?exp=1768818451807&sig=1709f7fb8e5fd1c0dc100b93b519e87f",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Double Arm Circle Backward",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE4IM",
          "demoVideoName": "Double Arm Circle Backward Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 883,
              "exerciseId": 33,
              "tag": 2,
              "videoName": "8M17jIOC.json?exp=1768818451807&sig=d29e805f523b3097f2bf1abeb6cfec2b",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "34") {
      responseData = {
        "Strength": {
          "name": "Negative Parallel Bar Dip",
          "setsAndReps": "5x5rx10s",
          "imageName": "HBPPE5",
          "demoVideoName": "Negative Parallel Bar Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 910,
              "exerciseId": 34,
              "tag": 1,
              "videoName": "NgEIoukA.json?exp=1768818458909&sig=e9609b46153dff563f3f45533dae7ff0",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Double Arm Circle Forward",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE5IM",
          "demoVideoName": "Double Arm Circle Forward Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 911,
              "exerciseId": 34,
              "tag": 2,
              "videoName": "pm0rMQ4t.json?exp=1768818458909&sig=c825c9494d41ac88a859f38e3a541801",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "35") {
      responseData = {
        "Strength": {
          "name": "Parallel Bar Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE6",
          "demoVideoName": "Parallel Bar Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 938,
              "exerciseId": 35,
              "tag": 1,
              "videoName": "Z9DpvqbS.json?exp=1768818463517&sig=9d3f1742430dc7bef20cdd58b5b9435e",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Single Arm Bent Cat",
          "setsAndReps": "5x30s",
          "imageName": "HBPPE6IM",
          "demoVideoName": "Single Arm Bent Cat Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 939,
              "exerciseId": 35,
              "tag": 2,
              "videoName": "lA1GTHNo.json?exp=1768818463517&sig=8d1d89a4f1592baf59cd4fb8d7c47a4d",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "36") {
      responseData = {
        "Strength": {
          "name": "Incline Row",
          "setsAndReps": "5x15r",
          "imageName": "RCPE1",
          "demoVideoName": "Incline Row Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 966,
              "exerciseId": 36,
              "tag": 1,
              "videoName": "DldFHFsr.json?exp=1768818640975&sig=2ad275e5f47e938449480db413cd0989",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "One Arm Upright Lat Lean",
          "setsAndReps": "5x15s@",
          "imageName": "RCPE1IM",
          "demoVideoName": "One Arm Upright Lat Lean Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 967,
              "exerciseId": 36,
              "tag": 2,
              "videoName": "xB76qD36.json?exp=1768818640975&sig=cf620eaddd4c32959cf4e6c37349f289",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "37") {
      responseData = {
        "Strength": {
          "name": "Ground Rows",
          "setsAndReps": "5x15r",
          "imageName": "RCPE2",
          "demoVideoName": "Ground Rows Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 994,
              "exerciseId": 37,
              "tag": 1,
              "videoName": "ORm9YMI2.json?exp=1768818647571&sig=f769e1ffaf884dba207989782018a3a9",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Sideways Lat Stretch",
          "setsAndReps": "5x15s@",
          "imageName": "RCPE2IM",
          "demoVideoName": "Bent Sideways Lat Stretch Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 995,
              "exerciseId": 37,
              "tag": 2,
              "videoName": "FpWSWxDw.json?exp=1768818647571&sig=698844ed8a99026674dee245adc1896d",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "38") {
      responseData = {
        "Strength": {
          "name": "Elevated Row",
          "setsAndReps": "5x10r",
          "imageName": "RCPE3",
          "demoVideoName": "Elevated Row Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1022,
              "exerciseId": 38,
              "tag": 1,
              "videoName": "BVNBV6zL.json?exp=1768818652229&sig=cdc43cdcada9eb335af9b1dfe7abe981",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Twisting Lat Static",
          "setsAndReps": "5x15s@",
          "imageName": "RCPE3IM",
          "demoVideoName": "Bent Twisting Lat Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1023,
              "exerciseId": 38,
              "tag": 2,
              "videoName": "vibpxgBW.json?exp=1768818652229&sig=3aff82e26fca20940bccedb7896f09b2",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "39") {
      responseData = {
        "Strength": {
          "name": "Bulgarian Row",
          "setsAndReps": "5x10r",
          "imageName": "RCPE4",
          "demoVideoName": "Bulgarian Row Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1050,
              "exerciseId": 39,
              "tag": 1,
              "videoName": "g0BC4F2b.json?exp=1768818659384&sig=46175257415074530bb6e035957dd161",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Twisting Lat Reps",
          "setsAndReps": "5x10r",
          "imageName": "RCPE4IM",
          "demoVideoName": "Bent Twisting Lat Reps Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1051,
              "exerciseId": 39,
              "tag": 2,
              "videoName": "KMPzsJNc.json?exp=1768818659384&sig=e8287ee42fac022da64bfe101ead59fb",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "40") {
      responseData = {
        "Strength": {
          "name": "Hinge Row",
          "setsAndReps": "5x5r",
          "imageName": "RCPE5",
          "demoVideoName": "Hinge Row Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1078,
              "exerciseId": 40,
              "tag": 1,
              "videoName": "gSIBwd4Y.json?exp=1768818664170&sig=3fd3a70d18cce9cc3d809fd7e497ab1f",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Overgrip Bent Lean",
          "setsAndReps": "5x30s",
          "imageName": "RCPE5IM",
          "demoVideoName": "Overgrip Bent Lean Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1079,
              "exerciseId": 40,
              "tag": 2,
              "videoName": "zCcalB7Q.json?exp=1768818664170&sig=835bae4adacf1e5eb5355d87daba77ce",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "41") {
      responseData = {
        "Strength": {
          "name": "Bent Arm Chin Hang",
          "setsAndReps": "5x30s",
          "imageName": "RCPE6",
          "demoVideoName": "Bent Arm Chin Hang Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1106,
              "exerciseId": 41,
              "tag": 1,
              "videoName": "hWKSttp8.json?exp=1768818671279&sig=82aa9842bc8e3c1fbb0437fecc8cc753",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Overgrip Bent Pull",
          "setsAndReps": "5x5r",
          "imageName": "RCPE6IM",
          "demoVideoName": "Overgrip Bent Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1107,
              "exerciseId": 41,
              "tag": 2,
              "videoName": "kI5S8npV.json?exp=1768818671279&sig=7220716af61a017033ed4f42171966aa",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "101") {
      responseData = {
        "Strength": {
          "name": "Negative Body Lever Straddle",
          "setsAndReps": "5x5rx10s",
          "imageName": "FLPE7",
          "demoVideoName": "Negative Body Lever Straddle Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1220,
              "exerciseId": 101,
              "tag": 1,
              "videoName": "a7RyMr8T.json?exp=1768821564815&sig=dd9e7c31cdc7c91b783520bd74defe8f",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Seal Rocks",
          "setsAndReps": "5x5r",
          "imageName": "FLPE7IM",
          "demoVideoName": "Seal Rocks Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1221,
              "exerciseId": 101,
              "tag": 2,
              "videoName": "M0dImtXI.json?exp=1768821564815&sig=cc1ad541e8ec11cf40737c8923a2d4c9",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "102") {
      responseData = {
        "Strength": {
          "name": "Negative Body Lever Single Leg",
          "setsAndReps": "5x5rx10s",
          "imageName": "FLPE8",
          "demoVideoName": "Negative Body Lever Single Leg Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1222,
              "exerciseId": 102,
              "tag": 1,
              "videoName": "5mUViRKw.json?exp=1768821567856&sig=27fcb9f84fcabdeb26b9a62e9719494e",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Suspended Seal",
          "setsAndReps": "5x30s",
          "imageName": "FLPE8IM",
          "demoVideoName": "Suspended Seal Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1223,
              "exerciseId": 102,
              "tag": 2,
              "videoName": "9FjSutXe.json?exp=1768821567856&sig=b94fa484f06e96303edc502b90bdab77",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "103") {
      responseData = {
        "Strength": {
          "name": "Negative Body Lever",
          "setsAndReps": "5x5rx10s",
          "imageName": "FLPE9",
          "demoVideoName": "Negative Body Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1224,
              "exerciseId": 103,
              "tag": 1,
              "videoName": "ujk1PcGh.json?exp=1768821570545&sig=1e2d942d0198b61639ff3f9765bb3166",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Seal Pushup",
          "setsAndReps": "5x5r",
          "imageName": "FLPE9IM",
          "demoVideoName": "Seal Pushup Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1225,
              "exerciseId": 103,
              "tag": 2,
              "videoName": "uQNnk3Cs.json?exp=1768821570545&sig=9f69ff4f4d1c55bb6d842c378e815aca",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "104") {
      responseData = {
        "Strength": {
          "name": "Body Lever",
          "setsAndReps": "5x5r",
          "imageName": "FLPE10",
          "demoVideoName": "Body Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1226,
              "exerciseId": 104,
              "tag": 1,
              "videoName": "lW7vQNaT.json?exp=1768821575316&sig=034cc7029c15b52e32b1da846ba64d05",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Elbow Bridge",
          "setsAndReps": "5x10s",
          "imageName": "FLPE10IM",
          "demoVideoName": "Elbow Bridge Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1227,
              "exerciseId": 104,
              "tag": 2,
              "videoName": "hYSnL0zu.json?exp=1768821575316&sig=f39b294e0b26bc8c78490f0cfba1bdd4",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "105") {
      responseData = {
        "Strength": {
          "name": "Negative Vertical Body Lever",
          "setsAndReps": "5x5rx10s",
          "imageName": "FLPE11",
          "demoVideoName": "Negative Vertical Body Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1228,
              "exerciseId": 105,
              "tag": 1,
              "videoName": "tLDEGC7R.json?exp=1768821578139&sig=6cf4ceb16c1142410934e8531ddf4bc8",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Elbow Bridge Single Leg",
          "setsAndReps": "5x10r@",
          "imageName": "FLPE11IM",
          "demoVideoName": "Elbow Bridge Single Leg Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1229,
              "exerciseId": 105,
              "tag": 2,
              "videoName": "UlQgfDO7.json?exp=1768821578139&sig=30ab24b3f3cafbbecf1710fbbe5055f0",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "106") {
      responseData = {
        "Strength": {
          "name": "Vertical Body Lever",
          "setsAndReps": "5x5r",
          "imageName": "FLPE12",
          "demoVideoName": "Vertical Body Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1230,
              "exerciseId": 106,
              "tag": 1,
              "videoName": "IWQW5es5.json?exp=1768821582108&sig=03338e8024a98a6f5d7949d524aff7ee",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Elbow Bridge Rock",
          "setsAndReps": "5x5r",
          "imageName": "FLPE12IM",
          "demoVideoName": "Elbow Bridge Rock Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1231,
              "exerciseId": 106,
              "tag": 2,
              "videoName": "lcU2rqa7.json?exp=1768821582109&sig=d8f60af6b1c82c9b027345a3dc50d88f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "107") {
      responseData = {
        "Strength": {
          "name": "Single Bar Inverted Hang",
          "setsAndReps": "5x30s",
          "imageName": "FLPE13",
          "demoVideoName": "Single Bar Inverted Hang Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1232,
              "exerciseId": 107,
              "tag": 1,
              "videoName": "9fG6cfcF.json?exp=1768821586283&sig=409ae53a7b05dc184fc863287384929a",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Low Bridge",
          "setsAndReps": "5x10s",
          "imageName": "FLPE13IM",
          "demoVideoName": "Low Bridge Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1233,
              "exerciseId": 107,
              "tag": 2,
              "videoName": "Zss86O7T.json?exp=1768821586283&sig=b64e95d9ac33acd37b9374340f8431af",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "108") {
      responseData = {
        "Strength": {
          "name": "Kip Extension",
          "setsAndReps": "5x5r",
          "imageName": "FLPE14",
          "demoVideoName": "Kip Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1234,
              "exerciseId": 108,
              "tag": 1,
              "videoName": "uORUiRt0.json?exp=1768821589327&sig=1c357dc7e2fe842750abb7207dcc5bca",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Low Bridge Single Leg",
          "setsAndReps": "5x10r@",
          "imageName": "FLPE14IM",
          "demoVideoName": "Low Bridge Single Leg Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1235,
              "exerciseId": 108,
              "tag": 2,
              "videoName": "qzn4IqXZ.json?exp=1768821589327&sig=249a73382eea172e7a4c3002a26009e8",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "109") {
      responseData = {
        "Strength": {
          "name": "Elevated Planche Bounce",
          "setsAndReps": "5x15r",
          "imageName": "sPLPE7",
          "demoVideoName": "Elevated Planche Bounce Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1236,
              "exerciseId": 109,
              "tag": 1,
              "videoName": "s4NYHkFh.json?exp=1768819494447&sig=8998ea227c9ce2e2cd7dff9a5660f928",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Half Straddle Planche Double Leg Extension",
          "setsAndReps": "5x5r",
          "imageName": "sPLPE7IM",
          "demoVideoName": "Prone Half Straddle Planche Double Leg Extension Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1237,
              "exerciseId": 109,
              "tag": 2,
              "videoName": "9j43jx5r.json?exp=1768819494447&sig=506fabd3539b75b1e3e9fa23285f0114",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "110") {
      responseData = {
        "Strength": {
          "name": "Frog Stand",
          "setsAndReps": "5x30s",
          "imageName": "sPLSE1",
          "demoVideoName": "Frog Stand Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1238,
              "exerciseId": 110,
              "tag": 1,
              "videoName": "XUlnsWgg.json?exp=1768819498870&sig=2ce87113d45d0d00a80562000d88d5ae",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Arm Half Straddle Planche Hold",
          "setsAndReps": "5x10s",
          "imageName": "sPLSE1IM",
          "demoVideoName": "Bent Arm Half Straddle Planche Hold Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1239,
              "exerciseId": 110,
              "tag": 2,
              "videoName": "ftrMcO1D.json?exp=1768819498870&sig=8f52e3607d2477e3a9dc24e28b4e3e70",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "111") {
      responseData = {
        "Strength": {
          "name": "Advanced Frog Stand",
          "setsAndReps": "5x30s",
          "imageName": "sPLSE2",
          "demoVideoName": "Advanced Frog Stand Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1240,
              "exerciseId": 111,
              "tag": 1,
              "videoName": "skC8DqH6.json?exp=1768819502205&sig=f9dd809f9015ce9e5318517dff3a65ca",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Arm Half Straddle Planche Single Leg Extensio",
          "setsAndReps": "5x10r",
          "imageName": "sPLSE2IM",
          "demoVideoName": "Bent Arm Half Straddle Planche Single Leg Extensio Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1241,
              "exerciseId": 111,
              "tag": 2,
              "videoName": "zYXHmMfK.json?exp=1768819502205&sig=041eea9c0690a4e7fe1515785e565ebf",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "112") {
      responseData = {
        "Strength": {
          "name": "Tuck Planche",
          "setsAndReps": "5x30s",
          "imageName": "sPLSE3",
          "demoVideoName": "Tuck Planche Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1242,
              "exerciseId": 112,
              "tag": 1,
              "videoName": "M1KD2W37.json?exp=1768819507435&sig=ccd54a2e003a2b4aa2fc77b92c2fa9d5",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Arm Half Straddle Planche Double Leg Extensio",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE3IM",
          "demoVideoName": "Bent Arm Half Straddle Planche Double Leg Extensio Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1243,
              "exerciseId": 112,
              "tag": 2,
              "videoName": "GdkY7Jk5.json?exp=1768819507435&sig=beacbae4f0768c548c9dc13cdca26c3b",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "113") {
      responseData = {
        "Strength": {
          "name": "Straddle Reverse Leg Lift",
          "setsAndReps": "5x10r",
          "imageName": "SLPE7",
          "demoVideoName": "Straddle Reverse Leg Lift Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1244,
              "exerciseId": 113,
              "tag": 1,
              "videoName": "YUj1VUXX.json?exp=1768821758676&sig=8869da73fb3bbaa86421b40963408fcd",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Around the World",
          "setsAndReps": "5x10r@",
          "imageName": "SLPE7IM",
          "demoVideoName": "Around the World Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1245,
              "exerciseId": 113,
              "tag": 2,
              "videoName": "uk03Q34U.json?exp=1768821758676&sig=7036519418308853a1400d75892b2de2",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "114") {
      responseData = {
        "Strength": {
          "name": "Reverse Leg Lift",
          "setsAndReps": "5x10r",
          "imageName": "SLPE8",
          "demoVideoName": "Reverse Leg Lift Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1246,
              "exerciseId": 114,
              "tag": 1,
              "videoName": "oJzsQK5D.json?exp=1768821761975&sig=cf4dc91d70daa793ec66507d4bfe79f3",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Horizontal Windmill",
          "setsAndReps": "5x10r",
          "imageName": "SLPE8IM",
          "demoVideoName": "Horizontal Windmill Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1247,
              "exerciseId": 114,
              "tag": 2,
              "videoName": "HPnUslTD.json?exp=1768821761975&sig=83203a6e133ec6a5298f48a0c68fce3f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "115") {
      responseData = {
        "Strength": {
          "name": "Stall Bar Reverse Leg Lift",
          "setsAndReps": "5x10r",
          "imageName": "SLPE9",
          "demoVideoName": "Stall Bar Reverse Leg Lift Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1248,
              "exerciseId": 115,
              "tag": 1,
              "videoName": "jEHx2o9R.json?exp=1768821765049&sig=c13e55cf0d78c87456868b0244692c1d",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "2 Forward 2 Twist",
          "setsAndReps": "5x10r",
          "imageName": "SLPE9IM",
          "demoVideoName": "2 Forward 2 Twist Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1249,
              "exerciseId": 115,
              "tag": 2,
              "videoName": "N9jWIyOt.json?exp=1768821765049&sig=9b3bfbed30f911489a8c98bc28b66da9",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "116") {
      responseData = {
        "Strength": {
          "name": "1/2 Windshield Wiper",
          "setsAndReps": "5x10r",
          "imageName": "SLPE10",
          "demoVideoName": "1/2 Windshield Wiper Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1250,
              "exerciseId": 116,
              "tag": 1,
              "videoName": "LmInn7YU.json?exp=1768821770479&sig=bdf1795c82a1a4bee5f44513f8063b52",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Hurdler Hold",
          "setsAndReps": "5x10s",
          "imageName": "SLPE10IM",
          "demoVideoName": "Bent Hurdler Hold Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1251,
              "exerciseId": 116,
              "tag": 2,
              "videoName": "UxLp5N8J.json?exp=1768821770479&sig=26291c0aabc290deca4ddbd6d0994c5a",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "117") {
      responseData = {
        "Strength": {
          "name": "Windshield Wipers",
          "setsAndReps": "5x10r",
          "imageName": "SLPE11",
          "demoVideoName": "Windshield Wipers Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1252,
              "exerciseId": 117,
              "tag": 1,
              "videoName": "nSYoB2sQ.json?exp=1768821773452&sig=634cb9834bda74fe3bf36c8449091ff1",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Hurdler Rep",
          "setsAndReps": "5x5r@",
          "imageName": "SLPE11IM",
          "demoVideoName": "Bent Hurdler Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1253,
              "exerciseId": 117,
              "tag": 2,
              "videoName": "WNbqx3wY.json?exp=1768821773452&sig=bd213afaf279f6eb1a4cc703c3bf3dab",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "118") {
      responseData = {
        "Strength": {
          "name": "Side Arch Body Hold",
          "setsAndReps": "5x30s",
          "imageName": "SLPE12",
          "demoVideoName": "Side Arch Body Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1254,
              "exerciseId": 118,
              "tag": 1,
              "videoName": "a70UZfZ0.json?exp=1768821777054&sig=fadb047972c048034476c072322c48f0",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Hurdler Twist",
          "setsAndReps": "5x5r@",
          "imageName": "SLPE12IM",
          "demoVideoName": "Bent Hurdler Twist Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1255,
              "exerciseId": 118,
              "tag": 2,
              "videoName": "PvnFgaJb.json?exp=1768821777054&sig=ac33966476a08a334ffbff7df5de79c9",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "119") {
      responseData = {
        "Strength": {
          "name": "Hanging Leg Lift ",
          "setsAndReps": "5x5r",
          "imageName": "MNPE7",
          "demoVideoName": "Hanging Leg Lift  Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1256,
              "exerciseId": 119,
              "tag": 1,
              "videoName": "hO1Vu3Gv.json?exp=1768821782785&sig=a0e2b3c49241fb4e189bf648435e9e06",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Vertical Pike Hang",
          "setsAndReps": "5x30s",
          "imageName": "MNPE7IM",
          "demoVideoName": "Vertical Pike Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1257,
              "exerciseId": 119,
              "tag": 2,
              "videoName": "ARfS2TXw.json?exp=1768821782785&sig=9d30e8bd68802871c4ab0dc575f46780",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "120") {
      responseData = {
        "Strength": {
          "name": "Undergrip Hanging Leg Lift",
          "setsAndReps": "5x5r",
          "imageName": "MNPE8",
          "demoVideoName": "Undergrip Hanging Leg Lift Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1258,
              "exerciseId": 120,
              "tag": 1,
              "videoName": "nbHXCL0L.json?exp=1768821785878&sig=4c2579561ffd154b8304b3288d99b0c5",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bench Pike Hang",
          "setsAndReps": "5x30s",
          "imageName": "MNPE8IM",
          "demoVideoName": "Bench Pike Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1259,
              "exerciseId": 120,
              "tag": 2,
              "videoName": "VpBr65rE.json?exp=1768821785878&sig=39defd00dadaa4626f2434d8ade5cac3",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "121") {
      responseData = {
        "Strength": {
          "name": "V-to-L Hanging Leg Lift",
          "setsAndReps": "5x5r",
          "imageName": "MNPE9",
          "demoVideoName": "V-to-L Hanging Leg Lift Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1260,
              "exerciseId": 121,
              "tag": 1,
              "videoName": "I1lum58D.json?exp=1768821788832&sig=2c3769941a267edb27aa8f98fd35b4d8",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bench Pike Squat",
          "setsAndReps": "5x5r",
          "imageName": "MNPE9IM",
          "demoVideoName": "Bench Pike Squat Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1261,
              "exerciseId": 121,
              "tag": 2,
              "videoName": "0DAQlBA7.json?exp=1768821788832&sig=c78495a1a0e7c48a5a4672d6887817f1",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "122") {
      responseData = {
        "Strength": {
          "name": "1/2 L-Sit",
          "setsAndReps": "5x60s",
          "imageName": "MNSE1",
          "demoVideoName": "1/2 L-Sit Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1262,
              "exerciseId": 122,
              "tag": 1,
              "videoName": "5l6usG3I.json?exp=1768821793918&sig=67d16b55400f920ecddeca9139ebdca7",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Seated Pike Lift",
          "setsAndReps": "5x5r",
          "imageName": "MNSE1IM",
          "demoVideoName": "Seated Pike Lift Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1263,
              "exerciseId": 122,
              "tag": 2,
              "videoName": "b9snkt0C.json?exp=1768821793918&sig=c8f35fa550237e3bd7a95a434b9e1c95",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "123") {
      responseData = {
        "Strength": {
          "name": "1/2 L-sit Single Leg Extension",
          "setsAndReps": "5x10r@",
          "imageName": "MNSE2",
          "demoVideoName": "1/2 L-sit Single Leg Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1264,
              "exerciseId": 123,
              "tag": 1,
              "videoName": "VPqOhRyM.json?exp=1768821797066&sig=ae872738d78ed08f340c2b01568fef21",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Seated Pike Pulses",
          "setsAndReps": "5x10r",
          "imageName": "MNSE2IM",
          "demoVideoName": "Seated Pike Pulses Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1265,
              "exerciseId": 123,
              "tag": 2,
              "videoName": "e4Umlfhl.json?exp=1768821797066&sig=fe171c9136c58f5db3d3fd66bf7b3ef1",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "124") {
      responseData = {
        "Strength": {
          "name": "1/2 L-sit Double Leg Extension",
          "setsAndReps": "5x5r",
          "imageName": "MNSE3",
          "demoVideoName": "1/2 L-sit Double Leg Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1266,
              "exerciseId": 124,
              "tag": 1,
              "videoName": "IOTUp9c2.json?exp=1768821800553&sig=207800b66c86bc3b8fa597b318acc2da",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Straddle Jefferson Curl",
          "setsAndReps": "5x5r",
          "imageName": "MNSE3IM",
          "demoVideoName": "Straddle Jefferson Curl Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1267,
              "exerciseId": 124,
              "tag": 2,
              "videoName": "DyFuhZhN.json?exp=1768821800553&sig=8fd87f9276976b1d22fd822201fafaa1",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "129") {
      responseData = {
        "Strength": {
          "name": "Single Bar Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE7",
          "demoVideoName": "Single Bar Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1288,
              "exerciseId": 129,
              "tag": 1,
              "videoName": "M75P8tL0.json?exp=1768819007882&sig=2eeb5ea0c6f942690f4bc00a4edefa35",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Static Cat",
          "setsAndReps": "5x30s",
          "imageName": "HBPPE7IM",
          "demoVideoName": "Static Cat Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1289,
              "exerciseId": 129,
              "tag": 2,
              "videoName": "b9EfOeZR.json?exp=1768819007882&sig=26612f11e16ce0d6f9d7e13afb19f69a",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "130") {
      responseData = {
        "Strength": {
          "name": "Undergrip Single Bar Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE8",
          "demoVideoName": "Undergrip Single Bar Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1290,
              "exerciseId": 130,
              "tag": 1,
              "videoName": "tlPmA3ZA.json?exp=1768819016107&sig=58312d5a3441e2555404b287fe6c65e3",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Rocking Cat",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE8IM",
          "demoVideoName": "Rocking Cat Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1291,
              "exerciseId": 130,
              "tag": 2,
              "videoName": "YrCdLv3e.json?exp=1768819016107&sig=865be2cd6179bffc591658209eb11247",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "131") {
      responseData = {
        "Strength": {
          "name": "Korean Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE9",
          "demoVideoName": "Korean Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1292,
              "exerciseId": 131,
              "tag": 1,
              "videoName": "LYMmTAXb.json?exp=1768819020675&sig=4953114d1c8460fb1acecfb69334b21c",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Reach Underneath Static",
          "setsAndReps": "5x30s",
          "imageName": "HBPPE9IM",
          "demoVideoName": "Reach Underneath Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1293,
              "exerciseId": 131,
              "tag": 2,
              "videoName": "QcyakCNe.json?exp=1768819020675&sig=0fdf8475a8b8c226c1d0cabf01653955",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "132") {
      responseData = {
        "Strength": {
          "name": "Undergrip Korean Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE10",
          "demoVideoName": "Undergrip Korean Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1294,
              "exerciseId": 132,
              "tag": 1,
              "videoName": "xQbC9tWp.json?exp=1768819031550&sig=3b19333707c9e84c40135ee74f456887",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Reach Underneath Rep",
          "setsAndReps": "5x10r@",
          "imageName": "HBPPE10IM",
          "demoVideoName": "Reach Underneath Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1295,
              "exerciseId": 132,
              "tag": 2,
              "videoName": "Q7pujDTr.json?exp=1768819031550&sig=b591f07f7cfcc71ca514e1bb4a5b3efc",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "133") {
      responseData = {
        "Strength": {
          "name": "Russian Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE11",
          "demoVideoName": "Russian Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1296,
              "exerciseId": 133,
              "tag": 1,
              "videoName": "MEraNQ2r.json?exp=1768819035841&sig=97776edab4046fa23a58d0bec130ab79",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Side Chest Static",
          "setsAndReps": "5x30s@",
          "imageName": "HBPPE11IM",
          "demoVideoName": "Prone Side Chest Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1297,
              "exerciseId": 133,
              "tag": 2,
              "videoName": "8KvfABFX.json?exp=1768819035841&sig=0f7fca9673076598b91d1f953e13b095",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "134") {
      responseData = {
        "Strength": {
          "name": "Russian L Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE12",
          "demoVideoName": "Russian L Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1298,
              "exerciseId": 134,
              "tag": 1,
              "videoName": "jofll9H1.json?exp=1768819040851&sig=f8ee1810af42949cf12716e219c9eb93",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Side Chest Rep",
          "setsAndReps": "5x10r@",
          "imageName": "HBPPE12IM",
          "demoVideoName": "Prone Side Chest Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1299,
              "exerciseId": 134,
              "tag": 2,
              "videoName": "ZbOTDr7i.json?exp=1768819040851&sig=c835ef76f864406362355b3728ddb060",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "135") {
      responseData = {
        "Strength": {
          "name": "Ring Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE13",
          "demoVideoName": "Ring Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1300,
              "exerciseId": 135,
              "tag": 1,
              "videoName": "jLWZOqGa.json?exp=1768819046730&sig=7d9675d13f370f2cf2dbe4abff8b74b9",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Capsule Static",
          "setsAndReps": "5x30s@",
          "imageName": "HBPPE13IM",
          "demoVideoName": "Prone Capsule Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1301,
              "exerciseId": 135,
              "tag": 2,
              "videoName": "TrZ8qe0F.json?exp=1768819046731&sig=b8b4f627402b3f7e38c7ae75040700f2",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "136") {
      responseData = {
        "Strength": {
          "name": "Bulgarian Ring Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE14",
          "demoVideoName": "Bulgarian Ring Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1302,
              "exerciseId": 136,
              "tag": 1,
              "videoName": "JoEOmivl.json?exp=1768819050326&sig=42e22e3c776aa211640f4618262a20a3",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Capsule Rep",
          "setsAndReps": "5x10r@",
          "imageName": "HBPPE14IM",
          "demoVideoName": "Prone Capsule Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1303,
              "exerciseId": 136,
              "tag": 2,
              "videoName": "g6w8b6Me.json?exp=1768819050326&sig=f635b8cf048572abe25f6a2a5c55bbca",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "137") {
      responseData = {
        "Strength": {
          "name": "Negative Pull-up",
          "setsAndReps": "5x5rx10s",
          "imageName": "RCPE7",
          "demoVideoName": "Negative Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1304,
              "exerciseId": 137,
              "tag": 1,
              "videoName": "ob9rG2mc.json?exp=1768819298177&sig=3fafcd3ed51f6b6b4f6173b0f3cd7435",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Undergrip Bent Lean",
          "setsAndReps": "5x30s",
          "imageName": "RCPE7IM",
          "demoVideoName": "Undergrip Bent Lean Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1305,
              "exerciseId": 137,
              "tag": 2,
              "videoName": "hBDYw3XP.json?exp=1768819298177&sig=69a12e03e697ec0eb1c852c755e252cd",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "138") {
      responseData = {
        "Strength": {
          "name": "Pull-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE8",
          "demoVideoName": "Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1306,
              "exerciseId": 138,
              "tag": 1,
              "videoName": "i7WA9Fhp.json?exp=1768819319558&sig=1ce895cae989439c4ca5a7fe7f8e1808",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Overgrip One Arm Lean",
          "setsAndReps": "5x30s@",
          "imageName": "RCPE8IM",
          "demoVideoName": "Overgrip One Arm Lean Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1307,
              "exerciseId": 138,
              "tag": 2,
              "videoName": "2g8e5z8Y.json?exp=1768819319558&sig=5dd6f386ed9a5e955519f7ea15972d59",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "139") {
      responseData = {
        "Strength": {
          "name": "L Chin-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE9",
          "demoVideoName": "L Chin-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1308,
              "exerciseId": 139,
              "tag": 1,
              "videoName": "RvioiR7F.json?exp=1768819325251&sig=fa42503db0a250fa400e9977237a67d6",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Undergrip One Arm Lean",
          "setsAndReps": "5x30s@",
          "imageName": "RCPE9IM",
          "demoVideoName": "Undergrip One Arm Lean Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1309,
              "exerciseId": 139,
              "tag": 2,
              "videoName": "dnaDSKEZ.json?exp=1768819325251&sig=69b3acd0e521ccf9e21aaa03bad563b9",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "140") {
      responseData = {
        "Strength": {
          "name": "L Pull-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE10",
          "demoVideoName": "L Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1310,
              "exerciseId": 140,
              "tag": 1,
              "videoName": "Cie6AJKb.json?exp=1768819335396&sig=e5fb663e32c9b82c4b9538b413d58586",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Overgrip One Arm Pull",
          "setsAndReps": "5x5r@",
          "imageName": "RCPE10IM",
          "demoVideoName": "Overgrip One Arm Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1311,
              "exerciseId": 140,
              "tag": 2,
              "videoName": "IEdZQjiv.json?exp=1768819335396&sig=7e1d80ccc2f0b9a3109e4d5f8e97eca4",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "141") {
      responseData = {
        "Strength": {
          "name": "Bulgarian Pull-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE11",
          "demoVideoName": "Bulgarian Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1312,
              "exerciseId": 141,
              "tag": 1,
              "videoName": "K1kuaFjQ.json?exp=1768819339061&sig=37305ed9c9b1caf89e52ab242f3f71c9",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Perpendicular Lat Static",
          "setsAndReps": "5x30s@",
          "imageName": "RCPE11IM",
          "demoVideoName": "Perpendicular Lat Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1313,
              "exerciseId": 141,
              "tag": 2,
              "videoName": "go27ydp0.json?exp=1768819339061&sig=579ba9719128966b8d3e33e14928820c",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "142") {
      responseData = {
        "Strength": {
          "name": "Bulgarian L Pull-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE12",
          "demoVideoName": "Bulgarian L Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1314,
              "exerciseId": 142,
              "tag": 1,
              "videoName": "bo3W6CKu.json?exp=1768819343083&sig=15eda9d30bf1e676a8c88966d5b19483",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Perpendicular Lat Rep",
          "setsAndReps": "5x5r@",
          "imageName": "RCPE12IM",
          "demoVideoName": "Perpendicular Lat Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1315,
              "exerciseId": 142,
              "tag": 2,
              "videoName": "cpvAxGJd.json?exp=1768819343083&sig=98cb6a21ca65137f4eb0ff38d927dbc6",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "143") {
      responseData = {
        "Strength": {
          "name": "Wide Grip Pull-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE13",
          "demoVideoName": "Wide Grip Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1316,
              "exerciseId": 143,
              "tag": 1,
              "videoName": "I10cebPn.json?exp=1768819349036&sig=2ef1a0dab0b7d17ef64eedb69efb0933",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Distraction One ",
          "setsAndReps": "5x5r@",
          "imageName": "RCPE13IM",
          "demoVideoName": "Shoulder Distraction One  Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1317,
              "exerciseId": 143,
              "tag": 2,
              "videoName": "Ic5vDX4w.json?exp=1768819349036&sig=52b922378e6dfbd6871c4ced3821c879",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "144") {
      responseData = {
        "Strength": {
          "name": "Wide Grip Behind the Neck Pull-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE14",
          "demoVideoName": "Wide Grip Behind the Neck Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1318,
              "exerciseId": 144,
              "tag": 1,
              "videoName": "zhGlm3hG.json?exp=1768819352891&sig=d5a82f42439525d47930a0c34729ed53",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Distraction Two",
          "setsAndReps": "5x5r@",
          "imageName": "RCPE14IM",
          "demoVideoName": "Shoulder Distraction Two Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1319,
              "exerciseId": 144,
              "tag": 2,
              "videoName": "86rwMHUM.json?exp=1768819352891&sig=760ac2eb4f7b7d7f92b6fc9f63fd1218",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "145") {
      responseData = {
        "Strength": {
          "name": "Negative Front Pull",
          "setsAndReps": "5x5r",
          "imageName": "FLPE15",
          "demoVideoName": "Negative Front Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1320,
              "exerciseId": 145,
              "tag": 1,
              "videoName": "WqjC0k0Q.json?exp=1768822030449&sig=b8fcc927a270121bdadb6c5e127c5c4b",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Low Bridge Rock",
          "setsAndReps": "5x5r",
          "imageName": "FLPE15IM",
          "demoVideoName": "Low Bridge Rock Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1321,
              "exerciseId": 145,
              "tag": 2,
              "videoName": "e4ipIMCU.json?exp=1768822030449&sig=0e56efdd4ceadc92b6e4aa6cf56be88a",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "146") {
      responseData = {
        "Strength": {
          "name": "Front Pull",
          "setsAndReps": "5x5r",
          "imageName": "FLPE16",
          "demoVideoName": "Front Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1322,
              "exerciseId": 146,
              "tag": 1,
              "videoName": "r2mGmxLp.json?exp=1768822035354&sig=0a0e5ac883b7ad1f8487e011dda4a9b8",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Low Bridge Inside Out",
          "setsAndReps": "5x1r",
          "imageName": "FLPE16IM",
          "demoVideoName": "Low Bridge Inside Out Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1323,
              "exerciseId": 146,
              "tag": 2,
              "videoName": "sYlp7Wgb.json?exp=1768822035354&sig=f72b58c5a841c11391b7fe423d803ad2",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "147") {
      responseData = {
        "Strength": {
          "name": "Open Front Lever",
          "setsAndReps": "5x30s",
          "imageName": "FLSE1",
          "demoVideoName": "Open Front Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1324,
              "exerciseId": 147,
              "tag": 1,
              "videoName": "LG0Q8kIS.json?exp=1768822041109&sig=102d55b8711eabbaaa6285d1ac6e7dd5",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Mid Bridge",
          "setsAndReps": "5x10s",
          "imageName": "FLSE1IM",
          "demoVideoName": "Mid Bridge Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1325,
              "exerciseId": 147,
              "tag": 2,
              "videoName": "ogunLAFL.json?exp=1768822041109&sig=da62c99e161e33fe1dd5f003895a5e3a",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "148") {
      responseData = {
        "Strength": {
          "name": "Open Front Lever Bent Single Leg",
          "setsAndReps": "5x10r",
          "imageName": "FLSE2",
          "demoVideoName": "Open Front Lever Bent Single Leg Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1326,
              "exerciseId": 148,
              "tag": 1,
              "videoName": "Uf9rvtQP.json?exp=1768822050902&sig=311b4060ffaa2396e8a0494895464b09",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Mid Bridge Single Leg",
          "setsAndReps": "5x10r",
          "imageName": "FLSE2IM",
          "demoVideoName": "Mid Bridge Single Leg Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1327,
              "exerciseId": 148,
              "tag": 2,
              "videoName": "o2GN21d5.json?exp=1768822050902&sig=6e90abcdb244fa5fb3d452cb342dfe04",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "149") {
      responseData = {
        "Strength": {
          "name": "Open Front Lever Bent Double Leg",
          "setsAndReps": "5x5r",
          "imageName": "FLSE3",
          "demoVideoName": "Open Front Lever Bent Double Leg Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1328,
              "exerciseId": 149,
              "tag": 1,
              "videoName": "3PytA8JH.json?exp=1768822054288&sig=c512bbd9524fe831bbbe3dff4babe1f4",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Mid Bridge Rock",
          "setsAndReps": "5x5r",
          "imageName": "FLSE3IM",
          "demoVideoName": "Mid Bridge Rock Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1329,
              "exerciseId": 149,
              "tag": 2,
              "videoName": "UHUTgUkf.json?exp=1768822054288&sig=5e03aeb8c5822891166ee81c11b7697c",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "150") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle Front Lever",
          "setsAndReps": "5x10s",
          "imageName": "FLSE4",
          "demoVideoName": "1/2 Straddle Front Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1330,
              "exerciseId": 150,
              "tag": 1,
              "videoName": "NnhQz2ha.json?exp=1768822058893&sig=59f6df9f3af849d831321140fc5a4b67",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Mid Bridge Inside Out",
          "setsAndReps": "5x1r",
          "imageName": "FLSE4IM",
          "demoVideoName": "Mid Bridge Inside Out Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1331,
              "exerciseId": 150,
              "tag": 2,
              "videoName": "aAn79P1e.json?exp=1768822058893&sig=bcd8a10341c1a26ac53f7eaf2b29f1ee",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "151") {
      responseData = {
        "Strength": {
          "name": "Open Planche",
          "setsAndReps": "5x30s",
          "imageName": "sPLSE4",
          "demoVideoName": "Open Planche Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1332,
              "exerciseId": 151,
              "tag": 1,
              "videoName": "exTjsEnD.json?exp=1768820192398&sig=4a685a2bd6ef0c4a02b4184ab9310061",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Arm Straddle Planche Single Leg Hold",
          "setsAndReps": "5x10r",
          "imageName": "sPLSE4IM",
          "demoVideoName": "Bent Arm Straddle Planche Single Leg Hold Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1333,
              "exerciseId": 151,
              "tag": 2,
              "videoName": "61jzC7aK.json?exp=1768820192398&sig=29473f53eedb0865691ed34f282a6a16",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "152") {
      responseData = {
        "Strength": {
          "name": "Open Planche Single Leg Extension",
          "setsAndReps": "5x10r",
          "imageName": "sPLSE5",
          "demoVideoName": "Open Planche Single Leg Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1334,
              "exerciseId": 152,
              "tag": 1,
              "videoName": "KBSe1Ovc.json?exp=1768820197870&sig=b3cad9dac00631937480276f4fe6ca1f",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Arm Straddle Planche",
          "setsAndReps": "5x10s",
          "imageName": "sPLSE5IM",
          "demoVideoName": "Bent Arm Straddle Planche Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1335,
              "exerciseId": 152,
              "tag": 2,
              "videoName": "n7VXCMP9.json?exp=1768820197870&sig=17d87c12cf049c53490598ca378cbeb8",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "153") {
      responseData = {
        "Strength": {
          "name": "Open Planche Double Leg Extension",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE6",
          "demoVideoName": "Open Planche Double Leg Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1336,
              "exerciseId": 153,
              "tag": 1,
              "videoName": "AWSy0euO.json?exp=1768820201235&sig=dfcdddd67a3ef9b3474711aa0fa9fae6",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "SAC 1",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE6IM",
          "demoVideoName": "SAC 1 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1337,
              "exerciseId": 153,
              "tag": 2,
              "videoName": "JN1f3Sb9.json?exp=1768820201235&sig=8ecd695ca29c75d28defc93f76080020",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "154") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle Planche",
          "setsAndReps": "5x10s",
          "imageName": "sPLSE7",
          "demoVideoName": "1/2 Straddle Planche Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1338,
              "exerciseId": 154,
              "tag": 1,
              "videoName": "FZy8woIc.json?exp=1768820205978&sig=dfa66a7a1d7ef5efbffabfbcc974e242",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "SAC 2",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE7IM",
          "demoVideoName": "SAC 2 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1339,
              "exerciseId": 154,
              "tag": 2,
              "videoName": "vxrrUbF5.json?exp=1768820205978&sig=8bb9fd4b2e0dd48bfe6791d1c6890291",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "155") {
      responseData = {
        "Strength": {
          "name": "Side Arch Body Rock",
          "setsAndReps": "5x30r",
          "imageName": "SLPE13",
          "demoVideoName": "Side Arch Body Rock Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1340,
              "exerciseId": 155,
              "tag": 1,
              "videoName": "xVqyQBI0.json?exp=1768822237025&sig=d0867a6662a418537647572fdadfc2c8",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Hurdler Static",
          "setsAndReps": "5x10s",
          "imageName": "SLPE13IM",
          "demoVideoName": "Hurdler Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1341,
              "exerciseId": 155,
              "tag": 2,
              "videoName": "UQaQw6Mx.json?exp=1768822237025&sig=458543bbe2fe49261f078c7e3a9302f5",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "156") {
      responseData = {
        "Strength": {
          "name": "Arch Body Hold",
          "setsAndReps": "5x60s",
          "imageName": "SLPE14",
          "demoVideoName": "Arch Body Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1342,
              "exerciseId": 156,
              "tag": 1,
              "videoName": "jxMcdCWW.json?exp=1768822244478&sig=43303f2bcd58c9fa2e51c72a6ac312d6",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Hurdler Rep",
          "setsAndReps": "5x10r",
          "imageName": "SLPE14IM",
          "demoVideoName": "Hurdler Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1343,
              "exerciseId": 156,
              "tag": 2,
              "videoName": "OAOIRUOq.json?exp=1768822244478&sig=e2d78240917b82d0cad3cd17da1f8c46",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "157") {
      responseData = {
        "Strength": {
          "name": "Arch Body Rock",
          "setsAndReps": "5x60r",
          "imageName": "SLPE15",
          "demoVideoName": "Arch Body Rock Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1344,
              "exerciseId": 157,
              "tag": 1,
              "videoName": "Cjl5kKzx.json?exp=1768822247924&sig=89d87ae18b0c3452df7faa2e96d272a1",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Hurdler Twist",
          "setsAndReps": "5x5r",
          "imageName": "SLPE15IM",
          "demoVideoName": "Hurdler Twist Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1345,
              "exerciseId": 157,
              "tag": 2,
              "videoName": "TlJA6pPs.json?exp=1768822247924&sig=c524311946b298e2bfaf612db4e0e774",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "158") {
      responseData = {
        "Strength": {
          "name": "Side Lever Block",
          "setsAndReps": "5x30s",
          "imageName": "SLSE1",
          "demoVideoName": "Side Lever Block Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1346,
              "exerciseId": 158,
              "tag": 1,
              "videoName": "YrnWfXcC.json?exp=1768822252998&sig=396abec6ebd989fb9666706d3f38be99",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Pancake Static",
          "setsAndReps": "5x10s",
          "imageName": "SLSE1IM",
          "demoVideoName": "Bent Pancake Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1347,
              "exerciseId": 158,
              "tag": 2,
              "videoName": "uG72YRkn.json?exp=1768822252998&sig=e26491136cb68c4af36d066da6c3ec0e",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "159") {
      responseData = {
        "Strength": {
          "name": "Side Lever Block Twist",
          "setsAndReps": "5x5r",
          "imageName": "SLSE2",
          "demoVideoName": "Side Lever Block Twist Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1348,
              "exerciseId": 159,
              "tag": 1,
              "videoName": "wDbG0trg.json?exp=1768822256698&sig=114294c2cdf747ae39a7d2ab4f3bc16c",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Pancake Rep",
          "setsAndReps": "5x10r",
          "imageName": "SLSE2IM",
          "demoVideoName": "Bent Pancake Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1349,
              "exerciseId": 159,
              "tag": 2,
              "videoName": "sS4fPfw4.json?exp=1768822256698&sig=5d2ee9cb64aaac9c3eb7f69725189581",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "160") {
      responseData = {
        "Strength": {
          "name": "Side Lever Block Press",
          "setsAndReps": "5x5r",
          "imageName": "SLSE3",
          "demoVideoName": "Side Lever Block Press Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1350,
              "exerciseId": 160,
              "tag": 1,
              "videoName": "8oHcf4hr.json?exp=1768822261642&sig=b00806fb1dfe1f0310f5d8f34209a0dc",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Pancake Twist",
          "setsAndReps": "5x5r",
          "imageName": "SLSE3IM",
          "demoVideoName": "Bent Pancake Twist Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1351,
              "exerciseId": 160,
              "tag": 2,
              "videoName": "V0Kx54gA.json?exp=1768822261642&sig=923ab42f08223a913d15ac22bead53d0",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "161") {
      responseData = {
        "Strength": {
          "name": "L-sit Scissors",
          "setsAndReps": "5x5r",
          "imageName": "MNSE4",
          "demoVideoName": "L-sit Scissors Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1352,
              "exerciseId": 161,
              "tag": 1,
              "videoName": "P6NKNnal.json?exp=1768822374025&sig=f9a96d8c3f01b552c56223dc5a1c6f99",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Standing Weighted Straddle Hang",
          "setsAndReps": "5x30s",
          "imageName": "MNSE4IM",
          "demoVideoName": "Standing Weighted Straddle Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1353,
              "exerciseId": 161,
              "tag": 2,
              "videoName": "FFojs3hQ.json?exp=1768822374025&sig=f81164c4f22999d3bc860e0057587ae8",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "162") {
      responseData = {
        "Strength": {
          "name": "L-Sit",
          "setsAndReps": "5x30s",
          "imageName": "MNSE5",
          "demoVideoName": "L-Sit Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1354,
              "exerciseId": 162,
              "tag": 1,
              "videoName": "AwdPTIWk.json?exp=1768822376930&sig=5e160b5dd37ce4337d9833f1965c4859",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Straddle Lean",
          "setsAndReps": "5x30s",
          "imageName": "MNSE5IM",
          "demoVideoName": "Straddle Lean Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1355,
              "exerciseId": 162,
              "tag": 2,
              "videoName": "6G3elJuM.json?exp=1768822376930&sig=75537666bacf2a080730056e3ae6e2de",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "163") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle L",
          "setsAndReps": "5x30s",
          "imageName": "MNSE6",
          "demoVideoName": "1/2 Straddle L Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1356,
              "exerciseId": 163,
              "tag": 1,
              "videoName": "TNmwgjQe.json?exp=1768822379841&sig=05d32c5f7de5db8195cefbe4e6c5b031",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Vertical Straddle Walk",
          "setsAndReps": "5x1r",
          "imageName": "MNSE6IM",
          "demoVideoName": "Vertical Straddle Walk Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1357,
              "exerciseId": 163,
              "tag": 2,
              "videoName": "7PMR5VOE.json?exp=1768822379841&sig=1c7ef10064c50c6fc5919331c0aacd2a",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "164") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle L Single Extension",
          "setsAndReps": "5x10r",
          "imageName": "MNSE7",
          "demoVideoName": "1/2 Straddle L Single Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1358,
              "exerciseId": 164,
              "tag": 1,
              "videoName": "rhRfOBfj.json?exp=1768822384054&sig=554aaabbc024bd3cc0dede9fa434e65b",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Vertical Straddle Pull",
          "setsAndReps": "5x5r",
          "imageName": "MNSE7IM",
          "demoVideoName": "Vertical Straddle Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1359,
              "exerciseId": 164,
              "tag": 2,
              "videoName": "g1NWRXl4.json?exp=1768822384054&sig=d1b8d5804c3e978b6519b803a4eb2139",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "165") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle L Double Extension",
          "setsAndReps": "5x5r",
          "imageName": "MNSE8",
          "demoVideoName": "1/2 Straddle L Double Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1360,
              "exerciseId": 165,
              "tag": 1,
              "videoName": "jasPS8qu.json?exp=1768822386770&sig=7e6ef505da4a907f3f22a02746a55cb4",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Vertical Straddle Hang",
          "setsAndReps": "5x30s",
          "imageName": "MNSE8IM",
          "demoVideoName": "Vertical Straddle Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1361,
              "exerciseId": 165,
              "tag": 2,
              "videoName": "aMVqXoRN.json?exp=1768822386770&sig=7c10a2441114303be4a94d1334bf7c17",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "166") {
      responseData = {
        "Strength": {
          "name": "Straddle L",
          "setsAndReps": "5x30s",
          "imageName": "MNSE9",
          "demoVideoName": "Straddle L Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1362,
              "exerciseId": 166,
              "tag": 1,
              "videoName": "uuW7W9NZ.json?exp=1768822394953&sig=a3e8d3d9eb32392554a4386e428f013d",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Seated Straddle Lift",
          "setsAndReps": "5x5r",
          "imageName": "MNSE9IM",
          "demoVideoName": "Seated Straddle Lift Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1363,
              "exerciseId": 166,
              "tag": 2,
              "videoName": "iEU8JFr7.json?exp=1768822394953&sig=be73c0de91c1a29183b9165120d05eed",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "169") {
      responseData = {
        "Strength": {
          "name": "Box Headstand Pushup",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE15",
          "demoVideoName": "Box Headstand Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1368,
              "exerciseId": 169,
              "tag": 1,
              "videoName": "NpBqo6Gj.json?exp=1768819761196&sig=fc08db02455c4fe4030da3c941599aac",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Arm Prone Static",
          "setsAndReps": "5x30s",
          "imageName": "HBPPE15IM",
          "demoVideoName": "Bent Arm Prone Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1369,
              "exerciseId": 169,
              "tag": 2,
              "videoName": "K7dcdH4D.json?exp=1768819761196&sig=a1f48082afd44b431a65b1a351437219",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "170") {
      responseData = {
        "Strength": {
          "name": "Negative Headstand Pushup",
          "setsAndReps": "5x5rx10s",
          "imageName": "HBPPE16",
          "demoVideoName": "Negative Headstand Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1370,
              "exerciseId": 170,
              "tag": 1,
              "videoName": "txiH6aFx.json?exp=1768819767181&sig=d43dd7e24c1dd25506d45c00d7d41c48",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bent Arm Prone Rep",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE16IM",
          "demoVideoName": "Bent Arm Prone Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1371,
              "exerciseId": 170,
              "tag": 2,
              "videoName": "V8oBI4Ly.json?exp=1768819767181&sig=0233cba5fedfaa4de1044ee2e8005967",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "171") {
      responseData = {
        "Strength": {
          "name": "Free HeSPU",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE17",
          "demoVideoName": "Free HeSPU Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1372,
              "exerciseId": 171,
              "tag": 1,
              "videoName": "3QwLhoBi.json?exp=1768819770231&sig=b9b7683a8d61da0815813efc9a75e200",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Clasped Static",
          "setsAndReps": "5x30s",
          "imageName": "HBPPE17IM",
          "demoVideoName": "Clasped Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1373,
              "exerciseId": 171,
              "tag": 2,
              "videoName": "46i28FOg.json?exp=1768819770231&sig=7f541f2e8c93bac97b78b05f6f7f877f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "172") {
      responseData = {
        "Strength": {
          "name": "Elevated Headstand Pushup",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE18",
          "demoVideoName": "Elevated Headstand Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1374,
              "exerciseId": 172,
              "tag": 1,
              "videoName": "aUECXnzA.json?exp=1768819776027&sig=7bc740a61060a09eeedddf6043ee541f",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Clasped Rep",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE18IM",
          "demoVideoName": "Clasped Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1375,
              "exerciseId": 172,
              "tag": 2,
              "videoName": "SxnpAyXr.json?exp=1768819776027&sig=857cfd2a3a7ee1fcdaab48b3eb42ebab",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "173") {
      responseData = {
        "Strength": {
          "name": "Wall Handstand Pushup",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE19",
          "demoVideoName": "Wall Handstand Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1376,
              "exerciseId": 173,
              "tag": 1,
              "videoName": "SIyUYZ2r.json?exp=1768819779791&sig=65a876cdd0a6103975257c53193469bf",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Chicken Wing Static",
          "setsAndReps": "5x30s",
          "imageName": "HBPPE19IM",
          "demoVideoName": "Chicken Wing Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1377,
              "exerciseId": 173,
              "tag": 2,
              "videoName": "Xdw8Ud64.json?exp=1768819779791&sig=9dc19ae628eefe10db4163824116319f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "174") {
      responseData = {
        "Strength": {
          "name": "Pseudo Planche Pushup +",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE20",
          "demoVideoName": "Pseudo Planche Pushup + Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1378,
              "exerciseId": 174,
              "tag": 1,
              "videoName": "Irg0pasR.json?exp=1768819784177&sig=b263d7fc04a48e5580c36a5c2478caaf",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Chicken Wing Rep",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE20IM",
          "demoVideoName": "Chicken Wing Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1379,
              "exerciseId": 174,
              "tag": 2,
              "videoName": "olsxnjSU.json?exp=1768819784178&sig=843513858bd87dc1a393c1325f893e58",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "175") {
      responseData = {
        "Strength": {
          "name": "Planche Dip",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE21",
          "demoVideoName": "Planche Dip Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1380,
              "exerciseId": 175,
              "tag": 1,
              "videoName": "pWm5aYte.json?exp=1768819789519&sig=83cf0fb5151344f28c6156892e1b0623",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Vertical Chicken Static",
          "setsAndReps": "5x30s",
          "imageName": "HBPPE21IM",
          "demoVideoName": "Vertical Chicken Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1381,
              "exerciseId": 175,
              "tag": 2,
              "videoName": "wBmGczUW.json?exp=1768819789519&sig=a71bc6c0a66e365578ec4e6b1425cc21",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "176") {
      responseData = {
        "Strength": {
          "name": "Modified Planche Pushup",
          "setsAndReps": "5x5r",
          "imageName": "HBPPE22",
          "demoVideoName": "Modified Planche Pushup Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1382,
              "exerciseId": 176,
              "tag": 1,
              "videoName": "F2ZeDAEk.json?exp=1768819794242&sig=d0a674e3843efa472a75baeeb4ff269b",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Retraction One",
          "setsAndReps": "5x10r",
          "imageName": "HBPPE22IM",
          "demoVideoName": "Prone Retraction One Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1383,
              "exerciseId": 176,
              "tag": 2,
              "videoName": "aGqfiOYD.json?exp=1768819794242&sig=6a98c0bf6e139d670c3eaedb8e643159",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "177") {
      responseData = {
        "Strength": {
          "name": "Wide Grip L Pull-up",
          "setsAndReps": "5x5r",
          "imageName": "RCPE15",
          "demoVideoName": "Wide Grip L Pull-up Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1384,
              "exerciseId": 177,
              "tag": 1,
              "videoName": "a9dRx2DT.json?exp=1768819966436&sig=f4438c5886d8d55a6cfc9921a62442d3",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Distraction Three",
          "setsAndReps": "5x5r",
          "imageName": "RCPE15IM",
          "demoVideoName": "Shoulder Distraction Three Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1385,
              "exerciseId": 177,
              "tag": 2,
              "videoName": "wgJ8ZHcw.json?exp=1768819966436&sig=4f23c1cb88ee7be43303b46404c6047b",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "178") {
      responseData = {
        "Strength": {
          "name": "Pullover",
          "setsAndReps": "5x5r",
          "imageName": "RCPE16",
          "demoVideoName": "Pullover Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1386,
              "exerciseId": 178,
              "tag": 1,
              "videoName": "0Ec4kPem.json?exp=1768819986332&sig=918a95229df691f42f0ae89f0a528c2d",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Distraction Four",
          "setsAndReps": "5x5r",
          "imageName": "RCPE16IM",
          "demoVideoName": "Shoulder Distraction Four Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1387,
              "exerciseId": 178,
              "tag": 2,
              "videoName": "cNQmdcXj.json?exp=1768819986332&sig=279a72902551a0847f5f635740210466",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "179") {
      responseData = {
        "Strength": {
          "name": "Naners",
          "setsAndReps": "5x5r",
          "imageName": "RCPE17",
          "demoVideoName": "Naners Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1388,
              "exerciseId": 179,
              "tag": 1,
              "videoName": "mtWOaNfA.json?exp=1768819990771&sig=cc7161beb76000a26362b10d4e59fd37",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "ST Lat 1",
          "setsAndReps": "5x30s",
          "imageName": "RCPE17IM",
          "demoVideoName": "ST Lat 1 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1389,
              "exerciseId": 179,
              "tag": 2,
              "videoName": "5FGLn5f4.json?exp=1768819990771&sig=99d0938b1ed601040bb52f3cb2519da9",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "180") {
      responseData = {
        "Strength": {
          "name": "TOPS Pull",
          "setsAndReps": "5x5r",
          "imageName": "RCPE18",
          "demoVideoName": "TOPS Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1390,
              "exerciseId": 180,
              "tag": 1,
              "videoName": "mHzo8trA.json?exp=1768819995906&sig=58a2160ebd6f76293b0d007b96f6ccd9",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "ST Lat 2",
          "setsAndReps": "5x10r",
          "imageName": "RCPE18IM",
          "demoVideoName": "ST Lat 2 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1391,
              "exerciseId": 180,
              "tag": 2,
              "videoName": "t69SRafX.json?exp=1768819995906&sig=eb23ed802b2dde5bed80408f60eb8bb5",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "181") {
      responseData = {
        "Strength": {
          "name": "Yewkis",
          "setsAndReps": "5x5r",
          "imageName": "RCPE19",
          "demoVideoName": "Yewkis Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1392,
              "exerciseId": 181,
              "tag": 1,
              "videoName": "tlU8OPFq.json?exp=1768819999516&sig=678895a3546b57dd2e8134b472bcc0b6",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "ST Lat 3",
          "setsAndReps": "5x30s",
          "imageName": "RCPE19IM",
          "demoVideoName": "ST Lat 3 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1393,
              "exerciseId": 181,
              "tag": 2,
              "videoName": "92uIrgJ1.json?exp=1768819999516&sig=3a5b84dc0bfe271f0c73531751b5c8a4",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "182") {
      responseData = {
        "Strength": {
          "name": "1/2 Front Lever Pull",
          "setsAndReps": "5x5r",
          "imageName": "RCPE20",
          "demoVideoName": "1/2 Front Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1394,
              "exerciseId": 182,
              "tag": 1,
              "videoName": "Q7mDAqna.json?exp=1768820005558&sig=b9156f197e4e145b4efaacd35095db3a",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "ST Lat 4",
          "setsAndReps": "5x5r",
          "imageName": "RCPE20IM",
          "demoVideoName": "ST Lat 4 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1395,
              "exerciseId": 182,
              "tag": 2,
              "videoName": "pyEZN9IM.json?exp=1768820005558&sig=3cb1debf34db5026e64d39de18a2b1ae",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "183") {
      responseData = {
        "Strength": {
          "name": "Front Lever Pull",
          "setsAndReps": "5x5r",
          "imageName": "RCPE21",
          "demoVideoName": "Front Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1396,
              "exerciseId": 183,
              "tag": 1,
              "videoName": "8TUFMv9b.json?exp=1768820009330&sig=fafe19f86c07a567332eca5a03099615",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Undergrip Hang",
          "setsAndReps": "5x30s",
          "imageName": "RCPE21IM",
          "demoVideoName": "Undergrip Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1397,
              "exerciseId": 183,
              "tag": 2,
              "videoName": "3fK73Lap.json?exp=1768820009330&sig=b1cf60eb4de29ac5f1174e4814a19767",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "184") {
      responseData = {
        "Strength": {
          "name": "Circle Front Lever Pull",
          "setsAndReps": "5x10r",
          "imageName": "RCPE22",
          "demoVideoName": "Circle Front Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1398,
              "exerciseId": 184,
              "tag": 1,
              "videoName": "bELWl4ju.json?exp=1768820013517&sig=287da3ee35795f94fa501e1553903a5b",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "One Arm Overgrip Hang",
          "setsAndReps": "5x30s",
          "imageName": "RCPE22IM",
          "demoVideoName": "One Arm Overgrip Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1399,
              "exerciseId": 184,
              "tag": 2,
              "videoName": "wOCMuGlG.json?exp=1768820013517&sig=56c5989549f1fb39664402edcce21581",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "185") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle Front Lever Scissor",
          "setsAndReps": "5x5r",
          "imageName": "FLSE5",
          "demoVideoName": "1/2 Straddle Front Lever Scissor Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1400,
              "exerciseId": 185,
              "tag": 1,
              "videoName": "hIfip529.json?exp=1768822547017&sig=5993a118b4dac8e60038de081d283c66",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bridge",
          "setsAndReps": "5x10s",
          "imageName": "FLSE5IM",
          "demoVideoName": "Bridge Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1401,
              "exerciseId": 185,
              "tag": 2,
              "videoName": "PfcuKtas.json?exp=1768822547017&sig=da6e06c1e2c62c2b4906116b5e62f372",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "186") {
      responseData = {
        "Strength": {
          "name": "1/2 Front Lever",
          "setsAndReps": "5x10s",
          "imageName": "FLSE6",
          "demoVideoName": "1/2 Front Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1402,
              "exerciseId": 186,
              "tag": 1,
              "videoName": "plG9Chqz.json?exp=1768822550275&sig=5444e668cebe8997a0883d5fb4d3a3d6",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bridge Pushups",
          "setsAndReps": "5x5r",
          "imageName": "FLSE6IM",
          "demoVideoName": "Bridge Pushups Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1403,
              "exerciseId": 186,
              "tag": 2,
              "videoName": "Curj8jj8.json?exp=1768822550275&sig=5c82930ef75715218c1f24bbbf62b042",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "187") {
      responseData = {
        "Strength": {
          "name": "Single Leg Straddle Front Lever",
          "setsAndReps": "5x10s",
          "imageName": "FLSE7",
          "demoVideoName": "Single Leg Straddle Front Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1404,
              "exerciseId": 187,
              "tag": 1,
              "videoName": "Fr1wQZEp.json?exp=1768822553205&sig=39e494e0c5ce2993ef388d3096ae6a88",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bridge Inside Out",
          "setsAndReps": "5x1r",
          "imageName": "FLSE7IM",
          "demoVideoName": "Bridge Inside Out Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1405,
              "exerciseId": 187,
              "tag": 2,
              "videoName": "mtx9hlsE.json?exp=1768822553205&sig=39ba5568ab0174b24ac221860a51d60f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "188") {
      responseData = {
        "Strength": {
          "name": "Straddle Front Lever",
          "setsAndReps": "5x10s",
          "imageName": "FLSE8",
          "demoVideoName": "Straddle Front Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1406,
              "exerciseId": 188,
              "tag": 1,
              "videoName": "NvjhWG5n.json?exp=1768822560630&sig=ad46d9663725c7f19bcf7a2f0f6f6c82",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Single Leg Lift Bridge",
          "setsAndReps": "5x10r",
          "imageName": "FLSE8IM",
          "demoVideoName": "Single Leg Lift Bridge Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1407,
              "exerciseId": 188,
              "tag": 2,
              "videoName": "nmMdAPWn.json?exp=1768822560630&sig=fb01bbf41ad0a103584a157776ba1af3",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "189") {
      responseData = {
        "Strength": {
          "name": "Single Leg Front Lever",
          "setsAndReps": "5x10s",
          "imageName": "FLSE9",
          "demoVideoName": "Single Leg Front Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1408,
              "exerciseId": 189,
              "tag": 1,
              "videoName": "pM7carnJ.json?exp=1768822563127&sig=2453a887be36339219000ab38cd269aa",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Single Arm Lift Bridge",
          "setsAndReps": "5x10r",
          "imageName": "FLSE9IM",
          "demoVideoName": "Single Arm Lift Bridge Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1409,
              "exerciseId": 189,
              "tag": 2,
              "videoName": "AAcGV2r8.json?exp=1768822563127&sig=a2fea494e87d7efa12ea9715e19f4492",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "190") {
      responseData = {
        "Strength": {
          "name": "1/2 Front Pull",
          "setsAndReps": "5x5r",
          "imageName": "FLSE10",
          "demoVideoName": "1/2 Front Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1410,
              "exerciseId": 190,
              "tag": 1,
              "videoName": "KwOMChCR.json?exp=1768822566024&sig=ff351423c0e2bf686e406e137a465f68",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Bridge Wall Walk",
          "setsAndReps": "5x1r",
          "imageName": "FLSE10IM",
          "demoVideoName": "Bridge Wall Walk Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1411,
              "exerciseId": 190,
              "tag": 2,
              "videoName": "kNY4Gq5K.json?exp=1768822566024&sig=9304d5ca4fb8e22100381e3ce94bda81",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "191") {
      responseData = {
        "Strength": {
          "name": "Front Lever",
          "setsAndReps": "5x10s",
          "imageName": "FLSE11",
          "demoVideoName": "Front Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1412,
              "exerciseId": 191,
              "tag": 1,
              "videoName": "s3BkTMdf.json?exp=1768822570122&sig=7e271329b91fd71624459d9cb60f39ac",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "1/2 Back Limber",
          "setsAndReps": "5x1r",
          "imageName": "FLSE11IM",
          "demoVideoName": "1/2 Back Limber Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1413,
              "exerciseId": 191,
              "tag": 2,
              "videoName": "jtDNenUw.json?exp=1768822570122&sig=dd1a5a7cb58e78f7769d213bd67606c3",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "192") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle Planche Single Extension",
          "setsAndReps": "5x10r",
          "imageName": "sPLSE8",
          "demoVideoName": "1/2 Straddle Planche Single Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1414,
              "exerciseId": 192,
              "tag": 1,
              "videoName": "QeZj1kmN.json?exp=1768820655503&sig=fa9ed127ee452303dabdf6159e424152",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "SAC 3",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE8IM",
          "demoVideoName": "SAC 3 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1415,
              "exerciseId": 192,
              "tag": 2,
              "videoName": "9ww6LeeP.json?exp=1768820655503&sig=96caf015d9c5e57184915fdf9ae3f613",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "193") {
      responseData = {
        "Strength": {
          "name": "1/2 Straddle Planche Double Extension",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE9",
          "demoVideoName": "1/2 Straddle Planche Double Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1416,
              "exerciseId": 193,
              "tag": 1,
              "videoName": "CfcyZHST.json?exp=1768820666403&sig=46610b977e7f240453e18a20d94c5912",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "SAC 4",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE9IM",
          "demoVideoName": "SAC 4 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1417,
              "exerciseId": 193,
              "tag": 2,
              "videoName": "T732zX7P.json?exp=1768820666403&sig=0243e01da43d2caad97f63946e72ae4c",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "194") {
      responseData = {
        "Strength": {
          "name": "Scissoring Straddle Planche",
          "setsAndReps": "5x10r",
          "imageName": "sPLSE10",
          "demoVideoName": "Scissoring Straddle Planche Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1418,
              "exerciseId": 194,
              "tag": 1,
              "videoName": "nfeUiZo0.json?exp=1768820671147&sig=0efb9b53022a9a6988eebd29a04a66ac",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "SAC 5",
          "setsAndReps": "5x10s",
          "imageName": "sPLSE10IM",
          "demoVideoName": "SAC 5 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1419,
              "exerciseId": 194,
              "tag": 2,
              "videoName": "WEgeGJOr.json?exp=1768820671147&sig=da7eaea5c23253afc71431f0459accc5",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "195") {
      responseData = {
        "Strength": {
          "name": "Straddle Planche",
          "setsAndReps": "5x10s",
          "imageName": "sPLSE11",
          "demoVideoName": "Straddle Planche Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1420,
              "exerciseId": 195,
              "tag": 1,
              "videoName": "QDNPaF2B.json?exp=1768820674598&sig=38cd2f15bceb89e3b752232a4a2898a0",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "SAC 6",
          "setsAndReps": "5x5r",
          "imageName": "sPLSE11IM",
          "demoVideoName": "SAC 6 Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1421,
              "exerciseId": 195,
              "tag": 2,
              "videoName": "JB0s1SMr.json?exp=1768820674598&sig=b1739f6bc34c5de70f63c0ba0c50ae1c",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "196") {
      responseData = {
        "Strength": {
          "name": "Side Lever Inverted Hold",
          "setsAndReps": "5x30s",
          "imageName": "SLSE4",
          "demoVideoName": "Side Lever Inverted Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1422,
              "exerciseId": 196,
              "tag": 1,
              "videoName": "MgwA358Z.json?exp=1768822721350&sig=380fd7b4b4e47ab3e45a8d478d44890b",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Pancake Side Static",
          "setsAndReps": "5x10s",
          "imageName": "SLSE4IM",
          "demoVideoName": "Pancake Side Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1423,
              "exerciseId": 196,
              "tag": 2,
              "videoName": "InhG1Su7.json?exp=1768822721350&sig=1212dc0877ef7c7f22a7c084f318eaaa",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "197") {
      responseData = {
        "Strength": {
          "name": "Straddle Side Lever Pull",
          "setsAndReps": "5x5r",
          "imageName": "SLSE5",
          "demoVideoName": "Straddle Side Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1424,
              "exerciseId": 197,
              "tag": 1,
              "videoName": "jbWGZasb.json?exp=1768822724207&sig=5e0339c79bd616bdd1dff409408eae84",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Pancake Side Rep",
          "setsAndReps": "5x5r",
          "imageName": "SLSE5IM",
          "demoVideoName": "Pancake Side Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1425,
              "exerciseId": 197,
              "tag": 2,
              "videoName": "bxOHct3m.json?exp=1768822724207&sig=ee902c8c8386fa8df4a6fb89b1b6849f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "198") {
      responseData = {
        "Strength": {
          "name": "Scissoring Side Lever Pull",
          "setsAndReps": "5x5r",
          "imageName": "SLSE6",
          "demoVideoName": "Scissoring Side Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1426,
              "exerciseId": 198,
              "tag": 1,
              "videoName": "raQZUvvK.json?exp=1768822727549&sig=bfa5792a21a5e864a0debfd8d06acbb2",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Pancake Side Twist",
          "setsAndReps": "5x5r",
          "imageName": "SLSE6IM",
          "demoVideoName": "Pancake Side Twist Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1427,
              "exerciseId": 198,
              "tag": 2,
              "videoName": "v3nuD1BB.json?exp=1768822727550&sig=d2f89f01722073c5824a60c9f8302581",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "199") {
      responseData = {
        "Strength": {
          "name": "Closed Side Lever Pull",
          "setsAndReps": "5x5r",
          "imageName": "SLSE7",
          "demoVideoName": "Closed Side Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1428,
              "exerciseId": 199,
              "tag": 1,
              "videoName": "VJKEG6li.json?exp=1768822732673&sig=071d6ed4a4a3e007e30a9c62e0c7df31",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Pancake Side to Side Rep",
          "setsAndReps": "5x10r",
          "imageName": "SLSE7IM",
          "demoVideoName": "Pancake Side to Side Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1429,
              "exerciseId": 199,
              "tag": 2,
              "videoName": "QA1vpqKq.json?exp=1768822732673&sig=a30433e6b96efd5b8bb6ea8b47cf01d2",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "200") {
      responseData = {
        "Strength": {
          "name": "Negative Side Lever Pull",
          "setsAndReps": "5x5r",
          "imageName": "SLSE8",
          "demoVideoName": "Negative Side Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1430,
              "exerciseId": 200,
              "tag": 1,
              "videoName": "FhalvlrI.json?exp=1768822735790&sig=628544c95b6254c37a669a4810ab56c4",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Pancake Toe Touch",
          "setsAndReps": "5x10r",
          "imageName": "SLSE8IM",
          "demoVideoName": "Pancake Toe Touch Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1431,
              "exerciseId": 200,
              "tag": 2,
              "videoName": "pMHnTqNY.json?exp=1768822735790&sig=b49339e5d81aa9d8e376e8b06c8c9240",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "201") {
      responseData = {
        "Strength": {
          "name": "Side Lever Pull",
          "setsAndReps": "5x5r",
          "imageName": "SLSE9",
          "demoVideoName": "Side Lever Pull Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1432,
              "exerciseId": 201,
              "tag": 1,
              "videoName": "wBD2WQn1.json?exp=1768822739139&sig=942d5586d8cf73cda559c347f4c83464",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Overhead/Weighted/Loaded Pancake Side Static",
          "setsAndReps": "5x10s",
          "imageName": "SLSE9IM",
          "demoVideoName": "Overhead/Weighted/Loaded Pancake Side Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1433,
              "exerciseId": 201,
              "tag": 2,
              "videoName": "U9laSKA1.json?exp=1768822739140&sig=12db16e9085362a9d8442be2871022c1",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "202") {
      responseData = {
        "Strength": {
          "name": "Side Lever",
          "setsAndReps": "5x10s",
          "imageName": "SLSE10",
          "demoVideoName": "Side Lever Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1434,
              "exerciseId": 202,
              "tag": 1,
              "videoName": "qKJmkdcQ.json?exp=1768822743338&sig=4eefb73fb072189ca5f4570173fbbe71",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Weighted Pancake Side Rep",
          "setsAndReps": "5x5r",
          "imageName": "SLSE10IM",
          "demoVideoName": "Weighted Pancake Side Rep Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1435,
              "exerciseId": 202,
              "tag": 2,
              "videoName": "ZS4ZGD4l.json?exp=1768822743338&sig=5fbf33a67641f4a0b77591eab2c1008d",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "203") {
      responseData = {
        "Strength": {
          "name": "Elevated Reverse Plank",
          "setsAndReps": "5x60s",
          "imageName": "MNSE10",
          "demoVideoName": "Elevated Reverse Plank Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1436,
              "exerciseId": 203,
              "tag": 1,
              "videoName": "OTIZMciR.json?exp=1768822905715&sig=bc259ecb0917bd0ebd80dc34dbec7d59",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Seated Straddle Pulse",
          "setsAndReps": "5x30s",
          "imageName": "MNSE10IM",
          "demoVideoName": "Seated Straddle Pulse Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1437,
              "exerciseId": 203,
              "tag": 2,
              "videoName": "87gDR9Mb.json?exp=1768822905715&sig=cf38980d6185823877ea3dd4419a323d",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "204") {
      responseData = {
        "Strength": {
          "name": "1/2 Middle Split Hold",
          "setsAndReps": "5x30s",
          "imageName": "MNSE11",
          "demoVideoName": "1/2 Middle Split Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1438,
              "exerciseId": 204,
              "tag": 1,
              "videoName": "qfMhCR8L.json?exp=1768822909015&sig=fc0376ca3a637f0d79406de9e38a506a",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Extension Pull",
          "setsAndReps": "5x5r",
          "imageName": "MNSE11IM",
          "demoVideoName": "Shoulder Extension Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1439,
              "exerciseId": 204,
              "tag": 2,
              "videoName": "xYV9KrvL.json?exp=1768822909015&sig=c81ac7a5a164a176a85a146ccc127234",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "205") {
      responseData = {
        "Strength": {
          "name": "1/2 Middle Split Hold Single Extension",
          "setsAndReps": "5x10r",
          "imageName": "MNSE12",
          "demoVideoName": "1/2 Middle Split Hold Single Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1440,
              "exerciseId": 205,
              "tag": 1,
              "videoName": "HJp6KFV4.json?exp=1768822911547&sig=09f305880fcf5fd83986439c31dae252",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Shoulder Extension Static",
          "setsAndReps": "5x30s",
          "imageName": "MNSE12IM",
          "demoVideoName": "Shoulder Extension Static Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1441,
              "exerciseId": 205,
              "tag": 2,
              "videoName": "NWiaRw8j.json?exp=1768822911547&sig=00517130eb6f95b21e566081aa903391",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "206") {
      responseData = {
        "Strength": {
          "name": "1/2 Middle Split Hold Double Extension",
          "setsAndReps": "5x5r",
          "imageName": "MNSE13",
          "demoVideoName": "1/2 Middle Split Hold Double Extension Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1442,
              "exerciseId": 206,
              "tag": 1,
              "videoName": "jH0kcjNv.json?exp=1768822916510&sig=58ab05752759b76b058846eff1b564b9",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Manna Wall Slide",
          "setsAndReps": "5x5r",
          "imageName": "MNSE13IM",
          "demoVideoName": "Manna Wall Slide Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1443,
              "exerciseId": 206,
              "tag": 2,
              "videoName": "hmMIVe1x.json?exp=1768822916510&sig=da4bdc5d66fa0fe6a0e27a9a7f3be274",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "207") {
      responseData = {
        "Strength": {
          "name": "Middle Split Hold",
          "setsAndReps": "5x30s",
          "imageName": "MNSE14",
          "demoVideoName": "Middle Split Hold Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1444,
              "exerciseId": 207,
              "tag": 1,
              "videoName": "BIf8F944.json?exp=1768822919708&sig=5cb581817ff1358a0127e13e55cf2bdf",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Weighted Shoulder Extension Pull",
          "setsAndReps": "5x5r",
          "imageName": "MNSE14IM",
          "demoVideoName": "Weighted Shoulder Extension Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1445,
              "exerciseId": 207,
              "tag": 2,
              "videoName": "7XUO4Eoi.json?exp=1768822919708&sig=7bf544dcbba0f6c892f8c76a235c1631",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "208") {
      responseData = {
        "Strength": {
          "name": "Manna Press",
          "setsAndReps": "5x5r",
          "imageName": "MNSE15",
          "demoVideoName": "Manna Press Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1446,
              "exerciseId": 208,
              "tag": 1,
              "videoName": "2GpYkm8n.json?exp=1768822922999&sig=015cf7a74361b2bc1dcaae65f9b805a1",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Weighted Shoulder Extension Hang",
          "setsAndReps": "5x10s",
          "imageName": "MNSE15IM",
          "demoVideoName": "Weighted Shoulder Extension Hang Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1447,
              "exerciseId": 208,
              "tag": 2,
              "videoName": "utSJhjxA.json?exp=1768822922999&sig=5db424f60ceac5d73f27198e8d312eba",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "209") {
      responseData = {
        "Strength": {
          "name": "Manna",
          "setsAndReps": "5x10s",
          "imageName": "MNSE16",
          "demoVideoName": "Manna Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1448,
              "exerciseId": 209,
              "tag": 1,
              "videoName": "MNarrXm3.json?exp=1768822927615&sig=89c6c114c229e7eb518d761988e1fd11",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Manna Swing",
          "setsAndReps": "5x5r",
          "imageName": "MNSE16IM",
          "demoVideoName": "Manna Swing Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1449,
              "exerciseId": 209,
              "tag": 2,
              "videoName": "3ZQ5NxEu.json?exp=1768822927615&sig=481b688ba6f6decc8bfefbf7a18780bd",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "212") {
      responseData = {
        "Strength": {
          "name": "Chest Roll 1",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE1",
          "demoVideoName": "Chest Roll 1 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1454,
              "exerciseId": 212,
              "tag": 1,
              "videoName": "sdX1MAD7.json?exp=1768820323397&sig=fef3dec40c441b2dfbe505389a9bfeec",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Retraction Two",
          "setsAndReps": "5x30s",
          "imageName": "HBPSE1IM",
          "demoVideoName": "Prone Retraction Two Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1455,
              "exerciseId": 212,
              "tag": 2,
              "videoName": "7VqsObVa.json?exp=1768820323397&sig=dc1d7ebed920e84c0e518949cb2ce31f",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "213") {
      responseData = {
        "Strength": {
          "name": "Chest Roll 2",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE2",
          "demoVideoName": "Chest Roll 2 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1456,
              "exerciseId": 213,
              "tag": 1,
              "videoName": "mITiOCV7.json?exp=1768820330840&sig=abc85c07c6e965a941277a9213506c9a",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone External Rotation One",
          "setsAndReps": "5x10r",
          "imageName": "HBPSE2IM",
          "demoVideoName": "Prone External Rotation One Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1457,
              "exerciseId": 213,
              "tag": 2,
              "videoName": "6Ux42aSp.json?exp=1768820330840&sig=368dcf764fc11e240b50f7139ecf158a",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "214") {
      responseData = {
        "Strength": {
          "name": "Chest Roll 3",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE3",
          "demoVideoName": "Chest Roll 3 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1458,
              "exerciseId": 214,
              "tag": 1,
              "videoName": "C2ILdhke.json?exp=1768820334126&sig=1f702868a19471020d410de3bc296fbc",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone External Rotation Two",
          "setsAndReps": "5x30s",
          "imageName": "HBPSE3IM",
          "demoVideoName": "Prone External Rotation Two Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1459,
              "exerciseId": 214,
              "tag": 2,
              "videoName": "yrVYb1rX.json?exp=1768820334126&sig=025e12c61906db266c3e71b4c19fadab",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "215") {
      responseData = {
        "Strength": {
          "name": "Chest Roll 4",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE4",
          "demoVideoName": "Chest Roll 4 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1460,
              "exerciseId": 215,
              "tag": 1,
              "videoName": "mVw180tU.json?exp=1768820342538&sig=096522c21fd0c2f32eda0d2988c42629",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Retraction Three",
          "setsAndReps": "5x10r",
          "imageName": "HBPSE4IM",
          "demoVideoName": "Prone Retraction Three Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1461,
              "exerciseId": 215,
              "tag": 2,
              "videoName": "XovY78cc.json?exp=1768820342538&sig=afeb42a7cd442cd5ef3c90e21115a064",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "216") {
      responseData = {
        "Strength": {
          "name": "Chest Roll 5",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE5",
          "demoVideoName": "Chest Roll 5 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1462,
              "exerciseId": 216,
              "tag": 1,
              "videoName": "uhk8nKPP.json?exp=1768820345776&sig=196053a26eb1fad1421d24488651796d",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone Retraction Four",
          "setsAndReps": "5x30s",
          "imageName": "HBPSE5IM",
          "demoVideoName": "Prone Retraction Four Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1463,
              "exerciseId": 216,
              "tag": 2,
              "videoName": "Rv0DmEd7.json?exp=1768820345776&sig=72d8aac1ea0d7031286aaf5916043d94",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "217") {
      responseData = {
        "Strength": {
          "name": "Chest Roll 6",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE6",
          "demoVideoName": "Chest Roll 6 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1464,
              "exerciseId": 217,
              "tag": 1,
              "videoName": "o7oTu0Lm.json?exp=1768820349102&sig=006f9cbc05d07e5e97d6e65d4a060f92",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone External Rotation Three",
          "setsAndReps": "5x10r",
          "imageName": "HBPSE6IM",
          "demoVideoName": "Prone External Rotation Three Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1465,
              "exerciseId": 217,
              "tag": 2,
              "videoName": "Ext0bK1y.json?exp=1768820349102&sig=aa41b94cc112b98c33d59c50b06321a7",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "218") {
      responseData = {
        "Strength": {
          "name": "1/2 Hollow Back Press",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE7",
          "demoVideoName": "1/2 Hollow Back Press Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1466,
              "exerciseId": 218,
              "tag": 1,
              "videoName": "oBbfkACr.json?exp=1768820356009&sig=3f46ee357c505b13aee7806f6443351c",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Prone External Rotation Four",
          "setsAndReps": "5x30s",
          "imageName": "HBPSE7IM",
          "demoVideoName": "Prone External Rotation Four Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1467,
              "exerciseId": 218,
              "tag": 2,
              "videoName": "Vbs5AFFt.json?exp=1768820356010&sig=4eb3d3bc57f60cbbd5306e04336138c1",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "219") {
      responseData = {
        "Strength": {
          "name": "Hollow Back Press ",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE8",
          "demoVideoName": "Hollow Back Press  Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1468,
              "exerciseId": 219,
              "tag": 1,
              "videoName": "LzQ9vtwF.json?exp=1768820359300&sig=5133445c96d8e1ada018baa4c025fc70",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Cuban Press",
          "setsAndReps": "5x5r",
          "imageName": "HBPSE8IM",
          "demoVideoName": "Cuban Press Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1469,
              "exerciseId": 219,
              "tag": 2,
              "videoName": "1jhbFm4F.json?exp=1768820359300&sig=19d5421f3ef35090629a1bc6b04b2f0b",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "220") {
      responseData = {
        "Strength": {
          "name": "Czech 1",
          "setsAndReps": "5x5r",
          "imageName": "RCSE1",
          "demoVideoName": "Czech 1 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1470,
              "exerciseId": 220,
              "tag": 1,
              "videoName": "um5smFTZ.json?exp=1768820526020&sig=e685ce773a894fc1cf927cfdde1ff3ec",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Scap Pull",
          "setsAndReps": "5x5r",
          "imageName": "RCSE1IM",
          "demoVideoName": "Scap Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1471,
              "exerciseId": 220,
              "tag": 2,
              "videoName": "iUtMujQ6.json?exp=1768820526020&sig=a2c89d5ce7a5e06141242f5c9bbba73b",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "221") {
      responseData = {
        "Strength": {
          "name": "Czech 2",
          "setsAndReps": "5x5r",
          "imageName": "RCSE2",
          "demoVideoName": "Czech 2 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1472,
              "exerciseId": 221,
              "tag": 1,
              "videoName": "k7ZZwxTp.json?exp=1768820544867&sig=3dc5f9e4bb2fa7ef19330d4d2cc5ffe3",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "One Arm Assisted Rotation",
          "setsAndReps": "5x5r",
          "imageName": "RCSE2IM",
          "demoVideoName": "One Arm Assisted Rotation Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1473,
              "exerciseId": 221,
              "tag": 2,
              "videoName": "CgdP9uOy.json?exp=1768820544867&sig=9971047a93b6be48419920f01714da8c",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "222") {
      responseData = {
        "Strength": {
          "name": "Czech 3",
          "setsAndReps": "5x5r",
          "imageName": "RCSE3",
          "demoVideoName": "Czech 3 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1474,
              "exerciseId": 222,
              "tag": 1,
              "videoName": "2HacakLO.json?exp=1768820547930&sig=4c4aa05630e45a316ea14307b97725f1",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "One Arm Rotation",
          "setsAndReps": "5x5r",
          "imageName": "RCSE3IM",
          "demoVideoName": "One Arm Rotation Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1475,
              "exerciseId": 222,
              "tag": 2,
              "videoName": "NjYoktoR.json?exp=1768820547931&sig=717cc588af0cf68a2eae00a9977f2d11",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "223") {
      responseData = {
        "Strength": {
          "name": "Czech 4",
          "setsAndReps": "5x5r",
          "imageName": "RCSE4",
          "demoVideoName": "Czech 4 Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1476,
              "exerciseId": 223,
              "tag": 1,
              "videoName": "qQ4LoJkp.json?exp=1768820552645&sig=edfd3eff155af9c6c4e284944114bf6a",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "One Arm Scap Pull",
          "setsAndReps": "5x5r",
          "imageName": "RCSE4IM",
          "demoVideoName": "One Arm Scap Pull Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1477,
              "exerciseId": 223,
              "tag": 2,
              "videoName": "x1XJJ7rb.json?exp=1768820552646&sig=9c8186dc4f610b43e3c047a9d40c1c67",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    if (exerciseId == "224") {
      responseData = {
        "Strength": {
          "name": "Rope Climb",
          "setsAndReps": "5x5/4 RC",
          "imageName": "RCSE516",
          "demoVideoName": "Rope Climb Exercise Video",
          "videos": [
            {
              "exercisesVideoId": 1478,
              "exerciseId": 224,
              "tag": 1,
              "videoName": "vu7OJEXl.json?exp=1768820556048&sig=5cab78bccb352d119e1d50ee6e0c19b5",
              "weekNum": 0,
              "order": 1
            }
          ]
        },
        "Mobility": {
          "name": "Lat Fly",
          "setsAndReps": "5x5r",
          "imageName": "RCSE516IM",
          "demoVideoName": "Lat Fly Mobility Video",
          "videos": [
            {
              "exercisesVideoId": 1479,
              "exerciseId": 224,
              "tag": 2,
              "videoName": "ZEhtTCYw.json?exp=1768820556048&sig=e19ea3067abca9c311898edfbc91b458",
              "weekNum": 0,
              "order": 1
            }
          ]
        }
      }
    }
    dispatch({ type: OPEN_MODAL, data: responseData })
    // Sentry.captureException(error);
  })

}

export const CloseModal = () => {
  return {
    type: CLOSE_MODAL,
  }
}
