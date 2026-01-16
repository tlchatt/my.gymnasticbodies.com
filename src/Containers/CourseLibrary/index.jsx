import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Divider,
  CircularProgress
} from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import clsx from 'clsx';


import GridContainer from '../../Components/UtilComponents/Mui-GridContainer'
import Container from '../../Components/UtilComponents/Container'
import CourseCards from '../../Components/CourseLibaryComponents/CourseCard'
import ProgressionRows from '../../Components/CourseLibaryComponents/ProgressionRows'
import CourseLibraryPlayer from '../../Components/CourseLibaryComponents/CourseLibraryPlayer'
import OhNoModal from '../../Components/OhNoModal';

import { mainCourses } from './data';

const API = process.env.REACT_APP_API;

const useStyles = makeStyles(theme => ({
  background: { background: '#eeeeee', marginBottom: 12 },
  image: {
    width: '128px',
    verticalAlign: 'middle'
  },
  title: {
    marginTop: 0,
    marginBottom: '24px',
    fontSize: '40px',
    fontWeight: 400,
    [theme.breakpoints.down(415)]: {
      fontSize: '28px',
    },
    [theme.breakpoints.up(766)]: {
      fontSize: '32px',
    },
    [theme.breakpoints.up(1024)]: {
      fontSize: '40px',
    }
  },
  flexFlow: {
    flexFlow: 'row wrap',
    display: 'flex',
    textAlign: 'center',
  },
  loading: {
    justifyContent: 'center'
  }
}))

const cleanName = name => name.replace(/\s+/g, '').toLowerCase();
let FoundationSecondRow = {
  "show": true,
  "data": [
    {
      "name": "Foundation 1",
      "nameId": "F1",
      "imgUrl": "foundation1.jpg"
    },
    {
      "name": "Foundation 2",
      "nameId": "F2",
      "imgUrl": "foundation2.jpg"
    },
    {
      "name": "Foundation 3",
      "nameId": "F3",
      "imgUrl": "foundation3.jpg"
    },
    {
      "name": "Foundation 4",
      "nameId": "F4",
      "imgUrl": "foundation4.jpg"
    }
  ]
}
let HandstandSecondRow = {
  "show": true,
  "data": [
    {
      "name": "Handstand 1",
      "nameId": "H1",
      "imgUrl": "handstand1.jpg"
    },
    {
      "name": "Handstand 2",
      "nameId": "H2",
      "imgUrl": "handstand2.jpg"
    },
    {
      "name": "Handstand 3",
      "nameId": "H3",
      "imgUrl": "handstand3.jpg"
    }
  ]
}
let StretchSecondRow = {
  "show": true,
  "data": [
    {
      "name": "Stretch Series - Middle Split",
      "nameId": "SMS",
      "imgUrl": "stretchseriesmiddlesplit.jpg"
    },
    {
      "name": "Stretch Series - Front Split",
      "nameId": "SFS",
      "imgUrl": "stretchseriesfrontsplit.jpg"
    },
    {
      "name": "Stretch Series - Thoracic Bridge",
      "nameId": "STB",
      "imgUrl": "stretchseriesthoracicbridge.jpg"
    }
  ]
}
let MovementSecondRow = {
  "show": true,
  "data": [
    {
      "name": "Quadrupedal Warm Up",
      "nameId": "SMS",
      "imgUrl": "movement-quadrupedalwarmup.jpg"
    },
    {
      "name": "Shoulder Roll",
      "nameId": "SFS",
      "imgUrl": "movement-shoulderroll.jpg"
    },
    {
      "name": "Forward Roll",
      "nameId": "STB",
      "imgUrl": "movement-forwardroll.jpg"
    },
    {
      "name": "Backward Roll",
      "nameId": "SMS",
      "imgUrl": "movement-backwardroll.jpg"
    },
    {
      "name": "Handstand Forward Roll",
      "nameId": "SFS",
      "imgUrl": "movement-handstandforwardroll.jpg"
    },
    {
      "name": "Back Extension Development",
      "nameId": "STB",
      "imgUrl": "movement-backextensiondevelopment.jpg"
    },
    {
      "name": "Cartwheel Development",
      "nameId": "SMS",
      "imgUrl": "movement-cartwheeldevelopment.jpg"
    },
    {
      "name": "Cartwheel Refinement",
      "nameId": "SFS",
      "imgUrl": "movement-cartwheelrefinement.jpg"
    },
    {
      "name": "Integrated Roll Series",
      "nameId": "STB",
      "imgUrl": "movement-integratedrollseries.jpg"
    },

  ]
}
let RingsSecondRow = {
  "show": true,
  "data": [
    {
      "name": "Ring mobility R1>iM1-8",
      "nameId": "SMS",
      "imgUrl": "rings-ringmobilityr1>im1-8.jpg"
    },
    {
      "name": "Reverse Muscle Up",
      "nameId": "SFS",
      "imgUrl": "rings-reversemuscleup.jpg"
    },
    {
      "name": "LARS",
      "nameId": "STB",
      "imgUrl": "rings-lars.jpg"
    },
    {
      "name": "Ring support",
      "nameId": "SFS",
      "imgUrl": "rings-ringsupport.jpg"
    },
    {
      "name": "Back Lever",
      "nameId": "STB",
      "imgUrl": "rings-backlever.jpg"
    }
  ]
}
let FoundationThirdRow = {
  "show": true,
  "data": [
    "Front Lever",
    "Side Lever",
    "Manna",
    "Hollow Back Press",
    "Rope Climb",
    "Straddle Planche",
    "Single Leg Squat"
  ],
  "loading": false,
  "imagePrefix": "foundation1",
  "allData": {
    "Front Lever": [
      {
        "exerciseId": 1,
        "name": "Bent Hollow Body Hold",
        "imName": "Cat-Cow",
        "imageName": "FLPE1",
        "element": "FL/PE1",
        "elementFullName": "Front Lever",
        "progressionLevel": 1,
        "repsOrSecs": "5x60s",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 1,
              "description": "1) Keep the lower back pressed firmly into the ground.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 1,
              "description": "2) Keep the feet and shoulders off the ground during the set.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 1,
              "description": "1) Pull the middle of the back upward strongly during cat.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 1,
              "description": "2) The neck's position should mimic the spine's position.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1,
              "exerciseId": 1,
              "tag": 1,
              "videoName": "beTWQnnC.json?exp=1768594319099&sig=b791d54536cf7f02bf60c596eb81cc06",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 2,
              "exerciseId": 1,
              "tag": 2,
              "videoName": "D5ovGHOR.json?exp=1768594319099&sig=7c8eeb58dfb942602370d0dce38ecabd",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 27,
              "exerciseId": 1,
              "tag": 4,
              "videoName": "MO34nqp2.json?exp=1768594319099&sig=a0e036e8353d585f90c959b314408372",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 28,
              "exerciseId": 1,
              "tag": 4,
              "videoName": "PFklWuZs.json?exp=1768594319099&sig=7a0c38652c9f39f1279a23606d421e91",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 2,
        "name": "Bent Hollow Body Rock",
        "imName": "Table",
        "imageName": "FLPE2",
        "element": "FL/PE2",
        "elementFullName": "Front Lever",
        "progressionLevel": 2,
        "repsOrSecs": "5x60r",
        "imRepsOrSecs": "5x30s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 2,
              "description": "1) An arched lower back will prevent a smooth roll.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 2,
              "description": "2) Keep the chin pulled downward towards the chest.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 2,
              "description": "1) Extend the hips upward all the way to shoulder height.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 2,
              "description": "2) Do not allow the chest to cave in during this extension.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 29,
              "exerciseId": 2,
              "tag": 1,
              "videoName": "vWwjwCfc.json?exp=1768594319099&sig=11858629869ea1eebe4077545a5214fb",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 30,
              "exerciseId": 2,
              "tag": 2,
              "videoName": "lOYPi26v.json?exp=1768594319099&sig=e3f57eb2414567707b9fc645676254b2",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 55,
              "exerciseId": 2,
              "tag": 4,
              "videoName": "qWIBcgQc.json?exp=1768594319099&sig=a9884c13f11ed3b1e74c08745c6553b4",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 56,
              "exerciseId": 2,
              "tag": 4,
              "videoName": "iLh4Ds8a.json?exp=1768594319099&sig=6cde7e336d69ecff603a4d0743dc0655",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 3,
        "name": "Straddle Hollow Body Hold",
        "imName": "Table Rock",
        "imageName": "FLPE3",
        "element": "FL/PE3",
        "elementFullName": "Front Lever",
        "progressionLevel": 3,
        "repsOrSecs": "5x60s",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 3,
              "description": "1) A wider straddle will quite strongly target the hips.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 3,
              "description": "2) Do not allow the lower back to arch.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 3,
              "description": "1) Descend fully in between repetitions.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 3,
              "description": "2) It is normal to feel stretching in the biceps at the top.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 57,
              "exerciseId": 3,
              "tag": 1,
              "videoName": "9EY4bjQ4.json?exp=1768594319099&sig=2682a6eabf1fca28c0a666553fb5a077",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 58,
              "exerciseId": 3,
              "tag": 2,
              "videoName": "MzJ3fTPy.json?exp=1768594319099&sig=3a3cdec4366e599af2a8db6b595be832",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 83,
              "exerciseId": 3,
              "tag": 4,
              "videoName": "uR2wO5ul.json?exp=1768594319099&sig=997c10f0d7f0d859fc1566cdbe80e13f",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 84,
              "exerciseId": 3,
              "tag": 4,
              "videoName": "XxJPBEHY.json?exp=1768594319099&sig=7ce827ddccbaaf808bb912c76a1021cf",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 4,
        "name": "Straddle Hollow Body Rock",
        "imName": "Table Inside Out",
        "imageName": "FLPE4",
        "element": "FL/PE4",
        "elementFullName": "Front Lever",
        "progressionLevel": 4,
        "repsOrSecs": "5x60r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 4,
              "description": "1) Do not allow the feet to lift more than 6-12 inches at most.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 4,
              "description": "2) Keep the arms in place by the hips at all times.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 4,
              "description": "1) Down and back is one repetition.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 4,
              "description": "2) Keep the chest elevated at all times.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 85,
              "exerciseId": 4,
              "tag": 1,
              "videoName": "h9RHgycp.json?exp=1768594319099&sig=ef1bb7002dd378feb7b7f8743e4394fd",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 86,
              "exerciseId": 4,
              "tag": 2,
              "videoName": "tW4zNQZ2.json?exp=1768594319099&sig=b94432f6d309f885c0cde98bb5451602",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 111,
              "exerciseId": 4,
              "tag": 4,
              "videoName": "ubR5lWsx.json?exp=1768594319099&sig=8a4e72015a1841d79eadc601e06d45fd",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 112,
              "exerciseId": 4,
              "tag": 4,
              "videoName": "Nk0N3Rya.json?exp=1768594319099&sig=16c482e1a45a295e193e56e7a54f84ee",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 5,
        "name": "Hollow Body Hold",
        "imName": "Shoulder Bridge",
        "imageName": "FLPE5",
        "element": "FL/PE5",
        "elementFullName": "Front Lever",
        "progressionLevel": 5,
        "repsOrSecs": "5x60s",
        "imRepsOrSecs": "5x30s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 5,
              "description": "1) The arms may also be placed down by the hips, however mastery requires arms overhead.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 5,
              "description": "2) With a neutral chin keep the eyes focused on the ceiling.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 5,
              "description": "1) The feet should be near the glutes and under the knees.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 5,
              "description": "2) Keep the shoulders, neck and head firmly on the floor.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 113,
              "exerciseId": 5,
              "tag": 1,
              "videoName": "pZWNlEYq.json?exp=1768594319099&sig=a0a0ad0600d1aa068e7b9df9833007a8",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 114,
              "exerciseId": 5,
              "tag": 2,
              "videoName": "1ek8p1EW.json?exp=1768594319099&sig=f4f0506bdc91ad9f56ecff602975132a",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 139,
              "exerciseId": 5,
              "tag": 4,
              "videoName": "JdctSWEg.json?exp=1768594319099&sig=c9645c11d22c43e7a7e4702633764906",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 140,
              "exerciseId": 5,
              "tag": 4,
              "videoName": "HBneVsK4.json?exp=1768594319099&sig=1cf0b0c5f69d6254c14c7802a97bbe42",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 6,
        "name": "Hollow Body Rock",
        "imName": "Shoulder Bridge Rock",
        "imageName": "FLPE6",
        "element": "FL/PE6",
        "elementFullName": "Front Lever",
        "progressionLevel": 6,
        "repsOrSecs": "5x60r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 6,
              "description": "1) Notice the smoothness of this athlete's roll.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 6,
              "description": "2) Arms may also be placed down next to the hips, however mastery requires arms overhead.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 6,
              "description": "1) Do not move the feet during the repetitions.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 6,
              "description": "2) Extend the hips upward as strongly as you are able.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 141,
              "exerciseId": 6,
              "tag": 1,
              "videoName": "5VurhvVf.json?exp=1768594319099&sig=a1bb91b833e72cedea304d85f2a52727",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 142,
              "exerciseId": 6,
              "tag": 2,
              "videoName": "6l7qEhX5.json?exp=1768594319099&sig=658d32e0bf7a24fa99472b4d9fc74939",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 165,
              "exerciseId": 6,
              "tag": 4,
              "videoName": "oAJK5XDv.json?exp=1768594319099&sig=0e883bd34456cabd5868ef29681cb8d9",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 166,
              "exerciseId": 6,
              "tag": 4,
              "videoName": "iJHFi87f.json?exp=1768594319099&sig=2b9ad1230c5e18f31933afb111e52738",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      }
    ],
    "Side Lever": [
      {
        "exerciseId": 13,
        "name": "Seated Russian Twist",
        "imName": "Standing Hip Circle",
        "imageName": "SLPE1",
        "element": "SL/PE1",
        "elementFullName": "Side Lever",
        "progressionLevel": 1,
        "repsOrSecs": "5x30r",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 13,
              "description": "1) No slouching during the twists; flat back!",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 13,
              "description": "2) My preference is to use 5lbs+ for these, but scale as needed for your situation.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 13,
              "description": "1) Keep the hip circle smooth by pressing the hips out strongly to the sides.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 333,
              "exerciseId": 13,
              "tag": 1,
              "videoName": "i79XFmvl.json?exp=1768594319099&sig=fe84fef0e1ce673eb0058ba137b8708a",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 334,
              "exerciseId": 13,
              "tag": 2,
              "videoName": "RoHm6iH1.json?exp=1768594319099&sig=c9c408eaf9713bd9983844542bbced0a",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 359,
              "exerciseId": 13,
              "tag": 4,
              "videoName": "PJ9TIrum.json?exp=1768594319099&sig=8c647b91143a767e1cfc5183e1800ba6",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 360,
              "exerciseId": 13,
              "tag": 4,
              "videoName": "D5ZEmCet.json?exp=1768594319099&sig=dadf587b6a7c5f20cd3a821d9a8574b9",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 14,
        "name": "Elbow Side Plank Twist",
        "imName": "Standing Trunk Circle",
        "imageName": "SLPE2",
        "element": "SL/PE2",
        "elementFullName": "Side Lever",
        "progressionLevel": 2,
        "repsOrSecs": "5x10r@",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 14,
              "description": "1) Do not sag or arch during the twist.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 14,
              "description": "2) Press the supporting forearm firmly into the ground.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 14,
              "description": "1) Arch back strongly at the top of each rep.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 14,
              "description": "2) Focus on a smooth circular motion.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 361,
              "exerciseId": 14,
              "tag": 1,
              "videoName": "93ck7miq.json?exp=1768594319099&sig=5fcd94758986ffea30e229a9b5894a07",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 362,
              "exerciseId": 14,
              "tag": 2,
              "videoName": "ZeHTPgJE.json?exp=1768594319099&sig=fdae20a6150f849608be1f55d29bb0d9",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 387,
              "exerciseId": 14,
              "tag": 4,
              "videoName": "eOuYE5kZ.json?exp=1768594319099&sig=a5123d9f7340b56ac30ef6e05b457b64",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 388,
              "exerciseId": 14,
              "tag": 4,
              "videoName": "73JpCnOJ.json?exp=1768594319099&sig=c1483e7b913aeeea26756925c1610429",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 15,
        "name": "Side Over Arch",
        "imName": "Elbow Bounces",
        "imageName": "SLPE3",
        "element": "SL/PE3",
        "elementFullName": "Side Lever",
        "progressionLevel": 3,
        "repsOrSecs": "5x10r@",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 15,
              "description": "1) Allow the top foot to come forward and the feet to separate for stability",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 15,
              "description": "2) The obliques should arch fully at the bottom and then also arch fully at the top.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 15,
              "description": "1) Keep the elbows pulled back, the back flat and the ribs pulled down at all times.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 389,
              "exerciseId": 15,
              "tag": 1,
              "videoName": "ULM4zdC7.json?exp=1768594319100&sig=646402732efcb3606702bc0b849161d4",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 390,
              "exerciseId": 15,
              "tag": 2,
              "videoName": "6reyBMha.json?exp=1768594319100&sig=1032e2788ad542ef1f68aac7ab32c946",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 415,
              "exerciseId": 15,
              "tag": 4,
              "videoName": "vp6PIk7W.json?exp=1768594319100&sig=32e2dcb73e2ea432b15448601e157c02",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 416,
              "exerciseId": 15,
              "tag": 4,
              "videoName": "vRvdotEu.json?exp=1768594319100&sig=3d206bede8f8a5ab3d972592699dc9ed",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 16,
        "name": "Arch Up",
        "imName": "Standing Weighted Oblique Stretch",
        "imageName": "SLPE4",
        "element": "SL/PE4",
        "elementFullName": "Side Lever",
        "progressionLevel": 4,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x30s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 16,
              "description": "1) Sit up to at least horizontal.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 16,
              "description": "2) Lift the chin at the top of each repetition.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 16,
              "description": "1) Keep the knees straight.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 16,
              "description": "2) Focus on moving only directly to the side.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 417,
              "exerciseId": 16,
              "tag": 1,
              "videoName": "UNBX2EkQ.json?exp=1768594319100&sig=56c3f8cc12721a6a2a7fcc85185502d7",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 418,
              "exerciseId": 16,
              "tag": 2,
              "videoName": "eStfEJ00.json?exp=1768594319100&sig=d553d337f0a63d263d7ae30c6a777f2b",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 443,
              "exerciseId": 16,
              "tag": 4,
              "videoName": "nVy0TKVf.json?exp=1768594319100&sig=fdab3d5027a25a6112e6bf3dc6d36c9b",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 444,
              "exerciseId": 16,
              "tag": 4,
              "videoName": "3L4o7xgV.json?exp=1768594319100&sig=1fcc025c7055b4ccdfd8293304d95d47",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 17,
        "name": "Twisting Arch Up",
        "imName": "Standing Weighted Oblique Reps",
        "imageName": "SLPE5",
        "element": "SL/PE5",
        "elementFullName": "Side Lever",
        "progressionLevel": 5,
        "repsOrSecs": "5x10r@",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 17,
              "description": "1) Do not use abbreviated range of motion; sit up as high as possible.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 17,
              "description": "2) The neck is part of the spine; make sure the neck is arched at the top of each rep.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 17,
              "description": "1) Use a moderate weight; the point is to stretch the obliques, not to make a maximum effort.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 445,
              "exerciseId": 17,
              "tag": 1,
              "videoName": "LZGCevJE.json?exp=1768594319100&sig=e3ffee67b1051fd8c6649afd0559d889",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 446,
              "exerciseId": 17,
              "tag": 2,
              "videoName": "OROo1fPh.json?exp=1768594319100&sig=7b3c68d2332b9228e791244c39650afb",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 471,
              "exerciseId": 17,
              "tag": 4,
              "videoName": "CGBSGdSW.json?exp=1768594319100&sig=9a4858da3fa9734498c6cdca2ef8d814",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 472,
              "exerciseId": 17,
              "tag": 4,
              "videoName": "rrhH4obq.json?exp=1768594319100&sig=33f93ddde16f2e3901386c0c1b7ad9df",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 18,
        "name": "Circle Arch Up",
        "imName": "Outside Inside Outside Back",
        "imageName": "SLPE6",
        "element": "SL/PE6",
        "elementFullName": "Side Lever",
        "progressionLevel": 6,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 18,
              "description": "1) Make sure you are doing a complete circular motion.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 18,
              "description": "2) Do not allow the body to fall forward on the sides.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 18,
              "description": "1) Note that the feet are pointing directly square to the front.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 18,
              "description": "2) Turn the chest 90 degrees to the leg at the bottom.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 473,
              "exerciseId": 18,
              "tag": 1,
              "videoName": "l38Cie9X.json?exp=1768594319100&sig=cea70d10a223966166b7a6a2d69b5181",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 474,
              "exerciseId": 18,
              "tag": 2,
              "videoName": "XZ26XoDf.json?exp=1768594319100&sig=69b06cf9ae344b8c8af77eb814419749",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 499,
              "exerciseId": 18,
              "tag": 4,
              "videoName": "oIAeUaZD.json?exp=1768594319100&sig=e1fc5bcb8011eaeef9e32d12d7f46429",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 500,
              "exerciseId": 18,
              "tag": 4,
              "videoName": "QCVwS4d7.json?exp=1768594319100&sig=ca4f588f016df5ec27dc91a4ab0fdc94",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      }
    ],
    "Manna": [
      {
        "exerciseId": 19,
        "name": "Tuck-Up",
        "imName": "Stiff Leg Windmill",
        "imageName": "MNPE1",
        "element": "MN/PE1",
        "elementFullName": "Manna",
        "progressionLevel": 1,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 19,
              "description": "1) Pull the knees all the way to the chest.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 19,
              "description": "2) Lay down completely flat in between repetitions.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 19,
              "description": "1) Both legs remain locked and straight at all times.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 19,
              "description": "2) Keep the dumbbell above the supporting shoulder.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 501,
              "exerciseId": 19,
              "tag": 1,
              "videoName": "CKtwdizz.json?exp=1768594319100&sig=1137451ff6855d043803565486f85010",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 502,
              "exerciseId": 19,
              "tag": 2,
              "videoName": "LtC8WEXn.json?exp=1768594319100&sig=fe15610e04ad532a18d1f855ee037ece",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 527,
              "exerciseId": 19,
              "tag": 4,
              "videoName": "ak5sTPz9.json?exp=1768594319100&sig=c8d09baaf16c84052604da36431fbdd2",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 528,
              "exerciseId": 19,
              "tag": 4,
              "videoName": "YNeaaVAB.json?exp=1768594319100&sig=7d02e5b6a1ad5c55934ffb8ec9a1f5f9",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 20,
        "name": "Straddle Up",
        "imName": "Jefferson Curl",
        "imageName": "MNPE2",
        "element": "MN/PE2",
        "elementFullName": "Manna",
        "progressionLevel": 2,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 20,
              "description": "1) Keep the knees completely straight during the ascent.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 20,
              "description": "2) Sit the chest up as high as possible without caving in.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 20,
              "description": "1) Curl down one vertebrae at a time.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 20,
              "description": "2) Keep the hips tucked under as long as possible.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 529,
              "exerciseId": 20,
              "tag": 1,
              "videoName": "RbeTzAhj.json?exp=1768594319100&sig=b0db8aa1f98dcc3a5113f76258fae45a",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 530,
              "exerciseId": 20,
              "tag": 2,
              "videoName": "bJRairkT.json?exp=1768594319100&sig=ca548255525aef1067bc217fe4c41bbc",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 555,
              "exerciseId": 20,
              "tag": 4,
              "videoName": "A6bQsX7c.json?exp=1768594319100&sig=c24f6c003336e686e7323e0fb187c807",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 556,
              "exerciseId": 20,
              "tag": 4,
              "videoName": "RBBzurr1.json?exp=1768594319106&sig=8636a7a163d76ae00d0b17dcb22f7c4a",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 21,
        "name": "V-Ups",
        "imName": "Pike Lean",
        "imageName": "MNPE3",
        "element": "MN/PE3",
        "elementFullName": "Manna",
        "progressionLevel": 3,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x30s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 21,
              "description": "1) Keep the back flat and the chest high.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 21,
              "description": "2) Pike as much as possible at the top of each repetition.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 21,
              "description": "1) Press the hips back strongly into the stretch.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 21,
              "description": "2) Allow the lats to lengthen and relax into the stretch.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 557,
              "exerciseId": 21,
              "tag": 1,
              "videoName": "zBkkVt4v.json?exp=1768594319106&sig=e4c94190f845193909fdbd49a6235026",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 558,
              "exerciseId": 21,
              "tag": 2,
              "videoName": "DdpxHpC0.json?exp=1768594319106&sig=7d706f5967e70735343c95d85c1d23ce",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 583,
              "exerciseId": 21,
              "tag": 4,
              "videoName": "LsEnNhbd.json?exp=1768594319106&sig=9e93d010faed1df6c00b39ced99b2472",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 584,
              "exerciseId": 21,
              "tag": 4,
              "videoName": "IIDX927Q.json?exp=1768594319106&sig=450cbdd2eac3aae2d2f7474815927722",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 22,
        "name": "1/2 Tuck Hanging Leg Lift",
        "imName": "Standing Weighted Pike Hang",
        "imageName": "MNPE4",
        "element": "MN/PE4",
        "elementFullName": "Manna",
        "progressionLevel": 4,
        "repsOrSecs": "5x5r",
        "imRepsOrSecs": "5x30s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 22,
              "description": "1) Keep the lower back pressed back firmly into the wall.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 22,
              "description": "2) Pull the knees up, do not swing or kick them up.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 22,
              "description": "1) Make sure you are using a safe surface to stretch on.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 22,
              "description": "2) Using 45-95lbs is sufficient load for most people.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 585,
              "exerciseId": 22,
              "tag": 1,
              "videoName": "JGkPnr4Z.json?exp=1768594319106&sig=cf5a93ff62dba2a31247e68f08dfdceb",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 586,
              "exerciseId": 22,
              "tag": 2,
              "videoName": "rDVLhDuc.json?exp=1768594319106&sig=8a8b9642334317c392adc8bdb41688bc",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 607,
              "exerciseId": 22,
              "tag": 4,
              "videoName": "WNzwhAJK.json?exp=1768594319106&sig=248840ac22a8323c61450351f2efd827",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 608,
              "exerciseId": 22,
              "tag": 4,
              "videoName": "fH0rje4J.json?exp=1768594319106&sig=6f536808afb9377431a02ff9d5511007",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 23,
        "name": "1/2 Hanging Leg Lift",
        "imName": "Vertical Pike Walk",
        "imageName": "MNPE5",
        "element": "MN/PE5",
        "elementFullName": "Manna",
        "progressionLevel": 5,
        "repsOrSecs": "5x5r",
        "imRepsOrSecs": "5x1r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 23,
              "description": "1) Do not allow the knees to bend during the leg lift.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 23,
              "description": "2) Keep the elbows straight, do not use your biceps to help.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 23,
              "description": "1) Moderate discomfort is acceptable; do not work too hard.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 23,
              "description": "2) Allow the body to relax and lengthen into the stretch.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 609,
              "exerciseId": 23,
              "tag": 1,
              "videoName": "6bFNtnp2.json?exp=1768594319106&sig=8056750bd172deba8dc9f8dc75cae7f1",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 610,
              "exerciseId": 23,
              "tag": 2,
              "videoName": "rgGcBnZ1.json?exp=1768594319106&sig=61ea1a21073cfaee83b96760a8eae3c1",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 635,
              "exerciseId": 23,
              "tag": 4,
              "videoName": "iaL3iQWK.json?exp=1768594319106&sig=d89d82cc4448986373951fa047197924",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 636,
              "exerciseId": 23,
              "tag": 4,
              "videoName": "6cDSiAsZ.json?exp=1768594319106&sig=dfc90241ee027d6f3f6ecba9d4a89319",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 24,
        "name": "Negative Hanging Leg Lift ",
        "imName": "Vertical Pike Pull",
        "imageName": "MNPE6",
        "element": "MN/PE6",
        "elementFullName": "Manna",
        "progressionLevel": 6,
        "repsOrSecs": "5x5rx10s",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 24,
              "description": "1) Each negative should require 10 seconds to descend.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 24,
              "description": "2) Completely straighten the knees at the top of each rep.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 24,
              "description": "1) Keep the knees and elbows locked at all times.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 24,
              "description": "2) Descend only to a depth you are comfortable with.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 637,
              "exerciseId": 24,
              "tag": 1,
              "videoName": "qTdWw1Zh.json?exp=1768594319106&sig=33db3decb64390e879d3a571d80c555b",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 638,
              "exerciseId": 24,
              "tag": 2,
              "videoName": "DTIsdlNA.json?exp=1768594319106&sig=a176d0660823d4fa9736404c95bc2e80",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 663,
              "exerciseId": 24,
              "tag": 4,
              "videoName": "UCSQMNF2.json?exp=1768594319106&sig=85860e25e315463d450e3bc4bdc53f8b",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 664,
              "exerciseId": 24,
              "tag": 4,
              "videoName": "CZJC5D9d.json?exp=1768594319106&sig=37813d7337d1486124c409cd2df95f51",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      }
    ],
    "Hollow Back Press": [
      {
        "exerciseId": 30,
        "name": "Incline Pushup",
        "imName": "German Arm Swing",
        "imageName": "HBPPE1",
        "element": "HBP/PE1",
        "elementFullName": "Hollow Back Press",
        "progressionLevel": 1,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 30,
              "description": "1) Set the bar to approximately hip height.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 30,
              "description": "2) The bar of a smith machine is a good substitute.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 30,
              "description": "1) Allow the arms to swing loosely and smoothly.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 30,
              "description": "2) Keep the elbow behind the ear at the top of the swing.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 798,
              "exerciseId": 30,
              "tag": 1,
              "videoName": "VNAIf59d.json?exp=1768594319106&sig=ce79cc265ea79a452be3c8b992673804",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 799,
              "exerciseId": 30,
              "tag": 2,
              "videoName": "sSwaZ69q.json?exp=1768594319106&sig=e9e24202f9ddfadfb801f08397db1bd1",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 824,
              "exerciseId": 30,
              "tag": 4,
              "videoName": "IP1MFSPF.json?exp=1768594319106&sig=977e2ecc1f3eb17e3d7b4ed34727202c",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 825,
              "exerciseId": 30,
              "tag": 4,
              "videoName": "npUh5tRS.json?exp=1768594319106&sig=047c61fb43a8b561f1a2dd450aa41c52",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 31,
        "name": "Pushup",
        "imName": "Xiaopeng Forward",
        "imageName": "HBPPE2",
        "element": "HBP/PE2",
        "elementFullName": "Hollow Back Press",
        "progressionLevel": 2,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 31,
              "description": "1) Lower the chest completely to the ground each rep.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 31,
              "description": "2) Do not allow the body to sag at any time.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 31,
              "description": "1) Using a 5-10lb dumbbell is sufficient for most people.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 31,
              "description": "2) Lift the weight smoothly and with control; do not swing.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 826,
              "exerciseId": 31,
              "tag": 1,
              "videoName": "N1mmYWwe.json?exp=1768594319106&sig=cc831823416997550bfa8ba047d0a0be",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 827,
              "exerciseId": 31,
              "tag": 2,
              "videoName": "QT6UUPyU.json?exp=1768594319106&sig=1445c5c58bac71b32ef98c9ac9701e81",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 852,
              "exerciseId": 31,
              "tag": 4,
              "videoName": "be3f6qgU.json?exp=1768594319106&sig=98c753da4ccb603ca25af70c0572075d",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 853,
              "exerciseId": 31,
              "tag": 4,
              "videoName": "YG9v292Y.json?exp=1768594319106&sig=cc5a5dcede4d565463205b8a60aaea9b",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 32,
        "name": "Pseudo Planche Pushup",
        "imName": "Xiaopeng Backward",
        "imageName": "HBPPE3",
        "element": "HBP/PE3",
        "elementFullName": "Hollow Back Press",
        "progressionLevel": 3,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 32,
              "description": "1) Lean forward until the hands are just in front of the hips.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 32,
              "description": "2) Keep the scapula strongly protracted and depressed.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 32,
              "description": "1) Do not allow the weight out to drift out to the side; rather focus on pulling it straight back and up over your torso.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 854,
              "exerciseId": 32,
              "tag": 1,
              "videoName": "irjAn1yY.json?exp=1768594319106&sig=f1ef1159082eecfc40e557fa820fcf73",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 855,
              "exerciseId": 32,
              "tag": 2,
              "videoName": "ShEklRnB.json?exp=1768594319106&sig=6a8f7e04caf74f97cd9958a4e85b479e",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 880,
              "exerciseId": 32,
              "tag": 4,
              "videoName": "b8LYHpKg.json?exp=1768594319106&sig=183e7251e106518bcc51a4b2ab301e2b",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 881,
              "exerciseId": 32,
              "tag": 4,
              "videoName": "TRS8ubT5.json?exp=1768594319106&sig=02c9c65bca4d99697391d7a19703cbb9",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 33,
        "name": "Bench Dip",
        "imName": "Double Arm Circle Backward",
        "imageName": "HBPPE4",
        "element": "HBP/PE4",
        "elementFullName": "Hollow Back Press",
        "progressionLevel": 4,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 33,
              "description": "1) Initially you may find that you prefer descending only to 90 degrees until your shoulder mobility improves.",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 33,
              "description": "1) Keep the elbows straight and extended.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 33,
              "description": "2) The arms should come relatively close to the ears.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 882,
              "exerciseId": 33,
              "tag": 1,
              "videoName": "GLst45PR.json?exp=1768594319107&sig=33989910de76020e28e24ec8d5fc93bf",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 883,
              "exerciseId": 33,
              "tag": 2,
              "videoName": "8M17jIOC.json?exp=1768594319107&sig=fe42d2fe229bd7fac9cebb0808c0f5f5",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 908,
              "exerciseId": 33,
              "tag": 4,
              "videoName": "tojbZB80.json?exp=1768594319107&sig=1d260dd40fe6a9ff5784c68a8c9529d2",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 909,
              "exerciseId": 33,
              "tag": 4,
              "videoName": "77dNAhgH.json?exp=1768594319107&sig=99bce7798450ae78f5394a35b80b3d99",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 34,
        "name": "Negative Parallel Bar Dip",
        "imName": "Double Arm Circle Forward",
        "imageName": "HBPPE5",
        "element": "HBP/PE5",
        "elementFullName": "Hollow Back Press",
        "progressionLevel": 5,
        "repsOrSecs": "5x5rx10s",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 34,
              "description": "1) A single repetition is comprised of a 10 second descent; thus each set contains 50 seconds total time under tension .",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 34,
              "description": "1) Beginning the arm circle by initially turning the little finger upward will greatly smooth out the arc of movement.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 910,
              "exerciseId": 34,
              "tag": 1,
              "videoName": "NgEIoukA.json?exp=1768594319107&sig=ca380ca6e0411554130925c3741bcf47",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 911,
              "exerciseId": 34,
              "tag": 2,
              "videoName": "pm0rMQ4t.json?exp=1768594319107&sig=1d13d556ac3ffc05a9c8813b81a8974d",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 936,
              "exerciseId": 34,
              "tag": 4,
              "videoName": "1iQ45WAh.json?exp=1768594319107&sig=4f3aea85ca7357cf0835325d8dabd049",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 937,
              "exerciseId": 34,
              "tag": 4,
              "videoName": "CEUef30m.json?exp=1768594319107&sig=11a277462ff1a01aabdd064f8fe7525f",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 35,
        "name": "Parallel Bar Dip",
        "imName": "Single Arm Bent Cat",
        "imageName": "HBPPE6",
        "element": "HBP/PE6",
        "elementFullName": "Hollow Back Press",
        "progressionLevel": 6,
        "repsOrSecs": "5x5r",
        "imRepsOrSecs": "5x30s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 35,
              "description": "1) The shoulders should be reasonably close to the hands at the bottom of each repetition.",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 35,
              "description": "1) Keeping the back flat and the ribs pulled in will greatly increase the efficacy of this stretch.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 938,
              "exerciseId": 35,
              "tag": 1,
              "videoName": "Z9DpvqbS.json?exp=1768594319107&sig=73b25e3a2a4b317e27d2bc2a0b6b5427",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 939,
              "exerciseId": 35,
              "tag": 2,
              "videoName": "lA1GTHNo.json?exp=1768594319107&sig=d802f49ba68cfb2ac6f3c537eddea201",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 964,
              "exerciseId": 35,
              "tag": 4,
              "videoName": "LmdIZG6Z.json?exp=1768594319107&sig=1af909d8235e31764b063c68f313575c",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 965,
              "exerciseId": 35,
              "tag": 4,
              "videoName": "6viXt2Lb.json?exp=1768594319107&sig=a89038904371bb20d42da64fdc29b9ac",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      }
    ],
    "Rope Climb": [
      {
        "exerciseId": 36,
        "name": "Incline Row",
        "imName": "One Arm Upright Lat Lean",
        "imageName": "RCPE1",
        "element": "RC/PE1",
        "elementFullName": "Rope Climb",
        "progressionLevel": 1,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x15s@",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 36,
              "description": "1) Do not allow the body to sag during the row.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 36,
              "description": "2) Lower down, do not bounce down, at the end of each rep.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 36,
              "description": "1) Sit back strongly while keeping the torso upright.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 966,
              "exerciseId": 36,
              "tag": 1,
              "videoName": "DldFHFsr.json?exp=1768594319107&sig=8477337f3f7c3fb35ae33582ed821192",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 967,
              "exerciseId": 36,
              "tag": 2,
              "videoName": "xB76qD36.json?exp=1768594319107&sig=0fb7062e29161b142b00b5e20e983a8f",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 992,
              "exerciseId": 36,
              "tag": 4,
              "videoName": "yzByRFxd.json?exp=1768594319107&sig=3c339ac7d6131af4c51390f356d0588b",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 993,
              "exerciseId": 36,
              "tag": 4,
              "videoName": "9a3q1BS8.json?exp=1768594319107&sig=a1deb8b592fe354358b099de0d016386",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 37,
        "name": "Ground Rows",
        "imName": "Bent Sideways Lat Stretch",
        "imageName": "RCPE2",
        "element": "RC/PE2",
        "elementFullName": "Rope Climb",
        "progressionLevel": 2,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x15s@",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 37,
              "description": "1) At full extension of the arms, the shoulders should be just off the ground.",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 37,
              "description": "1) Keep the hands and hips relatively stationary while laying the upper arm on the ear and stretching the lat sideways.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 994,
              "exerciseId": 37,
              "tag": 1,
              "videoName": "ORm9YMI2.json?exp=1768594319107&sig=0aab63d64c2fa0009d31cb0ca7a0991c",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 995,
              "exerciseId": 37,
              "tag": 2,
              "videoName": "FpWSWxDw.json?exp=1768594319107&sig=c4c1cbbf456c08a5ed4e8fad0f403daf",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 1020,
              "exerciseId": 37,
              "tag": 4,
              "videoName": "iokWoz59.json?exp=1768594319107&sig=780d4314822213bb4c2e7267cae1d2fc",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 1021,
              "exerciseId": 37,
              "tag": 4,
              "videoName": "mqspPI57.json?exp=1768594319107&sig=46619dce246d5160f1729bfc73f2b77c",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 38,
        "name": "Elevated Row",
        "imName": "Bent Twisting Lat Static",
        "imageName": "RCPE3",
        "element": "RC/PE3",
        "elementFullName": "Rope Climb",
        "progressionLevel": 3,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x15s@",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 38,
              "description": "1) Elevate the feet to approximately ring height.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 38,
              "description": "2) Do not allow the body to sag at any time.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 38,
              "description": "1) Twist the torso sideways over the arm while continually pulling against the hands and pressing the hips back.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1022,
              "exerciseId": 38,
              "tag": 1,
              "videoName": "BVNBV6zL.json?exp=1768594319107&sig=2e3fc366586fafa67633bf996a252642",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 1023,
              "exerciseId": 38,
              "tag": 2,
              "videoName": "vibpxgBW.json?exp=1768594319107&sig=6b96df1cd4566f43478b1e28a6f32783",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 1048,
              "exerciseId": 38,
              "tag": 4,
              "videoName": "QV5qjfIz.json?exp=1768594319107&sig=44263a3659dd35df4923a1a8488fafe8",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 1049,
              "exerciseId": 38,
              "tag": 4,
              "videoName": "6yzQRctU.json?exp=1768594319107&sig=472a19e2740d7323b4a3e28d4ca041b1",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 39,
        "name": "Bulgarian Row",
        "imName": "Bent Twisting Lat Reps",
        "imageName": "RCPE4",
        "element": "RC/PE4",
        "elementFullName": "Rope Climb",
        "progressionLevel": 4,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 39,
              "description": "1) Do not allow the elbows to drift forward of the shoulders.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 39,
              "description": "2) Pull to an approximately 90 degree elbow bend.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 39,
              "description": "1) Failure to maintain constant backward pressure on the hands and hips will greatly minimize this stretch.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1050,
              "exerciseId": 39,
              "tag": 1,
              "videoName": "g0BC4F2b.json?exp=1768594319107&sig=44f4bd69ac18840eb0932c38b606e57b",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 1051,
              "exerciseId": 39,
              "tag": 2,
              "videoName": "KMPzsJNc.json?exp=1768594319107&sig=73c263793a5c191c97d6f95f530251ee",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 1076,
              "exerciseId": 39,
              "tag": 4,
              "videoName": "BZrRCpDq.json?exp=1768594319107&sig=99ee7c919630ba06157689dbf077cb1d",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 1077,
              "exerciseId": 39,
              "tag": 4,
              "videoName": "ZrthMS7y.json?exp=1768594319107&sig=19b2892b4a57cb68daeea9b907c1e42b",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 40,
        "name": "Hinge Row",
        "imName": "Overgrip Bent Lean",
        "imageName": "RCPE5",
        "element": "RC/PE5",
        "elementFullName": "Rope Climb",
        "progressionLevel": 5,
        "repsOrSecs": "5x5r",
        "imRepsOrSecs": "5x30s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 40,
              "description": "1) Begin with the glutes and shoulders just off the ground.",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 40,
              "description": "1) Keeping the arms by the ears, use the hips pressing backward to lengthen the lats into this stretch.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 40,
              "description": "2) Attempt to feel the lat relax and go deeper into the stretch.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1078,
              "exerciseId": 40,
              "tag": 1,
              "videoName": "gSIBwd4Y.json?exp=1768594319107&sig=1ed1e60abbee6355cf1d6e4d6e1e599c",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 1079,
              "exerciseId": 40,
              "tag": 2,
              "videoName": "zCcalB7Q.json?exp=1768594319107&sig=6bfad4459e73f41ecef463a481369e4c",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 1104,
              "exerciseId": 40,
              "tag": 4,
              "videoName": "SOezsufe.json?exp=1768594319107&sig=2ba4efe1dd0aefeec9cc39d694f0888f",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 1105,
              "exerciseId": 40,
              "tag": 4,
              "videoName": "Wvaoy4lb.json?exp=1768594319107&sig=640fdbc54a9cd028d289a217c07f2799",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 41,
        "name": "Bent Arm Chin Hang",
        "imName": "Overgrip Bent Pull",
        "imageName": "RCPE6",
        "element": "RC/PE6",
        "elementFullName": "Rope Climb",
        "progressionLevel": 6,
        "repsOrSecs": "5x30s",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 41,
              "description": "1) Chin over the bar is the minimum acceptable height.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 41,
              "description": "2) Do not allow the neck or chin to touch the bar.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 41,
              "description": "1) Come to a stand by pulling down strongly on the bar.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 41,
              "description": "2) Sink deeply into the stretch at the bottom of each rep.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1106,
              "exerciseId": 41,
              "tag": 1,
              "videoName": "hWKSttp8.json?exp=1768594319107&sig=f08cac087e1d4a334fb177085ac9cc4f",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 1107,
              "exerciseId": 41,
              "tag": 2,
              "videoName": "kI5S8npV.json?exp=1768594319107&sig=15965c6ec767c51f513c1786d017cc3f",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 1130,
              "exerciseId": 41,
              "tag": 4,
              "videoName": "HA5LWvRU.json?exp=1768594319107&sig=7adb9b5124b33a7cf499ebc44e86c943",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 1131,
              "exerciseId": 41,
              "tag": 4,
              "videoName": "VpJv4z4T.json?exp=1768594319107&sig=9f31e9801ccd6b32ad2fc1d73f2a3672",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      }
    ],
    "Straddle Planche": [
      {
        "exerciseId": 7,
        "name": "Scapular Shrugs",
        "imName": "Swivel Hips",
        "imageName": "sPLPE1",
        "element": "sPL/PE1",
        "elementFullName": "Straddle Planche",
        "progressionLevel": 1,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 7,
              "description": "1) Pinch the shoulder blades together at the bottom.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 7,
              "description": "2) Pull the shoulder blades apart at the top.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 7,
              "description": "1) Maintain a 90 degree angle in the hips and knees.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 7,
              "description": "2) Keep the glutes on the ground at all times.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 167,
              "exerciseId": 7,
              "tag": 1,
              "videoName": "g3VEVzG9.json?exp=1768594319107&sig=97bc067a5a6072c2cf623e6449e30de0",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 168,
              "exerciseId": 7,
              "tag": 2,
              "videoName": "DAaTAFO3.json?exp=1768594319107&sig=8af03e5d157cb4e2be68e014573e4e6c",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 193,
              "exerciseId": 7,
              "tag": 4,
              "videoName": "93mM4c9F.json?exp=1768594319107&sig=0ea55987436be6ea94f97b29208af712",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 194,
              "exerciseId": 7,
              "tag": 4,
              "videoName": "goeXjAS2.json?exp=1768594319107&sig=d2289fc3cf631c11fb9c45ac3a433010",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 8,
        "name": "Forearm Plank",
        "imName": "Straddle Running Man",
        "imageName": "sPLPE2",
        "element": "sPL/PE2",
        "elementFullName": "Straddle Planche",
        "progressionLevel": 2,
        "repsOrSecs": "5x60s",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 8,
              "description": "1) Keep the hips tucked and the back curled.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 8,
              "description": "2) A neutral chin will be the most comfortable.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 8,
              "description": "1) Extend the working leg as far sideways as possible.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 8,
              "description": "2) Expect to enjoy significant cramping of the medial glutes!",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 195,
              "exerciseId": 8,
              "tag": 1,
              "videoName": "LHjfJ0GC.json?exp=1768594319107&sig=c66006fb8640903e8ce8cb5eeadd5850",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 196,
              "exerciseId": 8,
              "tag": 2,
              "videoName": "MsYiM8U8.json?exp=1768594319107&sig=8d73f343c9e6f1631a14d1da151574aa",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 221,
              "exerciseId": 8,
              "tag": 4,
              "videoName": "TYgbrVWS.json?exp=1768594319107&sig=d8e0eb61fda0e6792716d59f3430bb81",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 222,
              "exerciseId": 8,
              "tag": 4,
              "videoName": "LXQOsdjo.json?exp=1768594319107&sig=4ef33b06f3f49254171e304e87287446",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 9,
        "name": "Plank",
        "imName": "Straddle Modified Reverse Hyper",
        "imageName": "sPLPE3",
        "element": "sPL/PE3",
        "elementFullName": "Straddle Planche",
        "progressionLevel": 3,
        "repsOrSecs": "5x60s",
        "imRepsOrSecs": "5x5r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 9,
              "description": "1) Keep the shoulders directly over the hands.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 9,
              "description": "2) Do not allow the body to sag or arch.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 9,
              "description": "1) Be sure to completely elevate the feet to hip height.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 9,
              "description": "2) Pause briefly at the top of each repetition.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 223,
              "exerciseId": 9,
              "tag": 1,
              "videoName": "6bpZTxQ4.json?exp=1768594319107&sig=30eab44502f8d097fc8d9f80d1502bf8",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 224,
              "exerciseId": 9,
              "tag": 2,
              "videoName": "9qAI6BgJ.json?exp=1768594319107&sig=420bee04f0783443aec91bc81f2bc8e2",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 249,
              "exerciseId": 9,
              "tag": 4,
              "videoName": "SUobvmcY.json?exp=1768594319107&sig=11e6a7addc9073990c34625b5829c076",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 250,
              "exerciseId": 9,
              "tag": 4,
              "videoName": "AxgKivYV.json?exp=1768594319107&sig=153d396c3e4e84ec7e36db3f66599552",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 10,
        "name": "Single Arm Plank",
        "imName": "Straddle Donkey Kick",
        "imageName": "sPLPE4",
        "element": "sPL/PE4",
        "elementFullName": "Straddle Planche",
        "progressionLevel": 4,
        "repsOrSecs": "5x30s",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 10,
              "description": "1) 30 seconds on both arms counts as a single set.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 10,
              "description": "2) Keep the supporting shoulder completely extended.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 10,
              "description": "1) Do not allow the non-working leg to drop below the hips.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 10,
              "description": "2) Pause briefly at the top in between repetitions.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 251,
              "exerciseId": 10,
              "tag": 1,
              "videoName": "JLu3XmNJ.json?exp=1768594319107&sig=945ee675a420a8296d30c41e1b5d2577",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 252,
              "exerciseId": 10,
              "tag": 2,
              "videoName": "gWZvkz6n.json?exp=1768594319107&sig=40bbb4bcafdb438534e3477d388708c6",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 277,
              "exerciseId": 10,
              "tag": 4,
              "videoName": "zp7IHdCk.json?exp=1768594319107&sig=9044f325cb16fc2ddd5656c6abeb9b83",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 278,
              "exerciseId": 10,
              "tag": 4,
              "videoName": "K8TXOMuI.json?exp=1768594319107&sig=b2bdd84c1305dfecae449132f832feac",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 11,
        "name": "Planche Lean",
        "imName": "Prone Half Straddle Planche Hold",
        "imageName": "sPLPE5",
        "element": "sPL/PE5",
        "elementFullName": "Straddle Planche",
        "progressionLevel": 5,
        "repsOrSecs": "5x30s",
        "imRepsOrSecs": "5x10s",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 11,
              "description": "1) Protracting and depressing the scapula (shoulder blades) will greatly strengthen your planche lean position.",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 11,
              "description": "1) Maintain the knees elevated to hip height at all times.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 11,
              "description": "2) At a minimum the feet must pull in over the knees.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 279,
              "exerciseId": 11,
              "tag": 1,
              "videoName": "PoZYNKOS.json?exp=1768594319107&sig=ff239cb032a9cfe4c23a3dcab95b8963",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 280,
              "exerciseId": 11,
              "tag": 2,
              "videoName": "QkceuRfF.json?exp=1768594319107&sig=743715da947090d69a1bea0913fc4473",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 305,
              "exerciseId": 11,
              "tag": 4,
              "videoName": "dTamPLRG.json?exp=1768594319107&sig=05f0ed28689a126731e0a0349030703b",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 306,
              "exerciseId": 11,
              "tag": 4,
              "videoName": "c0xVQasB.json?exp=1768594319107&sig=908214aaa61725b0ab6b5617a5f1f53a",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 12,
        "name": "Elevated Planche Lean",
        "imName": "Prone Half Straddle Planche Single Leg Extension",
        "imageName": "sPLPE6",
        "element": "sPL/PE6",
        "elementFullName": "Straddle Planche",
        "progressionLevel": 6,
        "repsOrSecs": "5x30s",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 12,
              "description": "1) Place a furniture slider under the feet to reduce friction.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 12,
              "description": "2) Lean forward until the hips are over the hands.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 12,
              "description": "1) Do not allow either knee (both working leg and non-working leg) to drop below hip height during this exercise.",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 307,
              "exerciseId": 12,
              "tag": 1,
              "videoName": "zsef3sS2.json?exp=1768594319107&sig=cc6156174429c91795a52b2b0d1648db",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 308,
              "exerciseId": 12,
              "tag": 2,
              "videoName": "VXkLi8v4.json?exp=1768594319107&sig=4f4e812cc6e28f5b6be9562042a730d2",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 331,
              "exerciseId": 12,
              "tag": 4,
              "videoName": "MbfwVY2c.json?exp=1768594319107&sig=c54f5842e18c82f46ed9a9df7c5ad5a0",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 332,
              "exerciseId": 12,
              "tag": 4,
              "videoName": "fXT2PUxA.json?exp=1768594319107&sig=5e767020708eb89c6412d9323dc7309c",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      }
    ],
    "Single Leg Squat": [
      {
        "exerciseId": 25,
        "name": "Assisted Squat",
        "imName": "Sideprone Lift",
        "imageName": "SLSPE1",
        "element": "SLS/PE1",
        "elementFullName": "Single Leg Squat",
        "progressionLevel": 1,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x3r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 25,
              "description": "1) Sit backwards into the squat rather than allowing the knees to come forward",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 25,
              "description": "1) Toes should be pulled back and not pointed in the mobility ",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1857,
              "exerciseId": 25,
              "tag": 1,
              "videoName": "SqiOEsrj.json?exp=1768594319107&sig=a0945df08b6bf2845ad51c79dc5f7529",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 1858,
              "exerciseId": 25,
              "tag": 2,
              "videoName": "EqMaiUSk.json?exp=1768594319107&sig=42857db94ed7b93b0058ae66b58d531f",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 689,
              "exerciseId": 25,
              "tag": 4,
              "videoName": "ZcTbD4fJ.json?exp=1768594319107&sig=c3bd43761d951d301fb6dc7b78652233",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 690,
              "exerciseId": 25,
              "tag": 4,
              "videoName": "QWWVXuIt.json?exp=1768594319107&sig=4dce9dd93771d4501153d862dbed2108",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 26,
        "name": "Parallel Squat",
        "imName": "Kneeling Side Lift",
        "imageName": "SLSPE2",
        "element": "SLS/PE2",
        "elementFullName": "Single Leg Squat",
        "progressionLevel": 2,
        "repsOrSecs": "5x15r",
        "imRepsOrSecs": "5x3r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 26,
              "description": "1) The arms may be used to help counter balance the squat",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 26,
              "description": "1) The upper body and non-working leg should remain stationary while performing the mobility",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1859,
              "exerciseId": 26,
              "tag": 1,
              "videoName": "jg7E6h1i.json?exp=1768594319107&sig=e7fc6c9fcfb8b1192020acff59a2ab7d",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 691,
              "exerciseId": 26,
              "tag": 2,
              "videoName": "Vrj0rtl5.json?exp=1768594319107&sig=00a0301db1ed6db378e4dabdcb1a581e",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 1860,
              "exerciseId": 26,
              "tag": 2,
              "videoName": "lBvDY2tU.json?exp=1768594319107&sig=a4f7d2502ff9e281f12a0798ddd64ea7",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 716,
              "exerciseId": 26,
              "tag": 4,
              "videoName": "rYEvWN3m.json?exp=1768594319107&sig=09e17f6e83cb36f76e6da046d13ce941",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 717,
              "exerciseId": 26,
              "tag": 4,
              "videoName": "avW13hfO.json?exp=1768594319107&sig=09190d7cb23a01360d6013ca73b06afa",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 27,
        "name": "Full Squat",
        "imName": "Kneeling Circle",
        "imageName": "SLSPE3",
        "element": "SLS/PE3",
        "elementFullName": "Single Leg Squat",
        "progressionLevel": 3,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x3r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 27,
              "description": "1) Glutes should be close to the ground in a full squat",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 27,
              "description": "1) The working leg should be smooth and controlled",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1861,
              "exerciseId": 27,
              "tag": 1,
              "videoName": "ZvwfgoAa.json?exp=1768594319107&sig=71b5af556810f7b233ddbcaa0f5d2eea",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 1862,
              "exerciseId": 27,
              "tag": 2,
              "videoName": "trUeH5Z6.json?exp=1768594319107&sig=f8dc6c231261ce7a238133b818ac44f7",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 742,
              "exerciseId": 27,
              "tag": 4,
              "videoName": "08mpeAWB.json?exp=1768594319107&sig=c76c4cc2b172b76353061b4c1b1963d1",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 743,
              "exerciseId": 27,
              "tag": 4,
              "videoName": "ZgwnooAj.json?exp=1768594319107&sig=4568116160643c7465a6d633b45cda50",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 28,
        "name": "Elevated Deck Squat",
        "imName": "Kneeling Parallel Slide",
        "imageName": "SLSPE4",
        "element": "SLS/PE4",
        "elementFullName": "Single Leg Squat",
        "progressionLevel": 4,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x3r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 28,
              "description": "1) Use as many mats as necessary at first and remove them over time",
              "type": 1,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exerciseId": 28,
              "description": "1) Do not allow the knee to unlock while performing this mobility",
              "type": 2,
              "order": 1
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 1863,
              "exerciseId": 28,
              "tag": 1,
              "videoName": "vIJYhrXJ.json?exp=1768594319107&sig=dc8890963a33f34714cd0d273479df9f",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 1864,
              "exerciseId": 28,
              "tag": 2,
              "videoName": "gUiCjrzZ.json?exp=1768594319107&sig=325b8104a02878022bdb9d63d516ba54",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 768,
              "exerciseId": 28,
              "tag": 4,
              "videoName": "NAS84yYz.json?exp=1768594319107&sig=b829811410ff5562ea98b9424e7555af",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 769,
              "exerciseId": 28,
              "tag": 4,
              "videoName": "n2WCCL9D.json?exp=1768594319108&sig=93e0c9ad8fa832b85d93f2c3053d3527",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      },
      {
        "exerciseId": 29,
        "name": "Deck Squat",
        "imName": "Skiers",
        "imageName": "SLSPE5",
        "element": "SLS/PE5",
        "elementFullName": "Single Leg Squat",
        "progressionLevel": 5,
        "repsOrSecs": "5x10r",
        "imRepsOrSecs": "5x10r",
        "exercisesFocusPoints": {
          "strength": [
            {
              "exerciseId": 29,
              "description": "1) Pulling the glutes in tight to the feet smooths the roll.",
              "type": 1,
              "order": 1
            },
            {
              "exerciseId": 29,
              "description": "2) Keep the back round and the chin tucked when rolling.",
              "type": 1,
              "order": 2
            }
          ],
          "mobility": [
            {
              "exerciseId": 29,
              "description": "1) Keep the knees stationary and swivel the hips to the side.",
              "type": 2,
              "order": 1
            },
            {
              "exerciseId": 29,
              "description": "2) The glutes should lower to approximately knee height.",
              "type": 2,
              "order": 2
            }
          ]
        },
        "exercisesVideos": {
          "strength": [
            {
              "exercisesVideoId": 770,
              "exerciseId": 29,
              "tag": 1,
              "videoName": "Lu7zXAtZ.json?exp=1768594319108&sig=b4e081275c0052d7eef4611858c544bf",
              "weekNum": 0,
              "order": 1
            }
          ],
          "mobility": [
            {
              "exercisesVideoId": 771,
              "exerciseId": 29,
              "tag": 2,
              "videoName": "CcwVqdiI.json?exp=1768594319108&sig=fab992b3db2d501a47328f9e0d621bba",
              "weekNum": 0,
              "order": 1
            }
          ],
          "tips": [
            {
              "exercisesVideoId": 796,
              "exerciseId": 29,
              "tag": 4,
              "videoName": "SJnLZAVF.json?exp=1768594319108&sig=dd91d38e058debcfdb976425f6b44e04",
              "weekNum": 0,
              "order": 1
            },
            {
              "exercisesVideoId": 797,
              "exerciseId": 29,
              "tag": 4,
              "videoName": "oNtAHM0W.json?exp=1768594319108&sig=5d6424621d3f38ace2838a400dd35957",
              "weekNum": 0,
              "order": 2
            }
          ]
        }
      }
    ]
  }
}

const CourseLibrary = (props) => {
  const classes = useStyles();
  const { webToken, UserId } = useSelector(state => state.login);
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';
  const secondRowRef = useRef();
  const thirdRowRef = useRef();
  const allProgsRef = useRef();

  const [secondRow, setSecondRow] = useState({
    data: [],
    show: false,
  });

  const [thirdRow, setThirdRow] = useState({
    data: [],
    show: false,
    loading: false
  });

  const [playerState, setPlayerState] = useState({
    open: false,
    videoName: '',
    title: '',
  });

  const [allProgs, setAllProgs] = useState([]);

  const [ohNoModal, setOhNoModal] = useState(false);

  const [hideReps, setHideReps] = useState(false);

  useEffect(() => {
    if (secondRow.show) {
      secondRowRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    }
  }, [secondRow])

  useEffect(() => {
    if (thirdRow.show) {
      thirdRowRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    }
  }, [thirdRow])

  useEffect(() => {
    if (allProgs.length > 0) {
      allProgsRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    }
  }, [allProgs])

  const handleCardClick = row => {
    console.log("row in handleCardClick is:", row.associatedCourses)
    if (row.associatedCourses && row.associatedCourses.length > 0) {
      console.log("if (row.associatedCourses && row.associatedCourses.length > 0) {")
      setSecondRow({
        show: true,
        data: row.associatedCourses
      })
      if (thirdRow.show) {
        setThirdRow({
          show: false,
          data: [],
          loading: false
        })
      }
      if (allProgs.length > 0) {
        setAllProgs([]);
      }
    }
    else {
      console.log("else secondRow", secondRow)
      if (secondRow.show) {
        setSecondRow({
          show: false,
          data: [],
        })
      }
      handleThirdRowClick(row);
    }
  }

  const handleThirdRowClick = row => {
    console.log("row in handleThirdRowClick is:", row)

    setThirdRow({
      ...thirdRow,
      show: true,
      loading: true
    })

    const config = {
      method: 'get',
      url: `${API}/workout-service/course-library/users/${UserId}/?workoutName=${row.nameId}`,
      headers: {
        Authorization: `Bearer ${webToken}`
      }
    }

    if (allProgs.length > 0) {
      setAllProgs([]);
    }


    axios(config).then(response => {
      console.log("response.data is:", response.data)
      const keys = Object.keys(response.data);
      if (response.data === "YOU AREN'T ENROLLED IN THIS COURSE.") {
        console.log('YOU AREN\'T ENROLLED IN THIS COURSE');
        setThirdRow({
          show: false,
          data: [],
          loading: false
        })
        setOhNoModal(true);
      }
      else {
        setThirdRow({
          show: true,
          data: keys,
          loading: false,
          imagePrefix: cleanName(row.name ? row.name : row.courseName),
          allData: response.data
        })
      }
    }).catch(error => {
      // console.log("error is:",error)
      let responseData = {
        "Front Lever": [
          {
            "exerciseId": 1,
            "name": "Bent Hollow Body Hold",
            "imName": "Cat-Cow",
            "imageName": "FLPE1",
            "element": "FL/PE1",
            "elementFullName": "Front Lever",
            "progressionLevel": 1,
            "repsOrSecs": "5x60s",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 1,
                  "description": "1) Keep the lower back pressed firmly into the ground.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 1,
                  "description": "2) Keep the feet and shoulders off the ground during the set.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 1,
                  "description": "1) Pull the middle of the back upward strongly during cat.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 1,
                  "description": "2) The neck's position should mimic the spine's position.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1,
                  "exerciseId": 1,
                  "tag": 1,
                  "videoName": "beTWQnnC.json?exp=1768596320640&sig=c6dd0b46159c8a7d8b5abb2f4509cdf3",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 2,
                  "exerciseId": 1,
                  "tag": 2,
                  "videoName": "D5ovGHOR.json?exp=1768596320640&sig=cf4dc44c197029d927069074759c674a",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 27,
                  "exerciseId": 1,
                  "tag": 4,
                  "videoName": "MO34nqp2.json?exp=1768596320640&sig=461dc35a33a6d4a60938ed8cccbe92b6",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 28,
                  "exerciseId": 1,
                  "tag": 4,
                  "videoName": "PFklWuZs.json?exp=1768596320640&sig=9facd26e4aef97a5a200c9ee498b84a3",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 2,
            "name": "Bent Hollow Body Rock",
            "imName": "Table",
            "imageName": "FLPE2",
            "element": "FL/PE2",
            "elementFullName": "Front Lever",
            "progressionLevel": 2,
            "repsOrSecs": "5x60r",
            "imRepsOrSecs": "5x30s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 2,
                  "description": "1) An arched lower back will prevent a smooth roll.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 2,
                  "description": "2) Keep the chin pulled downward towards the chest.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 2,
                  "description": "1) Extend the hips upward all the way to shoulder height.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 2,
                  "description": "2) Do not allow the chest to cave in during this extension.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 29,
                  "exerciseId": 2,
                  "tag": 1,
                  "videoName": "vWwjwCfc.json?exp=1768596320640&sig=1f10fcf2b87e87ad84241152e3158ff4",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 30,
                  "exerciseId": 2,
                  "tag": 2,
                  "videoName": "lOYPi26v.json?exp=1768596320640&sig=0a5b5970655744089d8fedd9c00e0c6d",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 55,
                  "exerciseId": 2,
                  "tag": 4,
                  "videoName": "qWIBcgQc.json?exp=1768596320640&sig=f7a8478c39e8c46b67b02568683a1d9e",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 56,
                  "exerciseId": 2,
                  "tag": 4,
                  "videoName": "iLh4Ds8a.json?exp=1768596320640&sig=bb95f3928570ef900211a95053f36e7b",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 3,
            "name": "Straddle Hollow Body Hold",
            "imName": "Table Rock",
            "imageName": "FLPE3",
            "element": "FL/PE3",
            "elementFullName": "Front Lever",
            "progressionLevel": 3,
            "repsOrSecs": "5x60s",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 3,
                  "description": "1) A wider straddle will quite strongly target the hips.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 3,
                  "description": "2) Do not allow the lower back to arch.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 3,
                  "description": "1) Descend fully in between repetitions.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 3,
                  "description": "2) It is normal to feel stretching in the biceps at the top.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 57,
                  "exerciseId": 3,
                  "tag": 1,
                  "videoName": "9EY4bjQ4.json?exp=1768596320640&sig=61ebeba0c3b0c21ed40f670d6a5b7c08",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 58,
                  "exerciseId": 3,
                  "tag": 2,
                  "videoName": "MzJ3fTPy.json?exp=1768596320640&sig=ebf5b074c55a2d7ea5fe9ba8e510521b",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 83,
                  "exerciseId": 3,
                  "tag": 4,
                  "videoName": "uR2wO5ul.json?exp=1768596320640&sig=0702825e6d238847ddbdfb5fa5044c40",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 84,
                  "exerciseId": 3,
                  "tag": 4,
                  "videoName": "XxJPBEHY.json?exp=1768596320640&sig=12ec749f4c30de253ca9c88bb9fe21e6",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 4,
            "name": "Straddle Hollow Body Rock",
            "imName": "Table Inside Out",
            "imageName": "FLPE4",
            "element": "FL/PE4",
            "elementFullName": "Front Lever",
            "progressionLevel": 4,
            "repsOrSecs": "5x60r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 4,
                  "description": "1) Do not allow the feet to lift more than 6-12 inches at most.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 4,
                  "description": "2) Keep the arms in place by the hips at all times.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 4,
                  "description": "1) Down and back is one repetition.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 4,
                  "description": "2) Keep the chest elevated at all times.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 85,
                  "exerciseId": 4,
                  "tag": 1,
                  "videoName": "h9RHgycp.json?exp=1768596320640&sig=5cdb42f2b8635b2a2c90228164dee28c",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 86,
                  "exerciseId": 4,
                  "tag": 2,
                  "videoName": "tW4zNQZ2.json?exp=1768596320640&sig=4793914502f41feaca5c036f29536d29",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 111,
                  "exerciseId": 4,
                  "tag": 4,
                  "videoName": "ubR5lWsx.json?exp=1768596320640&sig=c6c8b7344f5c277c97d9ba6bcb9d10ae",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 112,
                  "exerciseId": 4,
                  "tag": 4,
                  "videoName": "Nk0N3Rya.json?exp=1768596320640&sig=ada430eca6e1dd43bbf246732b118ec4",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 5,
            "name": "Hollow Body Hold",
            "imName": "Shoulder Bridge",
            "imageName": "FLPE5",
            "element": "FL/PE5",
            "elementFullName": "Front Lever",
            "progressionLevel": 5,
            "repsOrSecs": "5x60s",
            "imRepsOrSecs": "5x30s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 5,
                  "description": "1) The arms may also be placed down by the hips, however mastery requires arms overhead.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 5,
                  "description": "2) With a neutral chin keep the eyes focused on the ceiling.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 5,
                  "description": "1) The feet should be near the glutes and under the knees.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 5,
                  "description": "2) Keep the shoulders, neck and head firmly on the floor.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 113,
                  "exerciseId": 5,
                  "tag": 1,
                  "videoName": "pZWNlEYq.json?exp=1768596320640&sig=d428cde8e652e8d91e0ed35114ebe726",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 114,
                  "exerciseId": 5,
                  "tag": 2,
                  "videoName": "1ek8p1EW.json?exp=1768596320640&sig=346a2d9d52d28c421986205352b42027",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 139,
                  "exerciseId": 5,
                  "tag": 4,
                  "videoName": "JdctSWEg.json?exp=1768596320640&sig=de039e53c155e82315a460cb2e024744",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 140,
                  "exerciseId": 5,
                  "tag": 4,
                  "videoName": "HBneVsK4.json?exp=1768596320640&sig=9deb926285714599494fb31f006d34bb",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 6,
            "name": "Hollow Body Rock",
            "imName": "Shoulder Bridge Rock",
            "imageName": "FLPE6",
            "element": "FL/PE6",
            "elementFullName": "Front Lever",
            "progressionLevel": 6,
            "repsOrSecs": "5x60r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 6,
                  "description": "1) Notice the smoothness of this athlete's roll.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 6,
                  "description": "2) Arms may also be placed down next to the hips, however mastery requires arms overhead.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 6,
                  "description": "1) Do not move the feet during the repetitions.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 6,
                  "description": "2) Extend the hips upward as strongly as you are able.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 141,
                  "exerciseId": 6,
                  "tag": 1,
                  "videoName": "5VurhvVf.json?exp=1768596320640&sig=b8e552ffc7c1e2fabf280cb746f0eafc",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 142,
                  "exerciseId": 6,
                  "tag": 2,
                  "videoName": "6l7qEhX5.json?exp=1768596320640&sig=4dc49a11d88545b1a6631a1f5c15b0a5",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 165,
                  "exerciseId": 6,
                  "tag": 4,
                  "videoName": "oAJK5XDv.json?exp=1768596320640&sig=b71159dc5bace05ff3a6fc9df2e07e30",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 166,
                  "exerciseId": 6,
                  "tag": 4,
                  "videoName": "iJHFi87f.json?exp=1768596320640&sig=b04bcfe7cd99c093a28b69ee5aa813e7",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          }
        ],
        "Side Lever": [
          {
            "exerciseId": 13,
            "name": "Seated Russian Twist",
            "imName": "Standing Hip Circle",
            "imageName": "SLPE1",
            "element": "SL/PE1",
            "elementFullName": "Side Lever",
            "progressionLevel": 1,
            "repsOrSecs": "5x30r",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 13,
                  "description": "1) No slouching during the twists; flat back!",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 13,
                  "description": "2) My preference is to use 5lbs+ for these, but scale as needed for your situation.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 13,
                  "description": "1) Keep the hip circle smooth by pressing the hips out strongly to the sides.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 333,
                  "exerciseId": 13,
                  "tag": 1,
                  "videoName": "i79XFmvl.json?exp=1768596320640&sig=858ba0b58ae616aa6df902f074c75537",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 334,
                  "exerciseId": 13,
                  "tag": 2,
                  "videoName": "RoHm6iH1.json?exp=1768596320640&sig=e9e15966a03ded5b58d8fcddb86b1748",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 359,
                  "exerciseId": 13,
                  "tag": 4,
                  "videoName": "PJ9TIrum.json?exp=1768596320640&sig=d0cfe489f8f4435f4a0dea42127ff5f7",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 360,
                  "exerciseId": 13,
                  "tag": 4,
                  "videoName": "D5ZEmCet.json?exp=1768596320640&sig=ecb28e6cbb4bf3d8574e9959ab9791e5",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 14,
            "name": "Elbow Side Plank Twist",
            "imName": "Standing Trunk Circle",
            "imageName": "SLPE2",
            "element": "SL/PE2",
            "elementFullName": "Side Lever",
            "progressionLevel": 2,
            "repsOrSecs": "5x10r@",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 14,
                  "description": "1) Do not sag or arch during the twist.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 14,
                  "description": "2) Press the supporting forearm firmly into the ground.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 14,
                  "description": "1) Arch back strongly at the top of each rep.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 14,
                  "description": "2) Focus on a smooth circular motion.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 361,
                  "exerciseId": 14,
                  "tag": 1,
                  "videoName": "93ck7miq.json?exp=1768596320640&sig=84185047e9d9039532eb6ad265f7a01a",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 362,
                  "exerciseId": 14,
                  "tag": 2,
                  "videoName": "ZeHTPgJE.json?exp=1768596320640&sig=db893fff96926513ae1ea9b846bba035",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 387,
                  "exerciseId": 14,
                  "tag": 4,
                  "videoName": "eOuYE5kZ.json?exp=1768596320640&sig=4c83a1c80c534b7cec1f2f071f185332",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 388,
                  "exerciseId": 14,
                  "tag": 4,
                  "videoName": "73JpCnOJ.json?exp=1768596320640&sig=55b62b7295bd47ec4bb8385cefaaab47",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 15,
            "name": "Side Over Arch",
            "imName": "Elbow Bounces",
            "imageName": "SLPE3",
            "element": "SL/PE3",
            "elementFullName": "Side Lever",
            "progressionLevel": 3,
            "repsOrSecs": "5x10r@",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 15,
                  "description": "1) Allow the top foot to come forward and the feet to separate for stability",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 15,
                  "description": "2) The obliques should arch fully at the bottom and then also arch fully at the top.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 15,
                  "description": "1) Keep the elbows pulled back, the back flat and the ribs pulled down at all times.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 389,
                  "exerciseId": 15,
                  "tag": 1,
                  "videoName": "ULM4zdC7.json?exp=1768596320640&sig=9e19135171db4e0cde4ba0080a0ed9ad",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 390,
                  "exerciseId": 15,
                  "tag": 2,
                  "videoName": "6reyBMha.json?exp=1768596320640&sig=53860fde53cdb9e264fdc845ad417b09",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 415,
                  "exerciseId": 15,
                  "tag": 4,
                  "videoName": "vp6PIk7W.json?exp=1768596320640&sig=618f937991bd8e795c73af9373925bab",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 416,
                  "exerciseId": 15,
                  "tag": 4,
                  "videoName": "vRvdotEu.json?exp=1768596320640&sig=9494820ff9df3360e2de1eee359c52a9",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 16,
            "name": "Arch Up",
            "imName": "Standing Weighted Oblique Stretch",
            "imageName": "SLPE4",
            "element": "SL/PE4",
            "elementFullName": "Side Lever",
            "progressionLevel": 4,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x30s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 16,
                  "description": "1) Sit up to at least horizontal.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 16,
                  "description": "2) Lift the chin at the top of each repetition.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 16,
                  "description": "1) Keep the knees straight.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 16,
                  "description": "2) Focus on moving only directly to the side.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 417,
                  "exerciseId": 16,
                  "tag": 1,
                  "videoName": "UNBX2EkQ.json?exp=1768596320640&sig=5149ed620ae4e0283ab36186dca833da",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 418,
                  "exerciseId": 16,
                  "tag": 2,
                  "videoName": "eStfEJ00.json?exp=1768596320640&sig=66e08af54116d3cfdafe4949f0e7e044",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 443,
                  "exerciseId": 16,
                  "tag": 4,
                  "videoName": "nVy0TKVf.json?exp=1768596320640&sig=0281d565a9d1bf5c4283426b9fa7360d",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 444,
                  "exerciseId": 16,
                  "tag": 4,
                  "videoName": "3L4o7xgV.json?exp=1768596320640&sig=deffb7c6dafbe3697de7756f186ec799",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 17,
            "name": "Twisting Arch Up",
            "imName": "Standing Weighted Oblique Reps",
            "imageName": "SLPE5",
            "element": "SL/PE5",
            "elementFullName": "Side Lever",
            "progressionLevel": 5,
            "repsOrSecs": "5x10r@",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 17,
                  "description": "1) Do not use abbreviated range of motion; sit up as high as possible.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 17,
                  "description": "2) The neck is part of the spine; make sure the neck is arched at the top of each rep.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 17,
                  "description": "1) Use a moderate weight; the point is to stretch the obliques, not to make a maximum effort.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 445,
                  "exerciseId": 17,
                  "tag": 1,
                  "videoName": "LZGCevJE.json?exp=1768596320640&sig=624a023d8374b8481e58f7c718beaad8",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 446,
                  "exerciseId": 17,
                  "tag": 2,
                  "videoName": "OROo1fPh.json?exp=1768596320640&sig=496c9625f0bb6b83aae53ef68fab7e25",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 471,
                  "exerciseId": 17,
                  "tag": 4,
                  "videoName": "CGBSGdSW.json?exp=1768596320640&sig=879d26dae6dde54ec8917eb672543a21",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 472,
                  "exerciseId": 17,
                  "tag": 4,
                  "videoName": "rrhH4obq.json?exp=1768596320640&sig=f1785c7980ff274512c688b7826c011a",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 18,
            "name": "Circle Arch Up",
            "imName": "Outside Inside Outside Back",
            "imageName": "SLPE6",
            "element": "SL/PE6",
            "elementFullName": "Side Lever",
            "progressionLevel": 6,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 18,
                  "description": "1) Make sure you are doing a complete circular motion.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 18,
                  "description": "2) Do not allow the body to fall forward on the sides.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 18,
                  "description": "1) Note that the feet are pointing directly square to the front.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 18,
                  "description": "2) Turn the chest 90 degrees to the leg at the bottom.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 473,
                  "exerciseId": 18,
                  "tag": 1,
                  "videoName": "l38Cie9X.json?exp=1768596320640&sig=5f3cc1a3fecceb8c70a89f611464f5aa",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 474,
                  "exerciseId": 18,
                  "tag": 2,
                  "videoName": "XZ26XoDf.json?exp=1768596320640&sig=fe45edeee0ef9118a1dbef9c3791e4cb",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 499,
                  "exerciseId": 18,
                  "tag": 4,
                  "videoName": "oIAeUaZD.json?exp=1768596320640&sig=f7861e0a7a5111221ab679cead3fd4c4",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 500,
                  "exerciseId": 18,
                  "tag": 4,
                  "videoName": "QCVwS4d7.json?exp=1768596320640&sig=fa37d91ed4f3d951d2874b6d808f61cb",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          }
        ],
        "Manna": [
          {
            "exerciseId": 19,
            "name": "Tuck-Up",
            "imName": "Stiff Leg Windmill",
            "imageName": "MNPE1",
            "element": "MN/PE1",
            "elementFullName": "Manna",
            "progressionLevel": 1,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 19,
                  "description": "1) Pull the knees all the way to the chest.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 19,
                  "description": "2) Lay down completely flat in between repetitions.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 19,
                  "description": "1) Both legs remain locked and straight at all times.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 19,
                  "description": "2) Keep the dumbbell above the supporting shoulder.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 501,
                  "exerciseId": 19,
                  "tag": 1,
                  "videoName": "CKtwdizz.json?exp=1768596320640&sig=c794748e59001b32e865b290764eb63e",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 502,
                  "exerciseId": 19,
                  "tag": 2,
                  "videoName": "LtC8WEXn.json?exp=1768596320641&sig=4d53ca7d0cbcfbcca22fcca2c879a545",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 527,
                  "exerciseId": 19,
                  "tag": 4,
                  "videoName": "ak5sTPz9.json?exp=1768596320641&sig=8cfc82e1f0750c3b9c403affd188107b",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 528,
                  "exerciseId": 19,
                  "tag": 4,
                  "videoName": "YNeaaVAB.json?exp=1768596320641&sig=796e14bb9474c0e000adec738c76dc4b",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 20,
            "name": "Straddle Up",
            "imName": "Jefferson Curl",
            "imageName": "MNPE2",
            "element": "MN/PE2",
            "elementFullName": "Manna",
            "progressionLevel": 2,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 20,
                  "description": "1) Keep the knees completely straight during the ascent.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 20,
                  "description": "2) Sit the chest up as high as possible without caving in.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 20,
                  "description": "1) Curl down one vertebrae at a time.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 20,
                  "description": "2) Keep the hips tucked under as long as possible.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 529,
                  "exerciseId": 20,
                  "tag": 1,
                  "videoName": "RbeTzAhj.json?exp=1768596320641&sig=612be656ce4fe508e14d52583c751154",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 530,
                  "exerciseId": 20,
                  "tag": 2,
                  "videoName": "bJRairkT.json?exp=1768596320641&sig=b2883ba0b777f7bbe5b5fc08c9a7a855",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 555,
                  "exerciseId": 20,
                  "tag": 4,
                  "videoName": "A6bQsX7c.json?exp=1768596320641&sig=89db0fd615b9135420bad3cba21b1eec",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 556,
                  "exerciseId": 20,
                  "tag": 4,
                  "videoName": "RBBzurr1.json?exp=1768596320641&sig=2ff689f93027c7671377ca195da17a50",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 21,
            "name": "V-Ups",
            "imName": "Pike Lean",
            "imageName": "MNPE3",
            "element": "MN/PE3",
            "elementFullName": "Manna",
            "progressionLevel": 3,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x30s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 21,
                  "description": "1) Keep the back flat and the chest high.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 21,
                  "description": "2) Pike as much as possible at the top of each repetition.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 21,
                  "description": "1) Press the hips back strongly into the stretch.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 21,
                  "description": "2) Allow the lats to lengthen and relax into the stretch.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 557,
                  "exerciseId": 21,
                  "tag": 1,
                  "videoName": "zBkkVt4v.json?exp=1768596320641&sig=b37aa3e6ee2ffde28421dc793a4d90fa",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 558,
                  "exerciseId": 21,
                  "tag": 2,
                  "videoName": "DdpxHpC0.json?exp=1768596320641&sig=b989513c4b07c18eb9f8409abb361868",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 583,
                  "exerciseId": 21,
                  "tag": 4,
                  "videoName": "LsEnNhbd.json?exp=1768596320641&sig=c3756abaddf81e029336f1a0099c46ca",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 584,
                  "exerciseId": 21,
                  "tag": 4,
                  "videoName": "IIDX927Q.json?exp=1768596320641&sig=f3a9c7d13aeb15335009499f7e794f42",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 22,
            "name": "1/2 Tuck Hanging Leg Lift",
            "imName": "Standing Weighted Pike Hang",
            "imageName": "MNPE4",
            "element": "MN/PE4",
            "elementFullName": "Manna",
            "progressionLevel": 4,
            "repsOrSecs": "5x5r",
            "imRepsOrSecs": "5x30s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 22,
                  "description": "1) Keep the lower back pressed back firmly into the wall.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 22,
                  "description": "2) Pull the knees up, do not swing or kick them up.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 22,
                  "description": "1) Make sure you are using a safe surface to stretch on.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 22,
                  "description": "2) Using 45-95lbs is sufficient load for most people.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 585,
                  "exerciseId": 22,
                  "tag": 1,
                  "videoName": "JGkPnr4Z.json?exp=1768596320641&sig=01a8fb6275a4bf6ee92cec7e3563d7e7",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 586,
                  "exerciseId": 22,
                  "tag": 2,
                  "videoName": "rDVLhDuc.json?exp=1768596320641&sig=8cec71f809c575fbabd462481fdc0837",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 607,
                  "exerciseId": 22,
                  "tag": 4,
                  "videoName": "WNzwhAJK.json?exp=1768596320641&sig=4b6895dcfb449c3ce955c25bfc2661a6",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 608,
                  "exerciseId": 22,
                  "tag": 4,
                  "videoName": "fH0rje4J.json?exp=1768596320641&sig=c9f51347db861cd0531c5a24b9634140",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 23,
            "name": "1/2 Hanging Leg Lift",
            "imName": "Vertical Pike Walk",
            "imageName": "MNPE5",
            "element": "MN/PE5",
            "elementFullName": "Manna",
            "progressionLevel": 5,
            "repsOrSecs": "5x5r",
            "imRepsOrSecs": "5x1r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 23,
                  "description": "1) Do not allow the knees to bend during the leg lift.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 23,
                  "description": "2) Keep the elbows straight, do not use your biceps to help.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 23,
                  "description": "1) Moderate discomfort is acceptable; do not work too hard.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 23,
                  "description": "2) Allow the body to relax and lengthen into the stretch.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 609,
                  "exerciseId": 23,
                  "tag": 1,
                  "videoName": "6bFNtnp2.json?exp=1768596320641&sig=6fa7b20b52fe5055cc81264be6d3c076",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 610,
                  "exerciseId": 23,
                  "tag": 2,
                  "videoName": "rgGcBnZ1.json?exp=1768596320641&sig=3c1e7a449f5b0ed98f076443f4fc65a1",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 635,
                  "exerciseId": 23,
                  "tag": 4,
                  "videoName": "iaL3iQWK.json?exp=1768596320641&sig=42ac518d786b74e966d5abb9b59b1957",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 636,
                  "exerciseId": 23,
                  "tag": 4,
                  "videoName": "6cDSiAsZ.json?exp=1768596320641&sig=0f67b601abf94840086dd150004ec18d",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 24,
            "name": "Negative Hanging Leg Lift ",
            "imName": "Vertical Pike Pull",
            "imageName": "MNPE6",
            "element": "MN/PE6",
            "elementFullName": "Manna",
            "progressionLevel": 6,
            "repsOrSecs": "5x5rx10s",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 24,
                  "description": "1) Each negative should require 10 seconds to descend.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 24,
                  "description": "2) Completely straighten the knees at the top of each rep.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 24,
                  "description": "1) Keep the knees and elbows locked at all times.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 24,
                  "description": "2) Descend only to a depth you are comfortable with.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 637,
                  "exerciseId": 24,
                  "tag": 1,
                  "videoName": "qTdWw1Zh.json?exp=1768596320641&sig=97f70b6c6f448828c787450375c79e38",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 638,
                  "exerciseId": 24,
                  "tag": 2,
                  "videoName": "DTIsdlNA.json?exp=1768596320641&sig=51c2d44cd7344114aa7d90b228e2f09d",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 663,
                  "exerciseId": 24,
                  "tag": 4,
                  "videoName": "UCSQMNF2.json?exp=1768596320641&sig=6f60e06e1c395801ff48ed724d95d85a",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 664,
                  "exerciseId": 24,
                  "tag": 4,
                  "videoName": "CZJC5D9d.json?exp=1768596320641&sig=e8083cd11cac64d17be617a95da8618d",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          }
        ],
        "Hollow Back Press": [
          {
            "exerciseId": 30,
            "name": "Incline Pushup",
            "imName": "German Arm Swing",
            "imageName": "HBPPE1",
            "element": "HBP/PE1",
            "elementFullName": "Hollow Back Press",
            "progressionLevel": 1,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 30,
                  "description": "1) Set the bar to approximately hip height.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 30,
                  "description": "2) The bar of a smith machine is a good substitute.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 30,
                  "description": "1) Allow the arms to swing loosely and smoothly.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 30,
                  "description": "2) Keep the elbow behind the ear at the top of the swing.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 798,
                  "exerciseId": 30,
                  "tag": 1,
                  "videoName": "VNAIf59d.json?exp=1768596320641&sig=97adc5599ec053bc1cc1f24643f7d184",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 799,
                  "exerciseId": 30,
                  "tag": 2,
                  "videoName": "sSwaZ69q.json?exp=1768596320641&sig=9afbfe21ee8d1762fb7900263a335a77",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 824,
                  "exerciseId": 30,
                  "tag": 4,
                  "videoName": "IP1MFSPF.json?exp=1768596320641&sig=be0703649a8e7c497d5a1ead26742d4c",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 825,
                  "exerciseId": 30,
                  "tag": 4,
                  "videoName": "npUh5tRS.json?exp=1768596320641&sig=a3709adafccb742d3210118bf39dc4ed",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 31,
            "name": "Pushup",
            "imName": "Xiaopeng Forward",
            "imageName": "HBPPE2",
            "element": "HBP/PE2",
            "elementFullName": "Hollow Back Press",
            "progressionLevel": 2,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 31,
                  "description": "1) Lower the chest completely to the ground each rep.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 31,
                  "description": "2) Do not allow the body to sag at any time.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 31,
                  "description": "1) Using a 5-10lb dumbbell is sufficient for most people.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 31,
                  "description": "2) Lift the weight smoothly and with control; do not swing.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 826,
                  "exerciseId": 31,
                  "tag": 1,
                  "videoName": "N1mmYWwe.json?exp=1768596320641&sig=a8a70357f24cb8281d0e49d04dd4ef6f",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 827,
                  "exerciseId": 31,
                  "tag": 2,
                  "videoName": "QT6UUPyU.json?exp=1768596320641&sig=ec360d8eaabbf56630516916378c2d43",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 852,
                  "exerciseId": 31,
                  "tag": 4,
                  "videoName": "be3f6qgU.json?exp=1768596320641&sig=9cf0f491de139980776bd2f616ccc360",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 853,
                  "exerciseId": 31,
                  "tag": 4,
                  "videoName": "YG9v292Y.json?exp=1768596320641&sig=c651b81fdb21b5e092ed71b51123b8af",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 32,
            "name": "Pseudo Planche Pushup",
            "imName": "Xiaopeng Backward",
            "imageName": "HBPPE3",
            "element": "HBP/PE3",
            "elementFullName": "Hollow Back Press",
            "progressionLevel": 3,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 32,
                  "description": "1) Lean forward until the hands are just in front of the hips.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 32,
                  "description": "2) Keep the scapula strongly protracted and depressed.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 32,
                  "description": "1) Do not allow the weight out to drift out to the side; rather focus on pulling it straight back and up over your torso.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 854,
                  "exerciseId": 32,
                  "tag": 1,
                  "videoName": "irjAn1yY.json?exp=1768596320641&sig=df2109107d0526bed560b28184a3aaa7",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 855,
                  "exerciseId": 32,
                  "tag": 2,
                  "videoName": "ShEklRnB.json?exp=1768596320641&sig=eca3bbf55a474fb7ea1510bfac691bb7",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 880,
                  "exerciseId": 32,
                  "tag": 4,
                  "videoName": "b8LYHpKg.json?exp=1768596320641&sig=d637cc107ba1ecb94d122a00001564ee",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 881,
                  "exerciseId": 32,
                  "tag": 4,
                  "videoName": "TRS8ubT5.json?exp=1768596320641&sig=5bb56eebc8c6aebd4b57cac3bd317199",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 33,
            "name": "Bench Dip",
            "imName": "Double Arm Circle Backward",
            "imageName": "HBPPE4",
            "element": "HBP/PE4",
            "elementFullName": "Hollow Back Press",
            "progressionLevel": 4,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 33,
                  "description": "1) Initially you may find that you prefer descending only to 90 degrees until your shoulder mobility improves.",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 33,
                  "description": "1) Keep the elbows straight and extended.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 33,
                  "description": "2) The arms should come relatively close to the ears.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 882,
                  "exerciseId": 33,
                  "tag": 1,
                  "videoName": "GLst45PR.json?exp=1768596320641&sig=e42916208aed0d942ebca5c5e0e93974",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 883,
                  "exerciseId": 33,
                  "tag": 2,
                  "videoName": "8M17jIOC.json?exp=1768596320641&sig=db13aaeb6b4e180f1fd892f200f15742",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 908,
                  "exerciseId": 33,
                  "tag": 4,
                  "videoName": "tojbZB80.json?exp=1768596320641&sig=05be162bb71c428cf11dfeed661e026d",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 909,
                  "exerciseId": 33,
                  "tag": 4,
                  "videoName": "77dNAhgH.json?exp=1768596320641&sig=16acdb33fe0f1cba4c32f81bd21dba0f",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 34,
            "name": "Negative Parallel Bar Dip",
            "imName": "Double Arm Circle Forward",
            "imageName": "HBPPE5",
            "element": "HBP/PE5",
            "elementFullName": "Hollow Back Press",
            "progressionLevel": 5,
            "repsOrSecs": "5x5rx10s",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 34,
                  "description": "1) A single repetition is comprised of a 10 second descent; thus each set contains 50 seconds total time under tension .",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 34,
                  "description": "1) Beginning the arm circle by initially turning the little finger upward will greatly smooth out the arc of movement.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 910,
                  "exerciseId": 34,
                  "tag": 1,
                  "videoName": "NgEIoukA.json?exp=1768596320641&sig=1738883692528b78aeeda6113bc8e763",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 911,
                  "exerciseId": 34,
                  "tag": 2,
                  "videoName": "pm0rMQ4t.json?exp=1768596320641&sig=3e4a4bd0e2ef6296015e99452a7e8cc0",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 936,
                  "exerciseId": 34,
                  "tag": 4,
                  "videoName": "1iQ45WAh.json?exp=1768596320641&sig=6855cec52b65d271db8b95fbaf2cc457",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 937,
                  "exerciseId": 34,
                  "tag": 4,
                  "videoName": "CEUef30m.json?exp=1768596320641&sig=8318b6997d4d4e1734e499e2f91b16ae",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 35,
            "name": "Parallel Bar Dip",
            "imName": "Single Arm Bent Cat",
            "imageName": "HBPPE6",
            "element": "HBP/PE6",
            "elementFullName": "Hollow Back Press",
            "progressionLevel": 6,
            "repsOrSecs": "5x5r",
            "imRepsOrSecs": "5x30s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 35,
                  "description": "1) The shoulders should be reasonably close to the hands at the bottom of each repetition.",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 35,
                  "description": "1) Keeping the back flat and the ribs pulled in will greatly increase the efficacy of this stretch.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 938,
                  "exerciseId": 35,
                  "tag": 1,
                  "videoName": "Z9DpvqbS.json?exp=1768596320641&sig=728474e716163fd84f7e92e56cb41955",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 939,
                  "exerciseId": 35,
                  "tag": 2,
                  "videoName": "lA1GTHNo.json?exp=1768596320641&sig=dee9670ee3f98fab0e8468e400baab56",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 964,
                  "exerciseId": 35,
                  "tag": 4,
                  "videoName": "LmdIZG6Z.json?exp=1768596320641&sig=f06cf73d399d0c74d0cf80f4df1c5efc",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 965,
                  "exerciseId": 35,
                  "tag": 4,
                  "videoName": "6viXt2Lb.json?exp=1768596320641&sig=e2e92149f2a88f9d1a0d90364def6224",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          }
        ],
        "Rope Climb": [
          {
            "exerciseId": 36,
            "name": "Incline Row",
            "imName": "One Arm Upright Lat Lean",
            "imageName": "RCPE1",
            "element": "RC/PE1",
            "elementFullName": "Rope Climb",
            "progressionLevel": 1,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x15s@",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 36,
                  "description": "1) Do not allow the body to sag during the row.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 36,
                  "description": "2) Lower down, do not bounce down, at the end of each rep.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 36,
                  "description": "1) Sit back strongly while keeping the torso upright.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 966,
                  "exerciseId": 36,
                  "tag": 1,
                  "videoName": "DldFHFsr.json?exp=1768596320641&sig=dc65fba8b422d1fcd3a4c7197cfa8a64",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 967,
                  "exerciseId": 36,
                  "tag": 2,
                  "videoName": "xB76qD36.json?exp=1768596320641&sig=a414c5ea88db9860d00dc7b8f798546b",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 992,
                  "exerciseId": 36,
                  "tag": 4,
                  "videoName": "yzByRFxd.json?exp=1768596320641&sig=50cf9a43999c749adafafaac60cfee64",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 993,
                  "exerciseId": 36,
                  "tag": 4,
                  "videoName": "9a3q1BS8.json?exp=1768596320641&sig=ca68a21f1784461272f61d5e4f711f8b",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 37,
            "name": "Ground Rows",
            "imName": "Bent Sideways Lat Stretch",
            "imageName": "RCPE2",
            "element": "RC/PE2",
            "elementFullName": "Rope Climb",
            "progressionLevel": 2,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x15s@",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 37,
                  "description": "1) At full extension of the arms, the shoulders should be just off the ground.",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 37,
                  "description": "1) Keep the hands and hips relatively stationary while laying the upper arm on the ear and stretching the lat sideways.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 994,
                  "exerciseId": 37,
                  "tag": 1,
                  "videoName": "ORm9YMI2.json?exp=1768596320641&sig=3c394301ee33c65220295d4bf7d75f98",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 995,
                  "exerciseId": 37,
                  "tag": 2,
                  "videoName": "FpWSWxDw.json?exp=1768596320641&sig=7c86fcfb7d77648b5c5ddb709c0912c6",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 1020,
                  "exerciseId": 37,
                  "tag": 4,
                  "videoName": "iokWoz59.json?exp=1768596320641&sig=d1be479d8b5d8d55b4b4c791eefab040",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 1021,
                  "exerciseId": 37,
                  "tag": 4,
                  "videoName": "mqspPI57.json?exp=1768596320641&sig=848ce9f558a493378a78313d264dfe9a",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 38,
            "name": "Elevated Row",
            "imName": "Bent Twisting Lat Static",
            "imageName": "RCPE3",
            "element": "RC/PE3",
            "elementFullName": "Rope Climb",
            "progressionLevel": 3,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x15s@",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 38,
                  "description": "1) Elevate the feet to approximately ring height.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 38,
                  "description": "2) Do not allow the body to sag at any time.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 38,
                  "description": "1) Twist the torso sideways over the arm while continually pulling against the hands and pressing the hips back.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1022,
                  "exerciseId": 38,
                  "tag": 1,
                  "videoName": "BVNBV6zL.json?exp=1768596320641&sig=95f4317bdc99762d9e8dd374a4a75be2",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 1023,
                  "exerciseId": 38,
                  "tag": 2,
                  "videoName": "vibpxgBW.json?exp=1768596320641&sig=0ff5bce76ef63f8212315d03553ae934",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 1048,
                  "exerciseId": 38,
                  "tag": 4,
                  "videoName": "QV5qjfIz.json?exp=1768596320641&sig=38412d867d4b7f02038ba62da7beed44",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 1049,
                  "exerciseId": 38,
                  "tag": 4,
                  "videoName": "6yzQRctU.json?exp=1768596320641&sig=5bda6eed5feca92d00803beea62a31a4",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 39,
            "name": "Bulgarian Row",
            "imName": "Bent Twisting Lat Reps",
            "imageName": "RCPE4",
            "element": "RC/PE4",
            "elementFullName": "Rope Climb",
            "progressionLevel": 4,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 39,
                  "description": "1) Do not allow the elbows to drift forward of the shoulders.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 39,
                  "description": "2) Pull to an approximately 90 degree elbow bend.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 39,
                  "description": "1) Failure to maintain constant backward pressure on the hands and hips will greatly minimize this stretch.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1050,
                  "exerciseId": 39,
                  "tag": 1,
                  "videoName": "g0BC4F2b.json?exp=1768596320641&sig=34f9c11745ac41ea5b5f6ac53706b2a5",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 1051,
                  "exerciseId": 39,
                  "tag": 2,
                  "videoName": "KMPzsJNc.json?exp=1768596320641&sig=de2660d85e9f15ebb4f050aba573aa11",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 1076,
                  "exerciseId": 39,
                  "tag": 4,
                  "videoName": "BZrRCpDq.json?exp=1768596320641&sig=08c75dfb085d0141797bb69d6aa8e7d1",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 1077,
                  "exerciseId": 39,
                  "tag": 4,
                  "videoName": "ZrthMS7y.json?exp=1768596320641&sig=a5b4ea31780d65058e315d8611ccd59b",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 40,
            "name": "Hinge Row",
            "imName": "Overgrip Bent Lean",
            "imageName": "RCPE5",
            "element": "RC/PE5",
            "elementFullName": "Rope Climb",
            "progressionLevel": 5,
            "repsOrSecs": "5x5r",
            "imRepsOrSecs": "5x30s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 40,
                  "description": "1) Begin with the glutes and shoulders just off the ground.",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 40,
                  "description": "1) Keeping the arms by the ears, use the hips pressing backward to lengthen the lats into this stretch.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 40,
                  "description": "2) Attempt to feel the lat relax and go deeper into the stretch.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1078,
                  "exerciseId": 40,
                  "tag": 1,
                  "videoName": "gSIBwd4Y.json?exp=1768596320641&sig=7bdfdfe597f9eb0d0f6501a3475b3a30",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 1079,
                  "exerciseId": 40,
                  "tag": 2,
                  "videoName": "zCcalB7Q.json?exp=1768596320641&sig=50455a092cbc56f2c805fb21ecbdb4a9",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 1104,
                  "exerciseId": 40,
                  "tag": 4,
                  "videoName": "SOezsufe.json?exp=1768596320641&sig=a315a6724315f91db8985cbcc9b58b3d",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 1105,
                  "exerciseId": 40,
                  "tag": 4,
                  "videoName": "Wvaoy4lb.json?exp=1768596320641&sig=fa561a5a06e82bdf424313f524c859a9",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 41,
            "name": "Bent Arm Chin Hang",
            "imName": "Overgrip Bent Pull",
            "imageName": "RCPE6",
            "element": "RC/PE6",
            "elementFullName": "Rope Climb",
            "progressionLevel": 6,
            "repsOrSecs": "5x30s",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 41,
                  "description": "1) Chin over the bar is the minimum acceptable height.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 41,
                  "description": "2) Do not allow the neck or chin to touch the bar.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 41,
                  "description": "1) Come to a stand by pulling down strongly on the bar.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 41,
                  "description": "2) Sink deeply into the stretch at the bottom of each rep.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1106,
                  "exerciseId": 41,
                  "tag": 1,
                  "videoName": "hWKSttp8.json?exp=1768596320641&sig=cfa2706e911aa519ae8bb55b561bbc54",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 1107,
                  "exerciseId": 41,
                  "tag": 2,
                  "videoName": "kI5S8npV.json?exp=1768596320641&sig=f8b3d8ae36cf6c8b0c1c6c732808356e",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 1130,
                  "exerciseId": 41,
                  "tag": 4,
                  "videoName": "HA5LWvRU.json?exp=1768596320641&sig=b57fb4490c219c192f76f337172bcf24",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 1131,
                  "exerciseId": 41,
                  "tag": 4,
                  "videoName": "VpJv4z4T.json?exp=1768596320641&sig=7fdbde7b81de05b3a58b062986850c9c",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          }
        ],
        "Straddle Planche": [
          {
            "exerciseId": 7,
            "name": "Scapular Shrugs",
            "imName": "Swivel Hips",
            "imageName": "sPLPE1",
            "element": "sPL/PE1",
            "elementFullName": "Straddle Planche",
            "progressionLevel": 1,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 7,
                  "description": "1) Pinch the shoulder blades together at the bottom.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 7,
                  "description": "2) Pull the shoulder blades apart at the top.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 7,
                  "description": "1) Maintain a 90 degree angle in the hips and knees.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 7,
                  "description": "2) Keep the glutes on the ground at all times.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 167,
                  "exerciseId": 7,
                  "tag": 1,
                  "videoName": "g3VEVzG9.json?exp=1768596320641&sig=4a3a61270aa86f379b024c718a86b33f",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 168,
                  "exerciseId": 7,
                  "tag": 2,
                  "videoName": "DAaTAFO3.json?exp=1768596320641&sig=46808da81efc523d83018ce6a8ec0ffd",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 193,
                  "exerciseId": 7,
                  "tag": 4,
                  "videoName": "93mM4c9F.json?exp=1768596320641&sig=1a28974f906e756b125f564d543908b3",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 194,
                  "exerciseId": 7,
                  "tag": 4,
                  "videoName": "goeXjAS2.json?exp=1768596320641&sig=cac5cc192d6726cb0aaefa255339a652",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 8,
            "name": "Forearm Plank",
            "imName": "Straddle Running Man",
            "imageName": "sPLPE2",
            "element": "sPL/PE2",
            "elementFullName": "Straddle Planche",
            "progressionLevel": 2,
            "repsOrSecs": "5x60s",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 8,
                  "description": "1) Keep the hips tucked and the back curled.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 8,
                  "description": "2) A neutral chin will be the most comfortable.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 8,
                  "description": "1) Extend the working leg as far sideways as possible.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 8,
                  "description": "2) Expect to enjoy significant cramping of the medial glutes!",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 195,
                  "exerciseId": 8,
                  "tag": 1,
                  "videoName": "LHjfJ0GC.json?exp=1768596320642&sig=c489fb2343485b03d64bf23983ec7f1d",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 196,
                  "exerciseId": 8,
                  "tag": 2,
                  "videoName": "MsYiM8U8.json?exp=1768596320642&sig=f1886e6654c421703291f8cf2bf8cd83",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 221,
                  "exerciseId": 8,
                  "tag": 4,
                  "videoName": "TYgbrVWS.json?exp=1768596320642&sig=1b0de24bcbd05fca8adc6920359a2285",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 222,
                  "exerciseId": 8,
                  "tag": 4,
                  "videoName": "LXQOsdjo.json?exp=1768596320642&sig=f3d1477fc78a8e6850376873b0e071f9",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 9,
            "name": "Plank",
            "imName": "Straddle Modified Reverse Hyper",
            "imageName": "sPLPE3",
            "element": "sPL/PE3",
            "elementFullName": "Straddle Planche",
            "progressionLevel": 3,
            "repsOrSecs": "5x60s",
            "imRepsOrSecs": "5x5r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 9,
                  "description": "1) Keep the shoulders directly over the hands.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 9,
                  "description": "2) Do not allow the body to sag or arch.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 9,
                  "description": "1) Be sure to completely elevate the feet to hip height.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 9,
                  "description": "2) Pause briefly at the top of each repetition.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 223,
                  "exerciseId": 9,
                  "tag": 1,
                  "videoName": "6bpZTxQ4.json?exp=1768596320642&sig=e5c621801c8e407bf5c926ec31d49707",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 224,
                  "exerciseId": 9,
                  "tag": 2,
                  "videoName": "9qAI6BgJ.json?exp=1768596320642&sig=6a03b485dc8018c2528f1d6c26f98c45",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 249,
                  "exerciseId": 9,
                  "tag": 4,
                  "videoName": "SUobvmcY.json?exp=1768596320642&sig=4d45d3ffdf6c43d979d17e05ae08b82a",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 250,
                  "exerciseId": 9,
                  "tag": 4,
                  "videoName": "AxgKivYV.json?exp=1768596320642&sig=9c7d71536b256a4fba16c19cee86c6cc",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 10,
            "name": "Single Arm Plank",
            "imName": "Straddle Donkey Kick",
            "imageName": "sPLPE4",
            "element": "sPL/PE4",
            "elementFullName": "Straddle Planche",
            "progressionLevel": 4,
            "repsOrSecs": "5x30s",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 10,
                  "description": "1) 30 seconds on both arms counts as a single set.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 10,
                  "description": "2) Keep the supporting shoulder completely extended.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 10,
                  "description": "1) Do not allow the non-working leg to drop below the hips.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 10,
                  "description": "2) Pause briefly at the top in between repetitions.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 251,
                  "exerciseId": 10,
                  "tag": 1,
                  "videoName": "JLu3XmNJ.json?exp=1768596320642&sig=6e12289733578802a69b4412b852f6f5",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 252,
                  "exerciseId": 10,
                  "tag": 2,
                  "videoName": "gWZvkz6n.json?exp=1768596320642&sig=207d948012ea2b15d52ec8038f8ab497",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 277,
                  "exerciseId": 10,
                  "tag": 4,
                  "videoName": "zp7IHdCk.json?exp=1768596320642&sig=4120769a550b49fe5ad158b9d59b5208",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 278,
                  "exerciseId": 10,
                  "tag": 4,
                  "videoName": "K8TXOMuI.json?exp=1768596320642&sig=c2fb567dca36e5e7a480b7136890d29d",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 11,
            "name": "Planche Lean",
            "imName": "Prone Half Straddle Planche Hold",
            "imageName": "sPLPE5",
            "element": "sPL/PE5",
            "elementFullName": "Straddle Planche",
            "progressionLevel": 5,
            "repsOrSecs": "5x30s",
            "imRepsOrSecs": "5x10s",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 11,
                  "description": "1) Protracting and depressing the scapula (shoulder blades) will greatly strengthen your planche lean position.",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 11,
                  "description": "1) Maintain the knees elevated to hip height at all times.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 11,
                  "description": "2) At a minimum the feet must pull in over the knees.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 279,
                  "exerciseId": 11,
                  "tag": 1,
                  "videoName": "PoZYNKOS.json?exp=1768596320642&sig=56d0e12e06e490a5790af279dbe91ca3",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 280,
                  "exerciseId": 11,
                  "tag": 2,
                  "videoName": "QkceuRfF.json?exp=1768596320642&sig=2a1662a077de1a4b2eafb3daae399059",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 305,
                  "exerciseId": 11,
                  "tag": 4,
                  "videoName": "dTamPLRG.json?exp=1768596320642&sig=a3761e946df658d44e3bf5a089c0be92",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 306,
                  "exerciseId": 11,
                  "tag": 4,
                  "videoName": "c0xVQasB.json?exp=1768596320642&sig=fb9b69c9e16d60dc0ec83996507ac6f7",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 12,
            "name": "Elevated Planche Lean",
            "imName": "Prone Half Straddle Planche Single Leg Extension",
            "imageName": "sPLPE6",
            "element": "sPL/PE6",
            "elementFullName": "Straddle Planche",
            "progressionLevel": 6,
            "repsOrSecs": "5x30s",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 12,
                  "description": "1) Place a furniture slider under the feet to reduce friction.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 12,
                  "description": "2) Lean forward until the hips are over the hands.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 12,
                  "description": "1) Do not allow either knee (both working leg and non-working leg) to drop below hip height during this exercise.",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 307,
                  "exerciseId": 12,
                  "tag": 1,
                  "videoName": "zsef3sS2.json?exp=1768596320642&sig=a50eda409f0df20eb7fb6af2829c3dc1",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 308,
                  "exerciseId": 12,
                  "tag": 2,
                  "videoName": "VXkLi8v4.json?exp=1768596320642&sig=529645a64eda90d2672186704f761683",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 331,
                  "exerciseId": 12,
                  "tag": 4,
                  "videoName": "MbfwVY2c.json?exp=1768596320642&sig=0f5c75bbe020e32377250f80a7e1b975",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 332,
                  "exerciseId": 12,
                  "tag": 4,
                  "videoName": "fXT2PUxA.json?exp=1768596320642&sig=5cc7d1c750bb23861fc6ef321ffc15f3",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          }
        ],
        "Single Leg Squat": [
          {
            "exerciseId": 25,
            "name": "Assisted Squat",
            "imName": "Sideprone Lift",
            "imageName": "SLSPE1",
            "element": "SLS/PE1",
            "elementFullName": "Single Leg Squat",
            "progressionLevel": 1,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x3r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 25,
                  "description": "1) Sit backwards into the squat rather than allowing the knees to come forward",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 25,
                  "description": "1) Toes should be pulled back and not pointed in the mobility ",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1857,
                  "exerciseId": 25,
                  "tag": 1,
                  "videoName": "SqiOEsrj.json?exp=1768596320642&sig=dbc28f194bc2f68e88bf4aeca24e980e",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 1858,
                  "exerciseId": 25,
                  "tag": 2,
                  "videoName": "EqMaiUSk.json?exp=1768596320642&sig=1e5a05d68cbce9847eedc8bc77907597",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 689,
                  "exerciseId": 25,
                  "tag": 4,
                  "videoName": "ZcTbD4fJ.json?exp=1768596320642&sig=a12059e6c21beddee38a82fc71489954",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 690,
                  "exerciseId": 25,
                  "tag": 4,
                  "videoName": "QWWVXuIt.json?exp=1768596320642&sig=2b645a1fe1918954996f0e1aa4545d30",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 26,
            "name": "Parallel Squat",
            "imName": "Kneeling Side Lift",
            "imageName": "SLSPE2",
            "element": "SLS/PE2",
            "elementFullName": "Single Leg Squat",
            "progressionLevel": 2,
            "repsOrSecs": "5x15r",
            "imRepsOrSecs": "5x3r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 26,
                  "description": "1) The arms may be used to help counter balance the squat",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 26,
                  "description": "1) The upper body and non-working leg should remain stationary while performing the mobility",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1859,
                  "exerciseId": 26,
                  "tag": 1,
                  "videoName": "jg7E6h1i.json?exp=1768596320642&sig=e4049bfa182a43ff0b35847031d6c900",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 691,
                  "exerciseId": 26,
                  "tag": 2,
                  "videoName": "Vrj0rtl5.json?exp=1768596320642&sig=51b2e1deda2b53a26917265ab8327332",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 1860,
                  "exerciseId": 26,
                  "tag": 2,
                  "videoName": "lBvDY2tU.json?exp=1768596320642&sig=e9140e05176386daf6b31a6ab45f8d5f",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 716,
                  "exerciseId": 26,
                  "tag": 4,
                  "videoName": "rYEvWN3m.json?exp=1768596320642&sig=e1cb65486ba14c8b637d2ab451d74ed8",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 717,
                  "exerciseId": 26,
                  "tag": 4,
                  "videoName": "avW13hfO.json?exp=1768596320642&sig=8c6690507b4c8028dd29318dec989e3c",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 27,
            "name": "Full Squat",
            "imName": "Kneeling Circle",
            "imageName": "SLSPE3",
            "element": "SLS/PE3",
            "elementFullName": "Single Leg Squat",
            "progressionLevel": 3,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x3r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 27,
                  "description": "1) Glutes should be close to the ground in a full squat",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 27,
                  "description": "1) The working leg should be smooth and controlled",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1861,
                  "exerciseId": 27,
                  "tag": 1,
                  "videoName": "ZvwfgoAa.json?exp=1768596320642&sig=27ac00bf7afa05171304bdbdbe58dc4d",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 1862,
                  "exerciseId": 27,
                  "tag": 2,
                  "videoName": "trUeH5Z6.json?exp=1768596320642&sig=0255e787c183f654910e79849739deff",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 742,
                  "exerciseId": 27,
                  "tag": 4,
                  "videoName": "08mpeAWB.json?exp=1768596320642&sig=292983949d5c23cb423295b9ebfa8d4e",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 743,
                  "exerciseId": 27,
                  "tag": 4,
                  "videoName": "ZgwnooAj.json?exp=1768596320642&sig=9362b03d354151fbbf22ca48e71bb2ba",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 28,
            "name": "Elevated Deck Squat",
            "imName": "Kneeling Parallel Slide",
            "imageName": "SLSPE4",
            "element": "SLS/PE4",
            "elementFullName": "Single Leg Squat",
            "progressionLevel": 4,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x3r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 28,
                  "description": "1) Use as many mats as necessary at first and remove them over time",
                  "type": 1,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exerciseId": 28,
                  "description": "1) Do not allow the knee to unlock while performing this mobility",
                  "type": 2,
                  "order": 1
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 1863,
                  "exerciseId": 28,
                  "tag": 1,
                  "videoName": "vIJYhrXJ.json?exp=1768596320642&sig=000caf9cbfd566eb7d96a6b33b4a9dcd",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 1864,
                  "exerciseId": 28,
                  "tag": 2,
                  "videoName": "gUiCjrzZ.json?exp=1768596320642&sig=5c4cac0bbfc21bd1e6c12e24b577b5b5",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 768,
                  "exerciseId": 28,
                  "tag": 4,
                  "videoName": "NAS84yYz.json?exp=1768596320642&sig=d2229a037832830f305005cd5cf6c124",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 769,
                  "exerciseId": 28,
                  "tag": 4,
                  "videoName": "n2WCCL9D.json?exp=1768596320642&sig=7af6b945fb91f68962a327c067a034ea",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          },
          {
            "exerciseId": 29,
            "name": "Deck Squat",
            "imName": "Skiers",
            "imageName": "SLSPE5",
            "element": "SLS/PE5",
            "elementFullName": "Single Leg Squat",
            "progressionLevel": 5,
            "repsOrSecs": "5x10r",
            "imRepsOrSecs": "5x10r",
            "exercisesFocusPoints": {
              "strength": [
                {
                  "exerciseId": 29,
                  "description": "1) Pulling the glutes in tight to the feet smooths the roll.",
                  "type": 1,
                  "order": 1
                },
                {
                  "exerciseId": 29,
                  "description": "2) Keep the back round and the chin tucked when rolling.",
                  "type": 1,
                  "order": 2
                }
              ],
              "mobility": [
                {
                  "exerciseId": 29,
                  "description": "1) Keep the knees stationary and swivel the hips to the side.",
                  "type": 2,
                  "order": 1
                },
                {
                  "exerciseId": 29,
                  "description": "2) The glutes should lower to approximately knee height.",
                  "type": 2,
                  "order": 2
                }
              ]
            },
            "exercisesVideos": {
              "strength": [
                {
                  "exercisesVideoId": 770,
                  "exerciseId": 29,
                  "tag": 1,
                  "videoName": "Lu7zXAtZ.json?exp=1768596320642&sig=d0d92019510d307e5e49ef5bc360f00c",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "mobility": [
                {
                  "exercisesVideoId": 771,
                  "exerciseId": 29,
                  "tag": 2,
                  "videoName": "CcwVqdiI.json?exp=1768596320642&sig=97e0ae6da10b46a8c2f877c756340a72",
                  "weekNum": 0,
                  "order": 1
                }
              ],
              "tips": [
                {
                  "exercisesVideoId": 796,
                  "exerciseId": 29,
                  "tag": 4,
                  "videoName": "SJnLZAVF.json?exp=1768596320642&sig=d763f84963004c4d6c64bd6a88a0f892",
                  "weekNum": 0,
                  "order": 1
                },
                {
                  "exercisesVideoId": 797,
                  "exerciseId": 29,
                  "tag": 4,
                  "videoName": "oNtAHM0W.json?exp=1768596320642&sig=6fc620ac7acf862507aef61c71fc2247",
                  "weekNum": 0,
                  "order": 2
                }
              ]
            }
          }
        ]
      }
      const keys = Object.keys(responseData);
      if (responseData === "YOU AREN'T ENROLLED IN THIS COURSE.") {
        console.log('YOU AREN\'T ENROLLED IN THIS COURSE');
        setThirdRow({
          show: false,
          data: [],
          loading: false
        })
        setOhNoModal(true);
      }
      else {
        setThirdRow({
          show: true,
          data: keys,
          loading: false,
          imagePrefix: cleanName(row.name ? row.name : row.courseName),
          allData: responseData
        })
      }
      console.log(error);
    });
  }

  const handleShowProgs = (keyName) => {
    const strSereis = [
      'Thoracic Bridge',
      'Stretch Series - Thoracic Bridge',
      'Front Split',
      'Stretch Series - Front Split',
      'Middle Split',
      'Stretch Series - Middle Split'
    ];

    if (strSereis.includes(keyName)) {
      setHideReps(true)
    }
    else {
      setHideReps(false)
    }

    setAllProgs(thirdRow.allData[keyName]);
  }

  const closeModal = () => {
    setPlayerState({
      open: false,
      videoName: '',
      title: '',
    });
  }

  const openVideoModal = (videoName, title) => {
    setPlayerState({
      open: true,
      videoName,
      title,
    });
  }

  const Wrapper = ({ children }) => {
    if (props.basicLayout) {
      return (
        <Grid container>
          {children}
        </Grid>
      )
    }
    else {
      return (
        <Container addedClasses={classes.background}>
          <GridContainer elevation={0} addbackground={false}>
            {children}
          </GridContainer>
        </Container>
      )
    }
  }

  console.log("secondRow:", secondRow)
  console.log("thirdRow:", thirdRow)
  console.log("allProgs:", allProgs)


  return (
    <Wrapper>
      <Box m={1} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
          <img className={classes.image} src={gfImage} alt="GymFit Logo" />
          <Typography variant='h3' className={classes.title}>
            Discover Our Course Content Below <span role='img' aria-labelledby='finger-down'>👇</span>
          </Typography>
        </Grid>
      </Box>
      <Box m={1} mb={2} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.flexFlow} >
          {
            mainCourses.map((course, key) => <CourseCards title={course.courseName} handleClick={() => handleCardClick(course)} imageUrl={course.imgUrl} key={key} />)
          }
        </Grid>
      </Box>
      {
        secondRow.show
          ? <>
            <Divider style={{ width: '100%' }} ref={secondRowRef} />
            <Box m={1} mb={2} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.flexFlow}>
                {
                  secondRow.data.map((course, key) => <CourseCards title={course.name} handleClick={() => handleThirdRowClick(course)} imageUrl={course.imgUrl} key={course.name + key} />)
                }
              </Grid>
            </Box>
          </>
          : null
      }
      {
        thirdRow.show
          ? <>
            <Divider style={{ width: '100%' }} />
            <div style={{ position: 'relative' }}>
              <div ref={thirdRowRef} style={{ position: 'absolute', top: -54, left: 0 }}></div>
            </div>
            <Box m={1} mb={2} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={12} lg={12} className={clsx(classes.flexFlow, { [classes.loading]: thirdRow.loading })}>
                {
                  thirdRow.loading
                    ? <CircularProgress color='primary' />
                    : thirdRow.data.map((course, key) => <CourseCards title={course} handleClick={() => handleShowProgs(course)} imageUrl={`${thirdRow.imagePrefix}-${cleanName(course)}.jpg`} key={course + key} />)
                }
              </Grid>
            </Box>
          </>
          : null
      }
      {
        allProgs.length > 0
          ? <Box style={{ width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <div ref={allProgsRef} style={{ position: 'absolute', top: -54, left: 0 }}></div>
            </div>
            {allProgs.map((prog, key) => <ProgressionRows hideReps={hideReps} key={key} openVideoModal={openVideoModal} {...prog} />)}
          </Box>
          : null
      }
      <CourseLibraryPlayer CloseModal={closeModal} {...playerState} />
      <OhNoModal open={ohNoModal} handleClose={() => setOhNoModal(false)} />
    </Wrapper>
  );
}


export default CourseLibrary;

