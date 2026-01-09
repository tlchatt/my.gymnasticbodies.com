import { getCalanderDate } from "../../Components/UtilComponents/GetCurrentWeek"
import Axios from 'axios'
import * as actionTypes from '../Action/actionTypes';
import _ from 'lodash';
import { ManageDificultyNew, SaveNotesLevelsNew } from "./LevelsActions";

const NEWAPI = process.env.REACT_APP_API_NEW
const config = {
    headers: {
        "Content-Type": "application/json"
    }
}
const showRefreshArray = ['Warm-Up', 'Mobility', 'Stretch'];
const checkGroup = workouts => {
    const first = workouts[0].group;
    return workouts.every(item => item.group === first) ? first : '';
}
export const getData = () => (dispatch, getState) => {
    let intermediateOne = {
        "MONDAY,DECEMBER 15": [
            {
                "scheduleId": 518520,
                "classId": 59600,
                "type": "Class",
                "dayIndex": 1,
                "workout":
                {
                    "className": "7 Minute Warm-Up",
                    "trainingType": "Warm-Up",
                    "mediaId": "jTRUtQhq.json?exp=1766067687919&sig=64547cb3781a4883e5127a12cb5943ff",
                    "image": "330x220-7min.jpg",
                    "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518521,
                "classId": 59614,
                "type": "Class",
                "dayIndex": 1,
                "workout":
                {
                    "className": "Weighted Mobility",
                    "trainingType": "Mobility",
                    "mediaId": "mKoTBi6y.json?exp=1766067687919&sig=dd71ba5d16f64c3466423e7466789d5f",
                    "image": "330x2202-1.jpg",
                    "description": "Fast track your mobility progress by adding load to this 15-minute weighted full-body routine. Give special attention to the areas that need it most, including your wrists, neck, shoulders, and hips!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518522,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 1,
                "workout": {
                    "LEVEL 1": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 30,
                                "name": "Incline Pushup",
                                "image": "HBPPE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211479,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Incline Pushup",
                                        "setsAndReps": "3x3r",
                                        "imageName": "HBPPE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 30,
                                                "instructions": "Place your hands at shoulder width on a hip-height bar or other stable object. Extend your arms and step away from the support to approximately a 45-degree body angle. Straighten your knees, bring your feet together, and lift your heels. Engage your abs and glutes to achieve a posterior pelvic tilt (PPT). Spread your shoulder blades apart (protract) by pressing your chest away from your hands. Now bend your elbows and begin to lower your body down, keeping it straight. If you are positioned properly, you'll be able to lower the center of your chest between your hands. As soon as your chest touches, push back up with a straight body and control. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 800,
                                                "exerciseId": 30,
                                                "tag": 3,
                                                "videoName": "nZJfwDyx.json?exp=1766067687992&sig=53202fb63da83867eb68fa046e67db76",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 824,
                                                "exerciseId": 30,
                                                "tag": 4,
                                                "videoName": "IP1MFSPF.json?exp=1766067687992&sig=624f6e14dff3c9843b99fca4d1394aac",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "German Arm Swing",
                                        "setsAndReps": "3x10r",
                                        "imageName": "HBPPE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 30,
                                                "instructions": "Begin standing with your arms at your sides. Raise your right arm up and behind your head. As you raise it, bend your elbow and reach across toward the back of your left shoulder. At the same time, reach your left arm across your stomach. As you reach, bend your elbow and reach your left hand toward your right ribs. Keep your elbows bent, swing your arms, and reverse positions. Continue to swing for reps, alternating arm positions each rep.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 799,
                                                "exerciseId": 30,
                                                "tag": 2,
                                                "videoName": "sSwaZ69q.json?exp=1766067687992&sig=0f474b98c77089b98a1f5967d4fabfe1",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 825,
                                                "exerciseId": 30,
                                                "tag": 4,
                                                "videoName": "npUh5tRS.json?exp=1766067687993&sig=eec05ea533b07626010e4027c33be692",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 36,
                                "name": "Incline Row",
                                "image": "RCPE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211480,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Incline Row",
                                        "setsAndReps": "3x3r",
                                        "imageName": "RCPE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 36,
                                                "instructions": "Set two gymnastic rings to approximately head height. Stand one step in front of the ring’s support and grab ahold of them. Lean back while holding on firmly and extending your elbows completely. You should now be hanging from the rings at approximately a 45-degree angle. Finish the setup by achieving a straight body line; you should be straight through your ankles, knees, hips, and shoulders. Keep your abs and glutes engaged as you pull up with a straight body until your palms touch your shoulders. Lower down with control and repeat for reps.",
                                                "equipment": "Gymnastic Rings, TRX"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 968,
                                                "exerciseId": 36,
                                                "tag": 3,
                                                "videoName": "VwP10w94.json?exp=1766067687993&sig=1751910e2429851ca5f5cd143f5f7187",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 992,
                                                "exerciseId": 36,
                                                "tag": 4,
                                                "videoName": "yzByRFxd.json?exp=1766067687993&sig=e58a03414cbc63452260f9dbbd6f29dc",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "One Arm Upright Lat Lean",
                                        "setsAndReps": "3x15s@",
                                        "imageName": "RCPE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 36,
                                                "description": "1) Sit back strongly while keeping the torso upright.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 36,
                                                "instructions": "Stand approximately 1 foot from the stall bars or other sturdy grip that is near chest height. Grab on with one arm and sit back, bending your knees and keeping your torso upright. Lean back until your elbow straightens and your arm is parallel to the floor. Hold this position for time, allowing your supporting shoulder to stretch away from the bars (protract) by maintaining backward pressure. The more you sit back and weight the supporting arm, the deeper your lat will be stretched. Switch and hold for an equal amount of time with the opposite arm.",
                                                "equipment": "Fixed Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 967,
                                                "exerciseId": 36,
                                                "tag": 2,
                                                "videoName": "xB76qD36.json?exp=1766067687993&sig=524df9976454db550372813b2f603a08",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 993,
                                                "exerciseId": 36,
                                                "tag": 4,
                                                "videoName": "9a3q1BS8.json?exp=1766067687993&sig=e509fe2ce00724fc74d13ecf83adbb35",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 7,
                                "name": "Scapular Shrugs",
                                "image": "sPLPE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211481,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Scapular Shrugs",
                                        "setsAndReps": "3x3r",
                                        "imageName": "sPLPE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 7,
                                                "instructions": "Begin scapular shrugs in a plank. Without allowing your elbows to bend, descend by pinching your shoulder blades all the way together (retract) and ascend by spreading them apart (protract). Be sure you keep your glutes and abs engaged to prevent your back from sagging as you retract and protract for reps. Your goal is to isolate the movement to your shoulder blades and keep the rest of your body still.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 169,
                                                "exerciseId": 7,
                                                "tag": 3,
                                                "videoName": "LgNSLUfk.json?exp=1766067687993&sig=9aa0cd989c48a10b072f85098cbc5bc2",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 193,
                                                "exerciseId": 7,
                                                "tag": 4,
                                                "videoName": "93mM4c9F.json?exp=1766067687993&sig=2343326526c6d6bebab013072005c8ea",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Swivel Hips",
                                        "setsAndReps": "3x5r",
                                        "imageName": "sPLPE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 7,
                                                "instructions": "Begin seated on the floor with your legs hip-width apart. Bend your knees and hips to approximately 90-degrees and place your feet flat on the floor. Keep your torso as upright as possible and drop both knees down to one side. Pause briefly, bring your knees back up, and repeat on the opposite side. It is essential to keep both of your glutes in contact with the floor at all times. Eventually, you'll be able to get both knees down to the floor without having to lose glute-to-floor contact. If you have a hard time staying upright, do these with your back against the wall. Swivel side to side for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 168,
                                                "exerciseId": 7,
                                                "tag": 2,
                                                "videoName": "DAaTAFO3.json?exp=1766067687993&sig=939885c8f4b60227728c12616c025c61",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 194,
                                                "exerciseId": 7,
                                                "tag": 4,
                                                "videoName": "goeXjAS2.json?exp=1766067687993&sig=5b3e3b686a4266e4affc02c8027611f9",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "TUESDAY,DECEMBER 16": [
            {
                "scheduleId": 518523,
                "classId": 59600,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "7 Minute Warm-Up",
                    "trainingType": "Warm-Up",
                    "mediaId": "jTRUtQhq.json?exp=1766067687993&sig=70612e8d35ae3325072bede95620bfe1",
                    "image": "330x220-7min.jpg",
                    "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518524,
                "classId": 59172,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "Knee Series",
                    "trainingType": "Mobility",
                    "mediaId": "ilJknNOo.json?exp=1766067687993&sig=c98717d1888455423e8159809f382b87",
                    "image": "330x220-KneeSeries.jpg",
                    "description": "Knee pain is NOT inevitable! In 15 minutes you can strengthen the muscles, tendons, and ligaments of the knees, significantly decrease your injury risk, and improve your knee health. Prepare your knees for the unexpected twists and turns of life using this series—you’ll be happy that you did!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518525,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {
                        "Front Lever": [
                            {
                                "exerciseId": 1,
                                "name": "Bent Hollow Body Hold",
                                "image": "FLPE1",
                                "group": "Foundation Core",
                                "exerciseNotation": "A1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 85,
                                        "masteryLevel": "60s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "2": {
                                        "masterySetId": 86,
                                        "masteryLevel": "60s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "12s"
                                    },
                                    "3": {
                                        "masterySetId": 87,
                                        "masteryLevel": "60s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "24s"
                                    },
                                    "4": {
                                        "masterySetId": 89,
                                        "masteryLevel": "60s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "5": {
                                        "masterySetId": 90,
                                        "masteryLevel": "60s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "36s"
                                    },
                                    "6": {
                                        "masterySetId": 91,
                                        "masteryLevel": "60s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "36s"
                                    },
                                    "7": {
                                        "masterySetId": 93,
                                        "masteryLevel": "60s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "48s"
                                    },
                                    "8": {
                                        "masterySetId": 94,
                                        "masteryLevel": "60s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "60s"
                                    },
                                    "9": {
                                        "masterySetId": 95,
                                        "masteryLevel": "60s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "60s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211476,
                                "setsAndReps": "3x12s",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Bent Hollow Body Hold",
                                        "setsAndReps": "3x12s",
                                        "imageName": "FLPE1",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 1,
                                                "instructions": "Lie on your back with your arms by your sides and feet flat. Engage your abs to press your lower back firmly into floor. Lift your shoulder blades and feet just off the ground. Keep your lower back flat, and knees bent. Hold for time. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 3,
                                                "exerciseId": 1,
                                                "tag": 3,
                                                "videoName": "Kn6ka1Ub.json?exp=1766067688006&sig=f9503ed19c3137da8c5caf826a68c144",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 27,
                                                "exerciseId": 1,
                                                "tag": 4,
                                                "videoName": "MO34nqp2.json?exp=1766067688006&sig=a6ddedde1c9736f287a2805456adb9f7",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Cat-Cow",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLPE1IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 1,
                                                "instructions": "Start kneeling on all fours with your wrists under your shoulders and your knees under your hips. Keep your elbows straight, look up toward the ceiling, and arch your back as much as is comfortable. Pause momentarily, tuck your chin, and round your back. During the arch (cow), pinch your shoulder blades together. During the curl (cat), spread your shoulder blades apart. Repeat for reps. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 2,
                                                "exerciseId": 1,
                                                "tag": 2,
                                                "videoName": "D5ovGHOR.json?exp=1766067688006&sig=afb52eac8e14459626f9805a8b41102c",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 28,
                                                "exerciseId": 1,
                                                "tag": 4,
                                                "videoName": "PFklWuZs.json?exp=1766067688006&sig=084839cec0247c9402bbdea52db32511",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 13,
                                "name": "Seated Russian Twist",
                                "image": "SLPE1",
                                "group": "Foundation Core",
                                "exerciseNotation": "B1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 37,
                                        "masteryLevel": "30r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "2": {
                                        "masterySetId": 38,
                                        "masteryLevel": "30r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "3": {
                                        "masterySetId": 39,
                                        "masteryLevel": "30r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12r"
                                    },
                                    "4": {
                                        "masterySetId": 41,
                                        "masteryLevel": "30r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "5": {
                                        "masterySetId": 42,
                                        "masteryLevel": "30r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18r"
                                    },
                                    "6": {
                                        "masterySetId": 43,
                                        "masteryLevel": "30r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18r"
                                    },
                                    "7": {
                                        "masterySetId": 45,
                                        "masteryLevel": "30r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24r"
                                    },
                                    "8": {
                                        "masterySetId": 46,
                                        "masteryLevel": "30r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30r"
                                    },
                                    "9": {
                                        "masterySetId": 47,
                                        "masteryLevel": "30r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211477,
                                "setsAndReps": "3x6r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Seated Russian Twist",
                                        "setsAndReps": "3x6r",
                                        "imageName": "SLPE1",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 13,
                                                "instructions": "Begin seated on the floor with knees bent, feet flat and torso upright. Extend a weight straight out in front of you, straighten your back, and engage your abs. Lean back so your torso is angled approximately 45-degrees to the floor. Lift your toes so only your sit bones and heels of your feet are supporting you. Now rotate your torso to your right, keeping the weight in line with the middle of your chest. Twist as far as you can to your right, attempting to get the weight to the floor. Do not simply drop the weight to your side; twist in order to get it to the floor. Rotate back to center, switch sides, and continue to alternate for reps.",
                                                "equipment": "Dumbbell, Weight Plate"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 335,
                                                "exerciseId": 13,
                                                "tag": 3,
                                                "videoName": "9FR3qURk.json?exp=1766067688006&sig=7d35ee537c6767bffd5ce88842c75653",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 359,
                                                "exerciseId": 13,
                                                "tag": 4,
                                                "videoName": "PJ9TIrum.json?exp=1766067688006&sig=d5d5d21160d4ad1bd5b622ece873c889",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Standing Hip Circle",
                                        "setsAndReps": "3x10r",
                                        "imageName": "SLPE1IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 13,
                                                "description": "1) Keep the hip circle smooth by pressing the hips out strongly to the sides.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 13,
                                                "instructions": "Begin by standing with your feet together and hands resting on your hips. Straighten your knees and begin to circle your hips clockwise. Keep your torso tall and legs straight during the hip circles. Push your hips out to the side strongly and repeat for reps. Now switch directions and perform an equal number of counterclockwise circles to finish the set.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 334,
                                                "exerciseId": 13,
                                                "tag": 2,
                                                "videoName": "RoHm6iH1.json?exp=1766067688006&sig=3340b999d5f74bade45426e422337819",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 360,
                                                "exerciseId": 13,
                                                "tag": 4,
                                                "videoName": "D5ZEmCet.json?exp=1766067688006&sig=e88ee30a3471bb23d249e74da5cfb0b7",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 19,
                                "name": "Tuck-Up",
                                "image": "MNPE1",
                                "group": "Foundation Core",
                                "exerciseNotation": "C1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211478,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Tuck-Up",
                                        "setsAndReps": "3x3r",
                                        "imageName": "MNPE1",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 19,
                                                "instructions": "Start by lying flat on your back, with your arms overhead and feet together. Point your toes and engage your quads. To initiate the tuck-up, lift up your arms, trunk, and legs at the same time. Sit your torso up tall, using your core and hips to bring your knees to your chest. You should now be balancing on your sit bones, with your knees bent and pulled in as close to your chest as possible. Pause momentarily before lowering back to the starting position with control. Your eventual goal is to make full thigh-to-chest contact. Relax momentarily as you lay flat between repetitions.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 503,
                                                "exerciseId": 19,
                                                "tag": 3,
                                                "videoName": "CPCNDw5Q.json?exp=1766067688006&sig=7a4f8ad314de5712941926e816a8d01e",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 527,
                                                "exerciseId": 19,
                                                "tag": 4,
                                                "videoName": "ak5sTPz9.json?exp=1766067688006&sig=d07b5ba4b341b5894cf14b00ca00b004",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Stiff Leg Windmill",
                                        "setsAndReps": "3x5r",
                                        "imageName": "MNPE1IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 19,
                                                "instructions": "Set up for the stiff-leg windmill by standing with your feet straddled apart slightly wider than hip-width. Next, fully extend the weight overhead. If the weight is in your left hand, ensure your left foot is pointed directly forward and your right foot is turned to the outside 90-degrees. You must keep the dumbbell above your supporting shoulder and both knees completely locked at all times throughout this movement. Initiate the windmill by folding forward, reaching to the floor and then through your legs with the non-weighted arm while steadily rotating the overhead weight by internally rotating your shoulder. As you go deeper in to the stretch, allow the weight to rotate but pay special attention to keeping it stacked directly above your shoulder. Repeat for an equal number of reps on each side.",
                                                "equipment": "Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 502,
                                                "exerciseId": 19,
                                                "tag": 2,
                                                "videoName": "LtC8WEXn.json?exp=1766067688006&sig=d23d5d0d373bd9df53c0647a048dbeaf",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 528,
                                                "exerciseId": 19,
                                                "tag": 4,
                                                "videoName": "YNeaaVAB.json?exp=1766067688006&sig=84aad95d5681a3e98c0ed34032160f56",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            },
            {
                "scheduleId": 518526,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 25,
                                "name": "Assisted Squat",
                                "image": "SLSPE1",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211482,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Assisted Squat",
                                        "setsAndReps": "3x3r",
                                        "imageName": "SLSPE1",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 25,
                                                "description": "1) Sit backwards into the squat rather than allowing the knees to come forward",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 25,
                                                "instructions": "Begin standing within arm's reach of a stable object that you can use for light support. Place with your feet just outside of hip-width, get a firm grip on your support object, and prepare to squat down. Bend at your knees to initiate the squat. As you lower down sit back and use your arms to help keep your knees roughly over your ankles. Be sure your knees do not collapse inside of your feet at any point. When your thighs reach parallel to the floor, pause momentarily. Squat back up, still using your arms as necessary, and repeat for reps. ",
                                                "equipment": "Fixed Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 665,
                                                "exerciseId": 25,
                                                "tag": 3,
                                                "videoName": "0a1ZtU4r.json?exp=1766067688010&sig=0b6b5f711c8c40249cd938a65aa736d0",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 689,
                                                "exerciseId": 25,
                                                "tag": 4,
                                                "videoName": "ZcTbD4fJ.json?exp=1766067688010&sig=88b0bd85d4969362d4158d6a29c8af37",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Sideprone Lift",
                                        "setsAndReps": "3x3r",
                                        "imageName": "SLSPE1IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 25,
                                                "description": "1) Toes should be pulled back and not pointed in the mobility ",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 25,
                                                "instructions": "Begin lying on the floor on your right side. Rest on your right elbow and prop your head up in your hand. Straighten your top (left) leg completely, pull your toes toward your head (flex your foot), and engage your quad. Lift your leg straight up toward the ceiling without allowing your leg to rotate; keep your knee facing forward. Lift your leg straight up as high as you can, pause, and lower back down. Ensure you do not allow your leg to drift forward or backward during this exercise. Continue to move straight up and down for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1858,
                                                "exerciseId": 25,
                                                "tag": 2,
                                                "videoName": "EqMaiUSk.json?exp=1766067688010&sig=a6959e7f18bc8a53227a4b7362e25085",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 690,
                                                "exerciseId": 25,
                                                "tag": 4,
                                                "videoName": "QWWVXuIt.json?exp=1766067688010&sig=4871408bb25b535f8c7fe918a0b818da",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "WEDNESDAY,DECEMBER 17": [
            {
                "scheduleId": 518527,
                "classId": 59216,
                "type": "Class",
                "dayIndex": 3,
                "workout": {
                    "className": "Front Split",
                    "trainingType": "Stretch",
                    "mediaId": "aH1k32u9.json?exp=1766067688010&sig=2eb27af45a193ae3178b8ebbbb08865d",
                    "image": "stretch-front-split.jpg",
                    "description": "A perfect 45-minute mobility routine for athletes and office workers alike! Tension in the quads, hip flexors, feet, calves, and hamstrings will rapidly disappear with continued use of this sequence. If Front Splits are your goal, start here!",
                    "isLogged": false
                }
            }
        ],
        "THURSDAY,DECEMBER 18": [
            {
                "scheduleId": 518528,
                "classId": 59600,
                "type": "Class",
                "dayIndex": 4,
                "workout": {
                    "className": "7 Minute Warm-Up",
                    "trainingType": "Warm-Up",
                    "mediaId": "jTRUtQhq.json?exp=1766067688010&sig=8b3de9ffe287727eb446423f9419287c",
                    "image": "330x220-7min.jpg",
                    "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518529,
                "classId": 59168,
                "type": "Class",
                "dayIndex": 4,
                "workout": {
                    "className": "Single Bar Shoulder Mobility",
                    "trainingType": "Mobility",
                    "mediaId": "R7I0tq38.json?exp=1766067688010&sig=1e0dda951622f10d0d5d3d2b26d80aac",
                    "image": "330x220-BarShoulder.jpg",
                    "description": "All you need is a single bar and a pair of rings to create mobility in the shoulders through hanging, twisting, and pulling. This 10-minute follow-along is the perfect addition to any upper body strength training–use it for warm up, cool down, or on a recovery day to keep your shoulders happy!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518530,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 4,
                "workout": {
                    "LEVEL 1": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 30,
                                "name": "Incline Pushup",
                                "image": "HBPPE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211479,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Incline Pushup",
                                        "setsAndReps": "3x3r",
                                        "imageName": "HBPPE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 30,
                                                "instructions": "Place your hands at shoulder width on a hip-height bar or other stable object. Extend your arms and step away from the support to approximately a 45-degree body angle. Straighten your knees, bring your feet together, and lift your heels. Engage your abs and glutes to achieve a posterior pelvic tilt (PPT). Spread your shoulder blades apart (protract) by pressing your chest away from your hands. Now bend your elbows and begin to lower your body down, keeping it straight. If you are positioned properly, you'll be able to lower the center of your chest between your hands. As soon as your chest touches, push back up with a straight body and control. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 800,
                                                "exerciseId": 30,
                                                "tag": 3,
                                                "videoName": "nZJfwDyx.json?exp=1766067688084&sig=083027eb420f5de716a7c076aefef830",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 824,
                                                "exerciseId": 30,
                                                "tag": 4,
                                                "videoName": "IP1MFSPF.json?exp=1766067688084&sig=5bf53d0684d99f435fc08959bde4c209",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "German Arm Swing",
                                        "setsAndReps": "3x10r",
                                        "imageName": "HBPPE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 30,
                                                "instructions": "Begin standing with your arms at your sides. Raise your right arm up and behind your head. As you raise it, bend your elbow and reach across toward the back of your left shoulder. At the same time, reach your left arm across your stomach. As you reach, bend your elbow and reach your left hand toward your right ribs. Keep your elbows bent, swing your arms, and reverse positions. Continue to swing for reps, alternating arm positions each rep.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 799,
                                                "exerciseId": 30,
                                                "tag": 2,
                                                "videoName": "sSwaZ69q.json?exp=1766067688084&sig=06e41e630e6911750b30e7c83a782851",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 825,
                                                "exerciseId": 30,
                                                "tag": 4,
                                                "videoName": "npUh5tRS.json?exp=1766067688084&sig=2129c44a13fbf6b3c1d0b872f2623cd8",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 36,
                                "name": "Incline Row",
                                "image": "RCPE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211480,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Incline Row",
                                        "setsAndReps": "3x3r",
                                        "imageName": "RCPE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 36,
                                                "instructions": "Set two gymnastic rings to approximately head height. Stand one step in front of the ring’s support and grab ahold of them. Lean back while holding on firmly and extending your elbows completely. You should now be hanging from the rings at approximately a 45-degree angle. Finish the setup by achieving a straight body line; you should be straight through your ankles, knees, hips, and shoulders. Keep your abs and glutes engaged as you pull up with a straight body until your palms touch your shoulders. Lower down with control and repeat for reps.",
                                                "equipment": "Gymnastic Rings, TRX"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 968,
                                                "exerciseId": 36,
                                                "tag": 3,
                                                "videoName": "VwP10w94.json?exp=1766067688084&sig=b52bc3b029a53c292bcdc7a336e8b73b",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 992,
                                                "exerciseId": 36,
                                                "tag": 4,
                                                "videoName": "yzByRFxd.json?exp=1766067688084&sig=02f9f7660fb1e40c10a5dd1be906a57e",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "One Arm Upright Lat Lean",
                                        "setsAndReps": "3x15s@",
                                        "imageName": "RCPE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 36,
                                                "description": "1) Sit back strongly while keeping the torso upright.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 36,
                                                "instructions": "Stand approximately 1 foot from the stall bars or other sturdy grip that is near chest height. Grab on with one arm and sit back, bending your knees and keeping your torso upright. Lean back until your elbow straightens and your arm is parallel to the floor. Hold this position for time, allowing your supporting shoulder to stretch away from the bars (protract) by maintaining backward pressure. The more you sit back and weight the supporting arm, the deeper your lat will be stretched. Switch and hold for an equal amount of time with the opposite arm.",
                                                "equipment": "Fixed Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 967,
                                                "exerciseId": 36,
                                                "tag": 2,
                                                "videoName": "xB76qD36.json?exp=1766067688084&sig=a1eb3b068e384b9f40b5d233f6780458",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 993,
                                                "exerciseId": 36,
                                                "tag": 4,
                                                "videoName": "9a3q1BS8.json?exp=1766067688084&sig=61fb64ea07a619b333d6830f0a008348",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 7,
                                "name": "Scapular Shrugs",
                                "image": "sPLPE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211481,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Scapular Shrugs",
                                        "setsAndReps": "3x3r",
                                        "imageName": "sPLPE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 7,
                                                "instructions": "Begin scapular shrugs in a plank. Without allowing your elbows to bend, descend by pinching your shoulder blades all the way together (retract) and ascend by spreading them apart (protract). Be sure you keep your glutes and abs engaged to prevent your back from sagging as you retract and protract for reps. Your goal is to isolate the movement to your shoulder blades and keep the rest of your body still.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 169,
                                                "exerciseId": 7,
                                                "tag": 3,
                                                "videoName": "LgNSLUfk.json?exp=1766067688084&sig=ccecf0f4fafc199ca5bdd5ffd3e58aa0",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 193,
                                                "exerciseId": 7,
                                                "tag": 4,
                                                "videoName": "93mM4c9F.json?exp=1766067688084&sig=3ad7f145cb78e547b849502359c1f0a9",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Swivel Hips",
                                        "setsAndReps": "3x5r",
                                        "imageName": "sPLPE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 7,
                                                "instructions": "Begin seated on the floor with your legs hip-width apart. Bend your knees and hips to approximately 90-degrees and place your feet flat on the floor. Keep your torso as upright as possible and drop both knees down to one side. Pause briefly, bring your knees back up, and repeat on the opposite side. It is essential to keep both of your glutes in contact with the floor at all times. Eventually, you'll be able to get both knees down to the floor without having to lose glute-to-floor contact. If you have a hard time staying upright, do these with your back against the wall. Swivel side to side for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 168,
                                                "exerciseId": 7,
                                                "tag": 2,
                                                "videoName": "DAaTAFO3.json?exp=1766067688084&sig=7ef145c422a95d65de11ca1582d1e4df",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 194,
                                                "exerciseId": 7,
                                                "tag": 4,
                                                "videoName": "goeXjAS2.json?exp=1766067688084&sig=beb1eef68175a0a84a5c0833ae60a437",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "FRIDAY,DECEMBER 19": [
            {
                "scheduleId": 518531,
                "classId": 59600,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "7 Minute Warm-Up",
                    "trainingType": "Warm-Up",
                    "mediaId": "jTRUtQhq.json?exp=1766067688084&sig=1666fcab51ee00b17bb7c8b35258235f",
                    "image": "330x220-7min.jpg",
                    "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518532,
                "classId": 59172,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "Knee Series",
                    "trainingType": "Mobility",
                    "mediaId": "ilJknNOo.json?exp=1766067688084&sig=9da2f08bab566c64f5ad44b0667c504f",
                    "image": "330x220-KneeSeries.jpg",
                    "description": "Knee pain is NOT inevitable! In 15 minutes you can strengthen the muscles, tendons, and ligaments of the knees, significantly decrease your injury risk, and improve your knee health. Prepare your knees for the unexpected twists and turns of life using this series—you’ll be happy that you did!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518533,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {
                        "Front Lever": [
                            {
                                "exerciseId": 1,
                                "name": "Bent Hollow Body Hold",
                                "image": "FLPE1",
                                "group": "Foundation Core",
                                "exerciseNotation": "A1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 85,
                                        "masteryLevel": "60s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "2": {
                                        "masterySetId": 86,
                                        "masteryLevel": "60s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "12s"
                                    },
                                    "3": {
                                        "masterySetId": 87,
                                        "masteryLevel": "60s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "24s"
                                    },
                                    "4": {
                                        "masterySetId": 89,
                                        "masteryLevel": "60s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "5": {
                                        "masterySetId": 90,
                                        "masteryLevel": "60s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "36s"
                                    },
                                    "6": {
                                        "masterySetId": 91,
                                        "masteryLevel": "60s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "36s"
                                    },
                                    "7": {
                                        "masterySetId": 93,
                                        "masteryLevel": "60s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "48s"
                                    },
                                    "8": {
                                        "masterySetId": 94,
                                        "masteryLevel": "60s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "60s"
                                    },
                                    "9": {
                                        "masterySetId": 95,
                                        "masteryLevel": "60s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "60s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211476,
                                "setsAndReps": "3x12s",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Bent Hollow Body Hold",
                                        "setsAndReps": "3x12s",
                                        "imageName": "FLPE1",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 1,
                                                "instructions": "Lie on your back with your arms by your sides and feet flat. Engage your abs to press your lower back firmly into floor. Lift your shoulder blades and feet just off the ground. Keep your lower back flat, and knees bent. Hold for time. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 3,
                                                "exerciseId": 1,
                                                "tag": 3,
                                                "videoName": "Kn6ka1Ub.json?exp=1766067688089&sig=de341f0bb4ed465d83195736ee873e10",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 27,
                                                "exerciseId": 1,
                                                "tag": 4,
                                                "videoName": "MO34nqp2.json?exp=1766067688089&sig=5bf75d0e4468a1f9f709a74f1d7218c8",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Cat-Cow",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLPE1IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 1,
                                                "instructions": "Start kneeling on all fours with your wrists under your shoulders and your knees under your hips. Keep your elbows straight, look up toward the ceiling, and arch your back as much as is comfortable. Pause momentarily, tuck your chin, and round your back. During the arch (cow), pinch your shoulder blades together. During the curl (cat), spread your shoulder blades apart. Repeat for reps. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 2,
                                                "exerciseId": 1,
                                                "tag": 2,
                                                "videoName": "D5ovGHOR.json?exp=1766067688089&sig=284b90470c8b9b07c2dcd0edd70a12e5",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 28,
                                                "exerciseId": 1,
                                                "tag": 4,
                                                "videoName": "PFklWuZs.json?exp=1766067688089&sig=40546aa9ec0879d97606433890569861",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 13,
                                "name": "Seated Russian Twist",
                                "image": "SLPE1",
                                "group": "Foundation Core",
                                "exerciseNotation": "B1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 37,
                                        "masteryLevel": "30r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "2": {
                                        "masterySetId": 38,
                                        "masteryLevel": "30r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "3": {
                                        "masterySetId": 39,
                                        "masteryLevel": "30r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12r"
                                    },
                                    "4": {
                                        "masterySetId": 41,
                                        "masteryLevel": "30r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "5": {
                                        "masterySetId": 42,
                                        "masteryLevel": "30r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18r"
                                    },
                                    "6": {
                                        "masterySetId": 43,
                                        "masteryLevel": "30r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18r"
                                    },
                                    "7": {
                                        "masterySetId": 45,
                                        "masteryLevel": "30r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24r"
                                    },
                                    "8": {
                                        "masterySetId": 46,
                                        "masteryLevel": "30r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30r"
                                    },
                                    "9": {
                                        "masterySetId": 47,
                                        "masteryLevel": "30r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211477,
                                "setsAndReps": "3x6r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Seated Russian Twist",
                                        "setsAndReps": "3x6r",
                                        "imageName": "SLPE1",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 13,
                                                "instructions": "Begin seated on the floor with knees bent, feet flat and torso upright. Extend a weight straight out in front of you, straighten your back, and engage your abs. Lean back so your torso is angled approximately 45-degrees to the floor. Lift your toes so only your sit bones and heels of your feet are supporting you. Now rotate your torso to your right, keeping the weight in line with the middle of your chest. Twist as far as you can to your right, attempting to get the weight to the floor. Do not simply drop the weight to your side; twist in order to get it to the floor. Rotate back to center, switch sides, and continue to alternate for reps.",
                                                "equipment": "Dumbbell, Weight Plate"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 335,
                                                "exerciseId": 13,
                                                "tag": 3,
                                                "videoName": "9FR3qURk.json?exp=1766067688089&sig=c9b3e1474cd59b7e85fa625e5f16fc56",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 359,
                                                "exerciseId": 13,
                                                "tag": 4,
                                                "videoName": "PJ9TIrum.json?exp=1766067688089&sig=408f70cfc45fef68fd27bb2491fdc397",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Standing Hip Circle",
                                        "setsAndReps": "3x10r",
                                        "imageName": "SLPE1IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 13,
                                                "description": "1) Keep the hip circle smooth by pressing the hips out strongly to the sides.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 13,
                                                "instructions": "Begin by standing with your feet together and hands resting on your hips. Straighten your knees and begin to circle your hips clockwise. Keep your torso tall and legs straight during the hip circles. Push your hips out to the side strongly and repeat for reps. Now switch directions and perform an equal number of counterclockwise circles to finish the set.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 334,
                                                "exerciseId": 13,
                                                "tag": 2,
                                                "videoName": "RoHm6iH1.json?exp=1766067688089&sig=944e29a765943f764fcef104ab8ea2ae",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 360,
                                                "exerciseId": 13,
                                                "tag": 4,
                                                "videoName": "D5ZEmCet.json?exp=1766067688089&sig=8be1b7aa180e7d56e4d86f6c176e6002",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 19,
                                "name": "Tuck-Up",
                                "image": "MNPE1",
                                "group": "Foundation Core",
                                "exerciseNotation": "C1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211478,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Tuck-Up",
                                        "setsAndReps": "3x3r",
                                        "imageName": "MNPE1",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 19,
                                                "instructions": "Start by lying flat on your back, with your arms overhead and feet together. Point your toes and engage your quads. To initiate the tuck-up, lift up your arms, trunk, and legs at the same time. Sit your torso up tall, using your core and hips to bring your knees to your chest. You should now be balancing on your sit bones, with your knees bent and pulled in as close to your chest as possible. Pause momentarily before lowering back to the starting position with control. Your eventual goal is to make full thigh-to-chest contact. Relax momentarily as you lay flat between repetitions.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 503,
                                                "exerciseId": 19,
                                                "tag": 3,
                                                "videoName": "CPCNDw5Q.json?exp=1766067688089&sig=8982997518a34df415540ff0297195a2",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 527,
                                                "exerciseId": 19,
                                                "tag": 4,
                                                "videoName": "ak5sTPz9.json?exp=1766067688089&sig=a0837c5b54d6c93440dff07e3cf1e8a6",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Stiff Leg Windmill",
                                        "setsAndReps": "3x5r",
                                        "imageName": "MNPE1IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
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
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 19,
                                                "instructions": "Set up for the stiff-leg windmill by standing with your feet straddled apart slightly wider than hip-width. Next, fully extend the weight overhead. If the weight is in your left hand, ensure your left foot is pointed directly forward and your right foot is turned to the outside 90-degrees. You must keep the dumbbell above your supporting shoulder and both knees completely locked at all times throughout this movement. Initiate the windmill by folding forward, reaching to the floor and then through your legs with the non-weighted arm while steadily rotating the overhead weight by internally rotating your shoulder. As you go deeper in to the stretch, allow the weight to rotate but pay special attention to keeping it stacked directly above your shoulder. Repeat for an equal number of reps on each side.",
                                                "equipment": "Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 502,
                                                "exerciseId": 19,
                                                "tag": 2,
                                                "videoName": "LtC8WEXn.json?exp=1766067688089&sig=50df8e0c171383afe35c0c7ebab855e3",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 528,
                                                "exerciseId": 19,
                                                "tag": 4,
                                                "videoName": "YNeaaVAB.json?exp=1766067688089&sig=8ba84de3b9a1734844ae5f3ebe965f0b",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            },
            {
                "scheduleId": 518534,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 25,
                                "name": "Assisted Squat",
                                "image": "SLSPE1",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A1",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211482,
                                "setsAndReps": "3x3r",
                                "order": 1,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Assisted Squat",
                                        "setsAndReps": "3x3r",
                                        "imageName": "SLSPE1",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 25,
                                                "description": "1) Sit backwards into the squat rather than allowing the knees to come forward",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 25,
                                                "instructions": "Begin standing within arm's reach of a stable object that you can use for light support. Place with your feet just outside of hip-width, get a firm grip on your support object, and prepare to squat down. Bend at your knees to initiate the squat. As you lower down sit back and use your arms to help keep your knees roughly over your ankles. Be sure your knees do not collapse inside of your feet at any point. When your thighs reach parallel to the floor, pause momentarily. Squat back up, still using your arms as necessary, and repeat for reps. ",
                                                "equipment": "Fixed Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 665,
                                                "exerciseId": 25,
                                                "tag": 3,
                                                "videoName": "0a1ZtU4r.json?exp=1766067688092&sig=ef82b020c4cd3564c3700b915e56ecf6",
                                                "weekNum": 1,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 689,
                                                "exerciseId": 25,
                                                "tag": 4,
                                                "videoName": "ZcTbD4fJ.json?exp=1766067688092&sig=e66dff2f4a32bf60c31cd4b0587ec0d2",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Sideprone Lift",
                                        "setsAndReps": "3x3r",
                                        "imageName": "SLSPE1IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 25,
                                                "description": "1) Toes should be pulled back and not pointed in the mobility ",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 25,
                                                "instructions": "Begin lying on the floor on your right side. Rest on your right elbow and prop your head up in your hand. Straighten your top (left) leg completely, pull your toes toward your head (flex your foot), and engage your quad. Lift your leg straight up toward the ceiling without allowing your leg to rotate; keep your knee facing forward. Lift your leg straight up as high as you can, pause, and lower back down. Ensure you do not allow your leg to drift forward or backward during this exercise. Continue to move straight up and down for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1858,
                                                "exerciseId": 25,
                                                "tag": 2,
                                                "videoName": "EqMaiUSk.json?exp=1766067688092&sig=db7202a8ba11b0d05bc23e6427ba3620",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 690,
                                                "exerciseId": 25,
                                                "tag": 4,
                                                "videoName": "QWWVXuIt.json?exp=1766067688092&sig=5a01893ef60613e5c7200231062dbf13",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "SATURDAY,DECEMBER 20": [
            {
                "scheduleId": 518535,
                "classId": 59210,
                "type": "Class",
                "dayIndex": 6,
                "workout": {
                    "className": "Middle Split",
                    "trainingType": "Stretch",
                    "mediaId": "JatJjiFp.json?exp=1766067688092&sig=87f6760d8ecf6bc535602073a04963a3",
                    "image": "stretch-middle-split.jpg",
                    "description": "Everyone can start building the mobility necessary for the middle splits and pancake–no matter what your flexibility level is! This 45-minute sequence will help you find relief and develop flexibility throughout your lower body.",
                    "isLogged": false
                }
            }
        ],
        "SUNDAY,DECEMBER 21": null
    }
    let intermediateTwo = {
        "MONDAY,DECEMBER 15": [
            {
                "scheduleId": 518629,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 1,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068077520&sig=1481b6970ccdc3bcea50799ac9a394b3",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518630,
                "classId": 59915,
                "type": "Class",
                "dayIndex": 1,
                "workout": {
                    "className": "Weekly Shoulders",
                    "trainingType": "Mobility",
                    "mediaId": "cgQuL34L.json?exp=1766068077520&sig=37683fa59ff55163bba6a29dc01078c9",
                    "image": "330x220-satshoulders.jpg",
                    "description": "Follow along with this prehab routine used weekly by Coach Sommer’s athletes to keep your shoulders healthy and strong. All it requires is a couple light dumbbells and a set of rings.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518631,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 1,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 129,
                                "name": "Single Bar Dip",
                                "image": "HBPPE7",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211530,
                                "setsAndReps": "3x1r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Single Bar Dip",
                                        "setsAndReps": "3x1r",
                                        "imageName": "HBPPE7",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 129,
                                                "description": "1) Lightly slide down along the bar; do not lay on the bar.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 129,
                                                "description": "2) Full ROM is lowering to the bottom of the chest.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 129,
                                                "instructions": "Start supported above a single bar with your arms extended and body straight. Be sure your hands are placed at approximately shoulder width. Begin with and maintain strong scapular depression. Initiate the dip by bending your elbows. Lightly slide down the bar until the bottom of your chest touches it. Dip back up and repeat for reps. Minimize the piking of your hips at all times during the single bar dip and avoid resting on the bar. ",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1288,
                                                "exerciseId": 129,
                                                "tag": 1,
                                                "videoName": "M75P8tL0.json?exp=1766068077585&sig=eed5ba51fc45dd68d738d5ecdbb27176",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Static Cat",
                                        "setsAndReps": "3x30s",
                                        "imageName": "HBPPE7IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 129,
                                                "description": "1) At the bottom, the glutes should be either on top or just in front of the knees to maintain the intensity of the stretch.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 129,
                                                "instructions": "Begin kneeling with your hips above your knees. Slide your hands out in front of you straightening your elbows and shrugging your shoulders to your ears as your chest drops close to the floor. Keep your hips over your knees and continue to stretch your chest and arms toward the floor as you hold for time.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1289,
                                                "exerciseId": 129,
                                                "tag": 2,
                                                "videoName": "b9EfOeZR.json?exp=1766068077585&sig=8dfbfa224ecf59484bc7503ee90f5f97",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 137,
                                "name": "Negative Pull-up",
                                "image": "RCPE7",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 133,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "2": {
                                        "masterySetId": 134,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "3": {
                                        "masterySetId": 135,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "4": {
                                        "masterySetId": 137,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "5": {
                                        "masterySetId": 138,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "6": {
                                        "masterySetId": 139,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "7": {
                                        "masterySetId": 141,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4rx10s"
                                    },
                                    "8": {
                                        "masterySetId": 142,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5rx10s"
                                    },
                                    "9": {
                                        "masterySetId": 143,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5rx10s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211531,
                                "setsAndReps": "3x1rx10s",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Negative Pull-up",
                                        "setsAndReps": "3x1rx10s",
                                        "imageName": "RCPE7",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 137,
                                                "description": "1) Do not allow the chin to touch the bar at the top.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 137,
                                                "description": "2) Maintain an even tempo during the entire descent.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 137,
                                                "instructions": "Grab a pull-up bar with an over grip (palms away) and jump to the top of a pull-up position. Be sure your chin is over the bar at a minimum. Lower down, performing the negative, or eccentric, portion of a pull-up. Keep a steady pace and take a full 10 seconds to descend to straight elbows. Keep your feet together and body straight throughout the descent. At the bottom, relax into a full dead hang with elevated shoulders. Jump or step back up to the top and repeat.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1304,
                                                "exerciseId": 137,
                                                "tag": 1,
                                                "videoName": "ob9rG2mc.json?exp=1766068077585&sig=ef53eb882652a90b36868b6be88684bf",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Undergrip Bent Lean",
                                        "setsAndReps": "3x30s",
                                        "imageName": "RCPE7IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 137,
                                                "description": "1) Grasp the rail at approximately hip height.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 137,
                                                "description": "2) Use the hips to pull the torso away from the hands.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 137,
                                                "instructions": "Stand approximately 2 feet from the stall bars or other sturdy grip that is near hip-height. Grab on with both hands using an under-grip (palms up) and sit back, pulling against the bars and dropping your torso down. Lean back until your elbows straighten and your torso is roughly parallel to the floor. You should have a straight line from hands to hips. Maintain constant backward pressure to maximize the effectiveness of this stretch. Hold this stretch for time.",
                                                "equipment": "Fixed Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1305,
                                                "exerciseId": 137,
                                                "tag": 2,
                                                "videoName": "hBDYw3XP.json?exp=1766068077585&sig=6fde237d402397b79a3e23ab590c17a7",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 109,
                                "name": "Elevated Planche Bounce",
                                "image": "sPLPE7",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211526,
                                "setsAndReps": "3x3r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Elevated Planche Bounce",
                                        "setsAndReps": "3x3r",
                                        "imageName": "sPLPE7",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 109,
                                                "description": "1) As much as possible, initiate the lift from the upper back.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 109,
                                                "description": "2) Minimize the piking of hips during the bounces.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 109,
                                                "instructions": "Begin from a foot-elevated straight arm plank, with your feet placed on a box at approximately shoulder height. Ensure that your shoulders are directly above your hands, your elbows are completely straight, and your feet are together. Rotate your fingers out approximately 45-degrees and begin to lean forward. As your shoulders move in front of your hands, keep constant tension in your glutes and core to maintain a posterior pelvic tilt. Lean forward until you can shift your foot position from curled to pointed toes so that you're on the tops of your feet. At this point, your hands should be roughly underneath your hips. Push your chest away from the floor to keep your shoulder blades spread apart (protracted). Also keep your shoulders pressed down, away from your ears (depressed). Scapular protraction and depression are essential for maintaining a strong elevated planche lean position. From this elevated planche lean start position, bounce your legs up and down on the box. As you bounce, keep a comfortable head position, strong forward lean, and straight body. As much as possible, initiate each bounce from your upper back and not your hips. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1236,
                                                "exerciseId": 109,
                                                "tag": 1,
                                                "videoName": "s4NYHkFh.json?exp=1766068077585&sig=7e22a61dab23775c6ed89975ebc64fc0",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Prone Half Straddle Planche Double Leg Extension",
                                        "setsAndReps": "3x5r",
                                        "imageName": "sPLPE7IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 109,
                                                "description": "1) Do not allow the knees to drop below the hips at any time.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 109,
                                                "description": "2) The hips should remain completely open and flat.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 109,
                                                "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Bend your knees to 90-degrees and lift both legs up and as far sideways as possible. Be sure both of your thighs are parallel to the floor and you've achieved your widest half-straddle. Extend your legs until your knees completely straighten. Pause momentarily, retract your legs, and return to the prone half straddle. Repeat for reps.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1237,
                                                "exerciseId": 109,
                                                "tag": 2,
                                                "videoName": "9j43jx5r.json?exp=1766068077585&sig=f3d44b8b9a3d9c45e3f3bf9a9ff59bad",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "TUESDAY,DECEMBER 16": [
            {
                "scheduleId": 518632,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068077585&sig=f43bf395341c2348d0544d482e73bcb9",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518633,
                "classId": 60205,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "Stall Bar Stretch",
                    "trainingType": "Mobility",
                    "mediaId": "bDAm39hs.json?exp=1766068077585&sig=3b77f79d740379c1abeaaee4229ed48f",
                    "image": "330x220-stallbar-stretch-3.jpg",
                    "description": "Use stall bars to find relief through deep stretches in your upper and lower body. You’ll weight your straddle and pike stretches by hanging on the stall bars. You’ll also stretch your shoulders using the stall bars to go deeper. This 6-minute class is perfect for those days when you’re feeling frozen and locked up. Use it to loosen up before your workout or to shake out tension after!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518634,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {
                        "Front Lever": [
                            {
                                "exerciseId": 101,
                                "name": "Negative Body Lever Straddle",
                                "image": "FLPE7",
                                "group": "Foundation Core",
                                "exerciseNotation": "A7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 133,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "2": {
                                        "masterySetId": 134,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "3": {
                                        "masterySetId": 135,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "4": {
                                        "masterySetId": 137,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "5": {
                                        "masterySetId": 138,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "6": {
                                        "masterySetId": 139,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "7": {
                                        "masterySetId": 141,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4rx10s"
                                    },
                                    "8": {
                                        "masterySetId": 142,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5rx10s"
                                    },
                                    "9": {
                                        "masterySetId": 143,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5rx10s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211525,
                                "setsAndReps": "3x1rx10s",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Negative Body Lever Straddle",
                                        "setsAndReps": "3x1rx10s",
                                        "imageName": "FLPE7",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 101,
                                                "description": "1) Do not allow the lower back to arch during the descent.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 101,
                                                "description": "2) The arms should be comfortably bent.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 101,
                                                "instructions": "Lie on your back with your grip on a fixed object overhead–the bottom rung of stall bars or a braced partner’s ankles work well. Tuck your knees to assist with entering a candlestick position supported by your grip and shoulders, with legs extended upwards, glutes and core strongly contracted. Straddle your legs wide, lock your knees, continue to press your hips strongly forward, and slowly lower your body to the floor. As you lower, keep your body straight with posterior pelvic tilt (PPT). Do not allow your hips to pike at anytime during the movement. Take a full ten seconds to descend and aim to touch down one vertebrae at a time. Tuck back up to the starting candlestick position and repeat for reps.",
                                                "equipment": "Fixed Pole"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1220,
                                                "exerciseId": 101,
                                                "tag": 1,
                                                "videoName": "a7RyMr8T.json?exp=1766068077589&sig=a01129fce6aef8887989da35d2d9fd58",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Seal Rocks",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLPE7IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 101,
                                                "description": "1) Allow the lower back to arch fully in the front.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 101,
                                                "description": "2) Place the chest completely flat on the thighs in the rear.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 101,
                                                "instructions": "Begin kneeling, sitting back on your heels, with your torso folded over your thighs and arms extended long in front of you. Rock forward, straighten your legs, and press up through your arms to arch your spine. Keep your legs in contact with the floor. Keep your glutes engaged to help protect your low back and help you arch through your middle and upper spine. Straighten your elbows as much as possible and be sure to keep your hands directly under your shoulders. Push down into the floor and open your chest at the top of the stretch to keep your shoulder blades down and back (depressed and retracted). Look up. Press back to the start position and repeat for reps or time. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1221,
                                                "exerciseId": 101,
                                                "tag": 2,
                                                "videoName": "M0dImtXI.json?exp=1766068077589&sig=2c925623e3e5d9fe7deb04a0b4e7a0ac",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 113,
                                "name": "Straddle Reverse Leg Lift",
                                "image": "SLPE7",
                                "group": "Foundation Core",
                                "exerciseNotation": "B7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211527,
                                "setsAndReps": "3x2r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Straddle Reverse Leg Lift",
                                        "setsAndReps": "3x2r",
                                        "imageName": "SLPE7",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 113,
                                                "description": "1) Lift the heels all the way to horizontal.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 113,
                                                "description": "2) Pause briefly at the top of each repetition.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 113,
                                                "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Straddle your legs wide, lock your knees, point your toes, and slowly lift your legs to horizontal. Continue to straddle your legs as wide as possible during the lift. Pause briefly with your legs held parallel to the floor, lower slowly, and repeat for reps.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1244,
                                                "exerciseId": 113,
                                                "tag": 1,
                                                "videoName": "YUj1VUXX.json?exp=1766068077589&sig=631c0d4ea94b19938531af111df84b2b",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Around the World",
                                        "setsAndReps": "3x10r@",
                                        "imageName": "SLPE7IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 113,
                                                "description": "1) Using a 5-10lb plate should be sufficient for most people.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 113,
                                                "description": "2) Focus on a complete full movement with straight knees.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 113,
                                                "instructions": "Begin standing with your feet facing directly forward just outside of hip-width. Straighten your knees and extend a weight overhead. Completely straighten your elbows and shrug your shoulders to your ears. Leading with the weight, arch sideways to your left and perform a clockwise trunk circle. During the circle, keep your shoulders completely open. If you can see the weight, it has dropped too low. After the arch portion of the circle, return to standing upright, switch directions, and continue to alternate between clockwise and counterclockwise around the world reps for the set.",
                                                "equipment": "Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1245,
                                                "exerciseId": 113,
                                                "tag": 2,
                                                "videoName": "uk03Q34U.json?exp=1766068077589&sig=32555df1f41924e93631045e29409daa",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 119,
                                "name": "Hanging Leg Lift ",
                                "image": "MNPE7",
                                "group": "Foundation Core",
                                "exerciseNotation": "C7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211528,
                                "setsAndReps": "3x1r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Hanging Leg Lift ",
                                        "setsAndReps": "3x1r",
                                        "imageName": "MNPE7",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 119,
                                                "description": "1) Do not simply raise your shins to the bar; rather focus on touching the toes to the bar for each rep.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 119,
                                                "instructions": "Begin in a dead hang with your shoulders up by your ears (elevated). With your knees locked, toes pointed, and legs together, lift your legs up with control until your toes touch the top bar. Lower down in the same, controlled fashion. Avoid pulling down with your back and arms. Hang low, relying on your hips and core to perform the hanging leg lift. Repeat for reps.",
                                                "equipment": "Stall Bars"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1256,
                                                "exerciseId": 119,
                                                "tag": 1,
                                                "videoName": "hO1Vu3Gv.json?exp=1766068077590&sig=94ca174e999194b8dc82e6c36ee6b91d",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Vertical Pike Hang",
                                        "setsAndReps": "3x30s",
                                        "imageName": "MNPE7IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 119,
                                                "description": "1) Note that the shoulder girdle as well as the entire back are all in a full, complete stretch from top to bottom.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 119,
                                                "instructions": "Begin standing on the bottom rung of stall bars (feet together) with your hands gripping the bar nearest waist level. Lean back and drop down, with straight arms and knees. Lower down into a comfortable stretch; do not force the pike. Keep straight arms and legs as you hold for time.",
                                                "equipment": "Stall Bars"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1257,
                                                "exerciseId": 119,
                                                "tag": 2,
                                                "videoName": "ARfS2TXw.json?exp=1766068077590&sig=6d65648ad2bf4dec933f61f81e3354fa",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            },
            {
                "scheduleId": 518635,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 125,
                                "name": "Cossack Squat",
                                "image": "SLSPE6",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A6",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211529,
                                "setsAndReps": "3x2r",
                                "order": 6,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Cossack Squat",
                                        "setsAndReps": "3x2r",
                                        "imageName": "SLSPE6",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 125,
                                                "description": "1) The non-squatting leg remains straight.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 125,
                                                "description": "2) Stand up fully in between repetitions.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 125,
                                                "instructions": "Assume a wide standing straddle stance with your toes turned out slightly. Squat down as low as possible on your right side, keeping your left leg straight. Check to make sure your right knee is tracking over the center of your foot and not drifting inward. Stand all the way up before transitioning over to your left side, extending your right knee and bending your left knee. Pause, check your knee position, and continue to repeat for reps. For help balancing and squatting lower, hold a light weight out in front of you during the squats.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1268,
                                                "exerciseId": 125,
                                                "tag": 1,
                                                "videoName": "bdIOs806.json?exp=1766068077592&sig=67529437f7994e90ccb9a843be98ff85",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 1270,
                                                "exerciseId": 125,
                                                "tag": 4,
                                                "videoName": "FHhw48P7.json?exp=1766068077592&sig=329ad0059f33464a91e635f4214114e2",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Twisting Squats",
                                        "setsAndReps": "3x5r@",
                                        "imageName": "SLSPE6IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 125,
                                                "description": "1) Use the outside edge of the ankle to begin standing.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 125,
                                                "description": "2) Note that each rep twists in the opposite direction.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 125,
                                                "instructions": "Begin sitting on the floor, leg criss-crossed. Keep your ankles turned out and stand straight up. At the top, turn your feet flat on the floor and pivot 360-degrees so your legs cross the other way. Turn your ankles back out and descend back to the reverse criss-cross position on the floor. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1269,
                                                "exerciseId": 125,
                                                "tag": 2,
                                                "videoName": "qnXu8Mck.json?exp=1766068077592&sig=ce34aa9ecef435b6b218bc62e4660dc2",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 1271,
                                                "exerciseId": 125,
                                                "tag": 4,
                                                "videoName": "qlYP9dfk.json?exp=1766068077592&sig=f99cf24d7d29594781de46c0c3e28cdc",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "WEDNESDAY,DECEMBER 17": [
            {
                "scheduleId": 518636,
                "classId": 59216,
                "type": "Class",
                "dayIndex": 3,
                "workout": {
                    "className": "Front Split",
                    "trainingType": "Stretch",
                    "mediaId": "aH1k32u9.json?exp=1766068077592&sig=733f0da14dea6e2e692d1a534f17775b",
                    "image": "stretch-front-split.jpg",
                    "description": "A perfect 45-minute mobility routine for athletes and office workers alike! Tension in the quads, hip flexors, feet, calves, and hamstrings will rapidly disappear with continued use of this sequence. If Front Splits are your goal, start here!",
                    "isLogged": false
                }
            }
        ],
        "THURSDAY,DECEMBER 18": [
            {
                "scheduleId": 518637,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 4,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068077592&sig=1f126bef47a3f757a4c1801350c8bdb9",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518638,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 4,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 129,
                                "name": "Single Bar Dip",
                                "image": "HBPPE7",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211530,
                                "setsAndReps": "3x1r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Single Bar Dip",
                                        "setsAndReps": "3x1r",
                                        "imageName": "HBPPE7",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 129,
                                                "description": "1) Lightly slide down along the bar; do not lay on the bar.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 129,
                                                "description": "2) Full ROM is lowering to the bottom of the chest.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 129,
                                                "instructions": "Start supported above a single bar with your arms extended and body straight. Be sure your hands are placed at approximately shoulder width. Begin with and maintain strong scapular depression. Initiate the dip by bending your elbows. Lightly slide down the bar until the bottom of your chest touches it. Dip back up and repeat for reps. Minimize the piking of your hips at all times during the single bar dip and avoid resting on the bar. ",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1288,
                                                "exerciseId": 129,
                                                "tag": 1,
                                                "videoName": "M75P8tL0.json?exp=1766068077667&sig=cea974b5b6cf30d6c3d61644ac4b2dd7",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Static Cat",
                                        "setsAndReps": "3x30s",
                                        "imageName": "HBPPE7IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 129,
                                                "description": "1) At the bottom, the glutes should be either on top or just in front of the knees to maintain the intensity of the stretch.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 129,
                                                "instructions": "Begin kneeling with your hips above your knees. Slide your hands out in front of you straightening your elbows and shrugging your shoulders to your ears as your chest drops close to the floor. Keep your hips over your knees and continue to stretch your chest and arms toward the floor as you hold for time.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1289,
                                                "exerciseId": 129,
                                                "tag": 2,
                                                "videoName": "b9EfOeZR.json?exp=1766068077667&sig=0d14ca1a3a93912dcdf5e362f3e834e5",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 137,
                                "name": "Negative Pull-up",
                                "image": "RCPE7",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 133,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "2": {
                                        "masterySetId": 134,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "3": {
                                        "masterySetId": 135,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "4": {
                                        "masterySetId": 137,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "5": {
                                        "masterySetId": 138,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "6": {
                                        "masterySetId": 139,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "7": {
                                        "masterySetId": 141,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4rx10s"
                                    },
                                    "8": {
                                        "masterySetId": 142,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5rx10s"
                                    },
                                    "9": {
                                        "masterySetId": 143,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5rx10s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211531,
                                "setsAndReps": "3x1rx10s",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Negative Pull-up",
                                        "setsAndReps": "3x1rx10s",
                                        "imageName": "RCPE7",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 137,
                                                "description": "1) Do not allow the chin to touch the bar at the top.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 137,
                                                "description": "2) Maintain an even tempo during the entire descent.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 137,
                                                "instructions": "Grab a pull-up bar with an over grip (palms away) and jump to the top of a pull-up position. Be sure your chin is over the bar at a minimum. Lower down, performing the negative, or eccentric, portion of a pull-up. Keep a steady pace and take a full 10 seconds to descend to straight elbows. Keep your feet together and body straight throughout the descent. At the bottom, relax into a full dead hang with elevated shoulders. Jump or step back up to the top and repeat.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1304,
                                                "exerciseId": 137,
                                                "tag": 1,
                                                "videoName": "ob9rG2mc.json?exp=1766068077668&sig=c223c7761d8ce3809a3e127dee1559c7",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Undergrip Bent Lean",
                                        "setsAndReps": "3x30s",
                                        "imageName": "RCPE7IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 137,
                                                "description": "1) Grasp the rail at approximately hip height.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 137,
                                                "description": "2) Use the hips to pull the torso away from the hands.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 137,
                                                "instructions": "Stand approximately 2 feet from the stall bars or other sturdy grip that is near hip-height. Grab on with both hands using an under-grip (palms up) and sit back, pulling against the bars and dropping your torso down. Lean back until your elbows straighten and your torso is roughly parallel to the floor. You should have a straight line from hands to hips. Maintain constant backward pressure to maximize the effectiveness of this stretch. Hold this stretch for time.",
                                                "equipment": "Fixed Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1305,
                                                "exerciseId": 137,
                                                "tag": 2,
                                                "videoName": "hBDYw3XP.json?exp=1766068077668&sig=7e6033e9149a8ac25a40c6fa0100fac8",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 109,
                                "name": "Elevated Planche Bounce",
                                "image": "sPLPE7",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 25,
                                        "masteryLevel": "15r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "3r"
                                    },
                                    "2": {
                                        "masterySetId": 26,
                                        "masteryLevel": "15r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "3": {
                                        "masterySetId": 27,
                                        "masteryLevel": "15r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "4": {
                                        "masterySetId": 29,
                                        "masteryLevel": "15r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "5": {
                                        "masterySetId": 30,
                                        "masteryLevel": "15r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "9r"
                                    },
                                    "6": {
                                        "masterySetId": 31,
                                        "masteryLevel": "15r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "9r"
                                    },
                                    "7": {
                                        "masterySetId": 33,
                                        "masteryLevel": "15r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "8": {
                                        "masterySetId": 34,
                                        "masteryLevel": "15r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "15r"
                                    },
                                    "9": {
                                        "masterySetId": 35,
                                        "masteryLevel": "15r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "15r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211526,
                                "setsAndReps": "3x3r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Elevated Planche Bounce",
                                        "setsAndReps": "3x3r",
                                        "imageName": "sPLPE7",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 109,
                                                "description": "1) As much as possible, initiate the lift from the upper back.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 109,
                                                "description": "2) Minimize the piking of hips during the bounces.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 109,
                                                "instructions": "Begin from a foot-elevated straight arm plank, with your feet placed on a box at approximately shoulder height. Ensure that your shoulders are directly above your hands, your elbows are completely straight, and your feet are together. Rotate your fingers out approximately 45-degrees and begin to lean forward. As your shoulders move in front of your hands, keep constant tension in your glutes and core to maintain a posterior pelvic tilt. Lean forward until you can shift your foot position from curled to pointed toes so that you're on the tops of your feet. At this point, your hands should be roughly underneath your hips. Push your chest away from the floor to keep your shoulder blades spread apart (protracted). Also keep your shoulders pressed down, away from your ears (depressed). Scapular protraction and depression are essential for maintaining a strong elevated planche lean position. From this elevated planche lean start position, bounce your legs up and down on the box. As you bounce, keep a comfortable head position, strong forward lean, and straight body. As much as possible, initiate each bounce from your upper back and not your hips. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1236,
                                                "exerciseId": 109,
                                                "tag": 1,
                                                "videoName": "s4NYHkFh.json?exp=1766068077668&sig=d6afe0fc1589665540221ea2faa62cdf",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Prone Half Straddle Planche Double Leg Extension",
                                        "setsAndReps": "3x5r",
                                        "imageName": "sPLPE7IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 109,
                                                "description": "1) Do not allow the knees to drop below the hips at any time.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 109,
                                                "description": "2) The hips should remain completely open and flat.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 109,
                                                "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Bend your knees to 90-degrees and lift both legs up and as far sideways as possible. Be sure both of your thighs are parallel to the floor and you've achieved your widest half-straddle. Extend your legs until your knees completely straighten. Pause momentarily, retract your legs, and return to the prone half straddle. Repeat for reps.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1237,
                                                "exerciseId": 109,
                                                "tag": 2,
                                                "videoName": "9j43jx5r.json?exp=1766068077668&sig=33489b0c0849472f27a90da7490ef030",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "FRIDAY,DECEMBER 19": [
            {
                "scheduleId": 518639,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068077668&sig=56b0c50a3b36e27801063a364f97d038",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518640,
                "classId": 60033,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "Hip Prehab",
                    "trainingType": "Mobility",
                    "mediaId": "oYB1u4Mj.json?exp=1766068077668&sig=9f4e979b88267377f9ed83ea447b08eb",
                    "image": "330x220-hip-prehab.jpg",
                    "description": "Keep your hips healthy and strong while protecting against common injuries, aches, and pains. This short follow along moves your hips through their whole range of motion and creates strength through the whole range. All this is done through simple, standing leg raise variations that can be done anywhere. Use this class to prime your hips for squatting or other lower-body exercises, or as part of a longer mobility session.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518641,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {
                        "Front Lever": [
                            {
                                "exerciseId": 101,
                                "name": "Negative Body Lever Straddle",
                                "image": "FLPE7",
                                "group": "Foundation Core",
                                "exerciseNotation": "A7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 133,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "2": {
                                        "masterySetId": 134,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1rx10s"
                                    },
                                    "3": {
                                        "masterySetId": 135,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "4": {
                                        "masterySetId": 137,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2rx10s"
                                    },
                                    "5": {
                                        "masterySetId": 138,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "6": {
                                        "masterySetId": 139,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3rx10s"
                                    },
                                    "7": {
                                        "masterySetId": 141,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4rx10s"
                                    },
                                    "8": {
                                        "masterySetId": 142,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5rx10s"
                                    },
                                    "9": {
                                        "masterySetId": 143,
                                        "masteryLevel": "5rx10s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5rx10s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211525,
                                "setsAndReps": "3x1rx10s",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Negative Body Lever Straddle",
                                        "setsAndReps": "3x1rx10s",
                                        "imageName": "FLPE7",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 101,
                                                "description": "1) Do not allow the lower back to arch during the descent.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 101,
                                                "description": "2) The arms should be comfortably bent.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 101,
                                                "instructions": "Lie on your back with your grip on a fixed object overhead–the bottom rung of stall bars or a braced partner’s ankles work well. Tuck your knees to assist with entering a candlestick position supported by your grip and shoulders, with legs extended upwards, glutes and core strongly contracted. Straddle your legs wide, lock your knees, continue to press your hips strongly forward, and slowly lower your body to the floor. As you lower, keep your body straight with posterior pelvic tilt (PPT). Do not allow your hips to pike at anytime during the movement. Take a full ten seconds to descend and aim to touch down one vertebrae at a time. Tuck back up to the starting candlestick position and repeat for reps.",
                                                "equipment": "Fixed Pole"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1220,
                                                "exerciseId": 101,
                                                "tag": 1,
                                                "videoName": "a7RyMr8T.json?exp=1766068077671&sig=ae0de66023fcbf4f33eacc68f9c7ff5d",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Seal Rocks",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLPE7IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 101,
                                                "description": "1) Allow the lower back to arch fully in the front.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 101,
                                                "description": "2) Place the chest completely flat on the thighs in the rear.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 101,
                                                "instructions": "Begin kneeling, sitting back on your heels, with your torso folded over your thighs and arms extended long in front of you. Rock forward, straighten your legs, and press up through your arms to arch your spine. Keep your legs in contact with the floor. Keep your glutes engaged to help protect your low back and help you arch through your middle and upper spine. Straighten your elbows as much as possible and be sure to keep your hands directly under your shoulders. Push down into the floor and open your chest at the top of the stretch to keep your shoulder blades down and back (depressed and retracted). Look up. Press back to the start position and repeat for reps or time. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1221,
                                                "exerciseId": 101,
                                                "tag": 2,
                                                "videoName": "M0dImtXI.json?exp=1766068077671&sig=e5f501c78742eaa03b339374e728bd3f",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 113,
                                "name": "Straddle Reverse Leg Lift",
                                "image": "SLPE7",
                                "group": "Foundation Core",
                                "exerciseNotation": "B7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211527,
                                "setsAndReps": "3x2r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Straddle Reverse Leg Lift",
                                        "setsAndReps": "3x2r",
                                        "imageName": "SLPE7",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 113,
                                                "description": "1) Lift the heels all the way to horizontal.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 113,
                                                "description": "2) Pause briefly at the top of each repetition.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 113,
                                                "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Straddle your legs wide, lock your knees, point your toes, and slowly lift your legs to horizontal. Continue to straddle your legs as wide as possible during the lift. Pause briefly with your legs held parallel to the floor, lower slowly, and repeat for reps.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1244,
                                                "exerciseId": 113,
                                                "tag": 1,
                                                "videoName": "YUj1VUXX.json?exp=1766068077671&sig=b9edd61a6177cf4a07fa970977bab837",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Around the World",
                                        "setsAndReps": "3x10r@",
                                        "imageName": "SLPE7IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 113,
                                                "description": "1) Using a 5-10lb plate should be sufficient for most people.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 113,
                                                "description": "2) Focus on a complete full movement with straight knees.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 113,
                                                "instructions": "Begin standing with your feet facing directly forward just outside of hip-width. Straighten your knees and extend a weight overhead. Completely straighten your elbows and shrug your shoulders to your ears. Leading with the weight, arch sideways to your left and perform a clockwise trunk circle. During the circle, keep your shoulders completely open. If you can see the weight, it has dropped too low. After the arch portion of the circle, return to standing upright, switch directions, and continue to alternate between clockwise and counterclockwise around the world reps for the set.",
                                                "equipment": "Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1245,
                                                "exerciseId": 113,
                                                "tag": 2,
                                                "videoName": "uk03Q34U.json?exp=1766068077671&sig=1d7500f5bca1471aee165db91f424165",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 119,
                                "name": "Hanging Leg Lift ",
                                "image": "MNPE7",
                                "group": "Foundation Core",
                                "exerciseNotation": "C7",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211528,
                                "setsAndReps": "3x1r",
                                "order": 7,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Hanging Leg Lift ",
                                        "setsAndReps": "3x1r",
                                        "imageName": "MNPE7",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 119,
                                                "description": "1) Do not simply raise your shins to the bar; rather focus on touching the toes to the bar for each rep.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 119,
                                                "instructions": "Begin in a dead hang with your shoulders up by your ears (elevated). With your knees locked, toes pointed, and legs together, lift your legs up with control until your toes touch the top bar. Lower down in the same, controlled fashion. Avoid pulling down with your back and arms. Hang low, relying on your hips and core to perform the hanging leg lift. Repeat for reps.",
                                                "equipment": "Stall Bars"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1256,
                                                "exerciseId": 119,
                                                "tag": 1,
                                                "videoName": "hO1Vu3Gv.json?exp=1766068077671&sig=462519f569d0b12ad7c8de5c014da037",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Vertical Pike Hang",
                                        "setsAndReps": "3x30s",
                                        "imageName": "MNPE7IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 119,
                                                "description": "1) Note that the shoulder girdle as well as the entire back are all in a full, complete stretch from top to bottom.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 119,
                                                "instructions": "Begin standing on the bottom rung of stall bars (feet together) with your hands gripping the bar nearest waist level. Lean back and drop down, with straight arms and knees. Lower down into a comfortable stretch; do not force the pike. Keep straight arms and legs as you hold for time.",
                                                "equipment": "Stall Bars"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1257,
                                                "exerciseId": 119,
                                                "tag": 2,
                                                "videoName": "ARfS2TXw.json?exp=1766068077671&sig=32dec21b1cfe58da034fb65a9c53b12c",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            },
            {
                "scheduleId": 518642,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 125,
                                "name": "Cossack Squat",
                                "image": "SLSPE6",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A6",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211529,
                                "setsAndReps": "3x2r",
                                "order": 6,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Cossack Squat",
                                        "setsAndReps": "3x2r",
                                        "imageName": "SLSPE6",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 125,
                                                "description": "1) The non-squatting leg remains straight.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 125,
                                                "description": "2) Stand up fully in between repetitions.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 125,
                                                "instructions": "Assume a wide standing straddle stance with your toes turned out slightly. Squat down as low as possible on your right side, keeping your left leg straight. Check to make sure your right knee is tracking over the center of your foot and not drifting inward. Stand all the way up before transitioning over to your left side, extending your right knee and bending your left knee. Pause, check your knee position, and continue to repeat for reps. For help balancing and squatting lower, hold a light weight out in front of you during the squats.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1268,
                                                "exerciseId": 125,
                                                "tag": 1,
                                                "videoName": "bdIOs806.json?exp=1766068077674&sig=ae95eefdd27c7cf6064868b394edf124",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 1270,
                                                "exerciseId": 125,
                                                "tag": 4,
                                                "videoName": "FHhw48P7.json?exp=1766068077674&sig=bff8241f8a5c66dda85bbfcdee32a753",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ]
                                    },
                                    "Mobility": {
                                        "name": "Twisting Squats",
                                        "setsAndReps": "3x5r@",
                                        "imageName": "SLSPE6IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 125,
                                                "description": "1) Use the outside edge of the ankle to begin standing.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 125,
                                                "description": "2) Note that each rep twists in the opposite direction.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 125,
                                                "instructions": "Begin sitting on the floor, leg criss-crossed. Keep your ankles turned out and stand straight up. At the top, turn your feet flat on the floor and pivot 360-degrees so your legs cross the other way. Turn your ankles back out and descend back to the reverse criss-cross position on the floor. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1269,
                                                "exerciseId": 125,
                                                "tag": 2,
                                                "videoName": "qnXu8Mck.json?exp=1766068077674&sig=37262fbee9ed401a51d71f8767457f48",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": [
                                            {
                                                "exercisesVideoId": 1271,
                                                "exerciseId": 125,
                                                "tag": 4,
                                                "videoName": "qlYP9dfk.json?exp=1766068077674&sig=30a29402b952f047ed486787011b1c45",
                                                "weekNum": 0,
                                                "order": 2
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 3": {},
                    "LEVEL 4": {}
                }
            }
        ],
        "SATURDAY,DECEMBER 20": [
            {
                "scheduleId": 518643,
                "classId": 59210,
                "type": "Class",
                "dayIndex": 6,
                "workout": {
                    "className": "Middle Split",
                    "trainingType": "Stretch",
                    "mediaId": "JatJjiFp.json?exp=1766068077674&sig=2c916e3a242be76888b696f658dd732a",
                    "image": "stretch-middle-split.jpg",
                    "description": "Everyone can start building the mobility necessary for the middle splits and pancake–no matter what your flexibility level is! This 45-minute sequence will help you find relief and develop flexibility throughout your lower body.",
                    "isLogged": false
                }
            }
        ],
        "SUNDAY,DECEMBER 21": null
    }
    let advancedOne = {
        "MONDAY,DECEMBER 15": [
            {
                "scheduleId": 518660,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 1,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068224997&sig=74cb45b5589f1f4e1c5ec22446d2f0c8",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518661,
                "classId": 59915,
                "type": "Class",
                "dayIndex": 1,
                "workout": {
                    "className": "Weekly Shoulders",
                    "trainingType": "Mobility",
                    "mediaId": "cgQuL34L.json?exp=1766068224997&sig=4c4490f68fedcb03479f0282c50ff701",
                    "image": "330x220-satshoulders.jpg",
                    "description": "Follow along with this prehab routine used weekly by Coach Sommer’s athletes to keep your shoulders healthy and strong. All it requires is a couple light dumbbells and a set of rings.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518662,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 1,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 169,
                                "name": "Box Headstand Pushup",
                                "image": "HBPPE15",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211544,
                                "setsAndReps": "3x1r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Box Headstand Pushup",
                                        "setsAndReps": "3x1r",
                                        "imageName": "HBPPE15",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 169,
                                                "description": "1) Place and keep your hips directly over the shoulders.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 169,
                                                "description": "2) The head should touch just in front of the hands.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 169,
                                                "instructions": "Begin in an L handstand position with proper posterior pelvic tilt (PPT) and open shoulders. Your hips should be directly over your shoulders and must remain stacked throughout the exercise. Bending at your elbows, lower your head to the floor, touching it down just in front of your hands. Your elbows should now be stacked above your wrists. Press back up to the L handstand and repeat for reps.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1368,
                                                "exerciseId": 169,
                                                "tag": 1,
                                                "videoName": "NpBqo6Gj.json?exp=1766068225078&sig=c8e08cf5ee6abe0a8ec84305066ba1d9",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Bent Arm Prone Static",
                                        "setsAndReps": "3x30s",
                                        "imageName": "HBPPE15IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 169,
                                                "description": "1) Note the 90 degree angles between the upper and lower arm and the upper arm and torso.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 169,
                                                "instructions": "Begin lying on your stomach with your right arm pulled up so that you have 90-degree elbow and armpit angles. Make complete shoulder, elbow, and wrist to floor contact. Roll to your right side and stretch only as far as is comfortable while keeping the shape and floor contact described above. Hold for time and then switch sides.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1369,
                                                "exerciseId": 169,
                                                "tag": 2,
                                                "videoName": "K7dcdH4D.json?exp=1766068225078&sig=d3d3ca6669ffeb4c412b7c0e4499fc10",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 177,
                                "name": "Wide Grip L Pull-up",
                                "image": "RCPE15",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211545,
                                "setsAndReps": "3x1r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Wide Grip L Pull-up",
                                        "setsAndReps": "3x1r",
                                        "imageName": "RCPE15",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 177,
                                                "description": "1) Use approximately a double shoulder width grip.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 177,
                                                "description": "2) Maintain a horizontal L-sit during the entire pull-up.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 177,
                                                "instructions": "Begin in a hanging L on a pull-up bar with approximately a double shoulder-width over grip (palms away). Keep a straight body and, without the use of any momentum, pull your chin over the bar at a minimum, keeping the L shape. Lower with control and repeat for reps, keeping your legs parallel to the floor, hips at 90-degrees, at all times.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1384,
                                                "exerciseId": 177,
                                                "tag": 1,
                                                "videoName": "a9dRx2DT.json?exp=1766068225078&sig=558c2957adb47733721b6524fb7ca6ce",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Shoulder Distraction Three",
                                        "setsAndReps": "3x5r",
                                        "imageName": "RCPE15IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 177,
                                                "description": "1) Focus on circling against the resistance with the shoulder.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 177,
                                                "description": "2) The hands, and the arms, are merely hooks.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 177,
                                                "instructions": "To set up, fix a band to approximately shoulder-height and hold on with your left hand. Turn away from the stall bars and bring your hand behind you, palm down. Straighten your elbow and step away until the band is tight. Keep a straight elbow and perform forward shoulder circles, working fluidly through scapular protraction, elevation, retraction, and  depression. Repeat for reps before switching sides. ",
                                                "equipment": "Resistance Band"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1385,
                                                "exerciseId": 177,
                                                "tag": 2,
                                                "videoName": "wgJ8ZHcw.json?exp=1766068225078&sig=0fb52489cac7559d188fcd7a58a330b0",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 151,
                                "name": "Open Planche",
                                "image": "sPLSE4",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C11",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 73,
                                        "masteryLevel": "30s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6s"
                                    },
                                    "2": {
                                        "masterySetId": 74,
                                        "masteryLevel": "30s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6s"
                                    },
                                    "3": {
                                        "masterySetId": 75,
                                        "masteryLevel": "30s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "4": {
                                        "masterySetId": 77,
                                        "masteryLevel": "30s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12s"
                                    },
                                    "5": {
                                        "masterySetId": 78,
                                        "masteryLevel": "30s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18s"
                                    },
                                    "6": {
                                        "masterySetId": 79,
                                        "masteryLevel": "30s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18s"
                                    },
                                    "7": {
                                        "masterySetId": 81,
                                        "masteryLevel": "30s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "8": {
                                        "masterySetId": 82,
                                        "masteryLevel": "30s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30s"
                                    },
                                    "9": {
                                        "masterySetId": 83,
                                        "masteryLevel": "30s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211540,
                                "setsAndReps": "3x6s",
                                "order": 11,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Open Planche",
                                        "setsAndReps": "3x6s",
                                        "imageName": "sPLSE4",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 151,
                                                "description": "1) Planche work requires the scapula to be BOTH protracted and depressed to maximize your leverage.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 151,
                                                "instructions": "Begin kneeling on all fours with your hands rotated outward approximately 45-degrees. With locked elbows and protracted and depressed shoulders, begin to lean forward. As you lean, allow your feet to lift off the ground and your legs to come apart. Continue angling forward until your hips reach shoulder height. Spread your legs apart until your knees are just outside of your elbows (keep them bent to 90-degrees). Pause and hold for time. Keep your shoulder blades strongly depressed and protracted to maximize your leverage.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1332,
                                                "exerciseId": 151,
                                                "tag": 1,
                                                "videoName": "exTjsEnD.json?exp=1766068225078&sig=5e2d835f2372c24a09893110e17961bf",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Bent Arm Straddle Planche Single Leg Hold",
                                        "setsAndReps": "3x10r",
                                        "imageName": "sPLSE4IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 151,
                                                "description": "1) The hips must remain completely flat and open.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 151,
                                                "description": "2) Keep the chest well clear of the floor.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 151,
                                                "instructions": "Begin kneeling on all fours with your hands rotated out approximately 45-degrees. Begin to lean forward and lower your torso down toward the floor. As you lower, lift your feet up, keep your knees bent to 90-degrees, and straddle wide. Hold your torso just off the floor and achieve a half straddle with your hips. You'll need a strong forward lean to maintain balance. Keep your shoulder blades strongly depressed and protracted to maximize your leverage. Now extend your right leg until your right knee completely straightens and is parallel to the floor (level with your upper body and hips). Pause, be sure your right quadricep is engaged, straddle wide, and hold for time. Before exiting the bent arm planche, switch legs and perform another static hold with your left leg extended. Keep your torso just off the floor in a proper bent arm planche position for both single leg holds.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1333,
                                                "exerciseId": 151,
                                                "tag": 2,
                                                "videoName": "61jzC7aK.json?exp=1766068225078&sig=8cf8a2b32c4adbbe00e2a33a34e3db35",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 4": {}
                }
            }
        ],
        "TUESDAY,DECEMBER 16": [
            {
                "scheduleId": 518663,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068225078&sig=765d778dfa5e95ce509692b1bb831901",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518664,
                "classId": 60205,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "Stall Bar Stretch",
                    "trainingType": "Mobility",
                    "mediaId": "bDAm39hs.json?exp=1766068225078&sig=051230f35468e33a16a6796b8a0acefc",
                    "image": "330x220-stallbar-stretch-3.jpg",
                    "description": "Use stall bars to find relief through deep stretches in your upper and lower body. You’ll weight your straddle and pike stretches by hanging on the stall bars. You’ll also stretch your shoulders using the stall bars to go deeper. This 6-minute class is perfect for those days when you’re feeling frozen and locked up. Use it to loosen up before your workout or to shake out tension after!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518665,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {
                        "Front Lever": [
                            {
                                "exerciseId": 145,
                                "name": "Negative Front Pull",
                                "image": "FLPE15",
                                "group": "Foundation Core",
                                "exerciseNotation": "A15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211539,
                                "setsAndReps": "3x1r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Negative Front Pull",
                                        "setsAndReps": "3x1r",
                                        "imageName": "FLPE15",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 145,
                                                "description": "1) Feel the shoulders partially protract and widen during the descent. This provides the best leverage.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 145,
                                                "instructions": "Begin in an inverted hang from a pull-up bar or between parallel bars. Straighten your elbows, knees, and achieve a posterior pelvic tilt (PPT). Keep this hollow body position and slowly lower your body down through a front lever to a dead hang. Tuck your knees, press back up to the start position, and repeat for reps. During each negative front lever pull, keep your shoulders depressed and partially protracted.\r\n",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1320,
                                                "exerciseId": 145,
                                                "tag": 1,
                                                "videoName": "WqjC0k0Q.json?exp=1766068225082&sig=f8e84a8a05b6faed02a7a9b4c9bfb53e",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Low Bridge Rock",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLPE15IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 145,
                                                "description": "1) Pull the feet into the glutes and the hands close into the shoulders to give the best leverage pressing off the floor.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 145,
                                                "instructions": "Lie on your back with your hands placed palms down next to your ears. With your elbows and knees bent, feet flat on the floor, push through your hands and feet to raise your head just off the ground. Keep your head one to two inches off the ground, press your hips high, and pause briefly. Lower back down to the floor with control and repeat for reps. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1321,
                                                "exerciseId": 145,
                                                "tag": 2,
                                                "videoName": "e4ipIMCU.json?exp=1766068225082&sig=1104e70d03ed2f1a74095841df5e81b2",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 155,
                                "name": "Side Arch Body Rock",
                                "image": "SLPE13",
                                "group": "Foundation Core",
                                "exerciseNotation": "B13",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 37,
                                        "masteryLevel": "30r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "2": {
                                        "masterySetId": 38,
                                        "masteryLevel": "30r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "3": {
                                        "masterySetId": 39,
                                        "masteryLevel": "30r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12r"
                                    },
                                    "4": {
                                        "masterySetId": 41,
                                        "masteryLevel": "30r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "5": {
                                        "masterySetId": 42,
                                        "masteryLevel": "30r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18r"
                                    },
                                    "6": {
                                        "masterySetId": 43,
                                        "masteryLevel": "30r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18r"
                                    },
                                    "7": {
                                        "masterySetId": 45,
                                        "masteryLevel": "30r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24r"
                                    },
                                    "8": {
                                        "masterySetId": 46,
                                        "masteryLevel": "30r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30r"
                                    },
                                    "9": {
                                        "masterySetId": 47,
                                        "masteryLevel": "30r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211541,
                                "setsAndReps": "3x6r",
                                "order": 13,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Side Arch Body Rock",
                                        "setsAndReps": "3x6r",
                                        "imageName": "SLPE13",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 155,
                                                "description": "1) The torso and feet should elevate equally on their respective sides during the rocking motion.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 155,
                                                "instructions": "Begin lying on your right side, body extended, with your right arm overhead. Place your left hand on the floor just in front of you for balance. Be sure your body is straight (no piking a your hips). Now lift your torso and legs straight up at the exact same time, arching through the left side of your body. Aim to lift your upper and lower body the same amount. From your best side arch, begin to use your left oblique to smoothly rock forward, toward your right shoulder and backward, toward your right hip. Keep a straight body and avoid using your left hand to push; generate the momentum fro your core. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1340,
                                                "exerciseId": 155,
                                                "tag": 1,
                                                "videoName": "xVqyQBI0.json?exp=1766068225082&sig=04096df9c51bcbd04dbb96fcba796b9e",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Hurdler Static",
                                        "setsAndReps": "3x10s",
                                        "imageName": "SLPE13IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 155,
                                                "description": "1) Feel the back of the extended knee pressing firmly into the ground as you reach out into the stretch.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 155,
                                                "instructions": "Start sitting upright in a seated straddle on the floor. Pull your right foot into your groin and straighten your left knee completely. Extend a light weight overhead, shrug your shoulders to your ears, and lock your elbows. Leading with the weight, lean to your side over your left leg. Keep your torso facing forward and shoulders fully open (biceps behind your ears). Lower down until you feel a strong stretch in your right oblique. Stretch your torso long across your leg rather than hunching; try to get your bottom shoulder to your knee. Also be sure keep both glutes in contact with the floor throughout. Hold for time on your left side before switching. ",
                                                "equipment": "Dumbbell, Yoga Block"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1341,
                                                "exerciseId": 155,
                                                "tag": 2,
                                                "videoName": "UQaQw6Mx.json?exp=1766068225083&sig=b0dd10dc53daa87f1d3cca7c576e7ffc",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 161,
                                "name": "L-sit Scissors",
                                "image": "MNSE4",
                                "group": "Foundation Core",
                                "exerciseNotation": "C13",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211542,
                                "setsAndReps": "3x1r",
                                "order": 13,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "L-sit Scissors",
                                        "setsAndReps": "3x1r",
                                        "imageName": "MNSE4",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 161,
                                                "description": "1) Pull the legs apart with control; no jerking or rushing.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 161,
                                                "description": "2) Do not allow the feet to drop below the knees.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 161,
                                                "instructions": "Begin in a top support position on parallel bars with your elbows locked and body straight. With your torso vertical, lift your knees up to hip height, bending them to 90-degrees. Alternatively, begin kneeling between two parallettes and press into a bent knee top support. Fight to keep your shoulders down as far from your ears as possible (depressed) and your thighs perfectly parallel to the floor. Now quickly extend your legs, lock your knees, and straddle your legs wide (legs held parallel to the floor). Bring your legs back together, returning the L-sit, and repeat the L-sit scissor for reps.",
                                                "equipment": "Parallettes, Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1352,
                                                "exerciseId": 161,
                                                "tag": 1,
                                                "videoName": "P6NKNnal.json?exp=1766068225083&sig=61e79ee0f5a9c64331c9bb290fe97df4",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Standing Weighted Straddle Hang",
                                        "setsAndReps": "3x30s",
                                        "imageName": "MNSE4IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 161,
                                                "description": "1) The hips press backwards slightly to maintain balance.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 161,
                                                "description": "2) Don't pull against the weight, allow the shoulders to open.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 161,
                                                "instructions": "Begin standing on an elevated surface with your knees straight and legs straddled wide. Use a weight that is well within your comfort zone. Fold forward, allowing the weight to pull you down. Once you’ve reached your limit, tuck your chin into your chest and allow your lats and the muscles surrounding your spine to relax and lengthen. Make an effort to keep your quads engaged throughout the hold. Sink deep into the stretch and remember to breath as you hold for time.",
                                                "equipment": "Dumbbell, Barbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1353,
                                                "exerciseId": 161,
                                                "tag": 2,
                                                "videoName": "FFojs3hQ.json?exp=1766068225083&sig=20f206088700562e6c39c96157c86577",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 4": {}
                }
            },
            {
                "scheduleId": 518666,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 167,
                                "name": "Static Single Leg Squat",
                                "image": "SLSSE2",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A10",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 73,
                                        "masteryLevel": "30s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6s"
                                    },
                                    "2": {
                                        "masterySetId": 74,
                                        "masteryLevel": "30s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6s"
                                    },
                                    "3": {
                                        "masterySetId": 75,
                                        "masteryLevel": "30s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "4": {
                                        "masterySetId": 77,
                                        "masteryLevel": "30s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12s"
                                    },
                                    "5": {
                                        "masterySetId": 78,
                                        "masteryLevel": "30s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18s"
                                    },
                                    "6": {
                                        "masterySetId": 79,
                                        "masteryLevel": "30s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18s"
                                    },
                                    "7": {
                                        "masterySetId": 81,
                                        "masteryLevel": "30s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "8": {
                                        "masterySetId": 82,
                                        "masteryLevel": "30s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30s"
                                    },
                                    "9": {
                                        "masterySetId": 83,
                                        "masteryLevel": "30s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211543,
                                "setsAndReps": "3x6s",
                                "order": 10,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Static Single Leg Squat",
                                        "setsAndReps": "3x6s",
                                        "imageName": "SLSSE2",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 167,
                                                "description": "1) Depending on your individual proportions, you may find that extending a light weight greatly aids in counter balance.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 167,
                                                "instructions": "Squat down to full-depth, achieving full hamstring to calf contact, with your feet together. Stay in the bottom of the squat and extend your right leg completely. Engage your right quad, point your right toe, and hold this position for time. Pay close attention to your left knee and never allow it to drift inside of your left foot. Your extended foot should never touch the floor; keep it suspended for the entire set. If balance is an issue, extend a light weight in front of you to help counter-balance. Once time is up, retract your right leg and switch, remaining in the low squat.",
                                                "equipment": "Body Only, Weight Plate, Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1364,
                                                "exerciseId": 167,
                                                "tag": 1,
                                                "videoName": "eSgNtCbV.json?exp=1766068225085&sig=c10fad87cf5c02d18c099f14b574cbc5",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Single Leg Bridge Curl",
                                        "setsAndReps": "3x5r@",
                                        "imageName": "SLSSE2IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 167,
                                                "description": "1) A furniture slider is employed to reduce friction.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 167,
                                                "description": "2) Only the foot moves; the rest of the body should be rigid.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 167,
                                                "instructions": "Lie on your back with knees bent, legs hip-distance apart, and right heel on an exercise slider. Lift your left foot up until your left knee straightens. Keep your arms by your side and press your hips up toward the ceiling. Open your chest and maintain a straight line from your shoulders to your left foot. Slide your right foot away from you until your knee fully straightens. Pause, keep your hips high, and use your hamstring to pull your foot back under your knee. Use a slider or other object that reduces friction enough to keep your leg curls smooth. Repeat for reps, keeping your glutes engaged, hips high, and non-working leg straight throughout before alternating legs. ",
                                                "equipment": "Slider"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1365,
                                                "exerciseId": 167,
                                                "tag": 2,
                                                "videoName": "HraTyr2G.json?exp=1766068225085&sig=277ffc68e4bd4a1c62eaf7e64ca193ca",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 4": {}
                }
            }
        ],
        "WEDNESDAY,DECEMBER 17": [
            {
                "scheduleId": 518667,
                "classId": 59216,
                "type": "Class",
                "dayIndex": 3,
                "workout": {
                    "className": "Front Split",
                    "trainingType": "Stretch",
                    "mediaId": "aH1k32u9.json?exp=1766068225085&sig=9102f87a0d929420804ed4cc25b8a8d9",
                    "image": "stretch-front-split.jpg",
                    "description": "A perfect 45-minute mobility routine for athletes and office workers alike! Tension in the quads, hip flexors, feet, calves, and hamstrings will rapidly disappear with continued use of this sequence. If Front Splits are your goal, start here!",
                    "isLogged": false
                }
            }
        ],
        "THURSDAY,DECEMBER 18": [
            {
                "scheduleId": 518668,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 4,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068225085&sig=f101a4e182cf49a2b20e2046868bf035",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518669,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 4,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 169,
                                "name": "Box Headstand Pushup",
                                "image": "HBPPE15",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211544,
                                "setsAndReps": "3x1r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Box Headstand Pushup",
                                        "setsAndReps": "3x1r",
                                        "imageName": "HBPPE15",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 169,
                                                "description": "1) Place and keep your hips directly over the shoulders.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 169,
                                                "description": "2) The head should touch just in front of the hands.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 169,
                                                "instructions": "Begin in an L handstand position with proper posterior pelvic tilt (PPT) and open shoulders. Your hips should be directly over your shoulders and must remain stacked throughout the exercise. Bending at your elbows, lower your head to the floor, touching it down just in front of your hands. Your elbows should now be stacked above your wrists. Press back up to the L handstand and repeat for reps.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1368,
                                                "exerciseId": 169,
                                                "tag": 1,
                                                "videoName": "NpBqo6Gj.json?exp=1766068225154&sig=bd1092707c00b81fd55e78d3dfc60fc0",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Bent Arm Prone Static",
                                        "setsAndReps": "3x30s",
                                        "imageName": "HBPPE15IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 169,
                                                "description": "1) Note the 90 degree angles between the upper and lower arm and the upper arm and torso.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 169,
                                                "instructions": "Begin lying on your stomach with your right arm pulled up so that you have 90-degree elbow and armpit angles. Make complete shoulder, elbow, and wrist to floor contact. Roll to your right side and stretch only as far as is comfortable while keeping the shape and floor contact described above. Hold for time and then switch sides.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1369,
                                                "exerciseId": 169,
                                                "tag": 2,
                                                "videoName": "K7dcdH4D.json?exp=1766068225154&sig=27d50e17e107aae2b2d400a0ed352ce5",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 177,
                                "name": "Wide Grip L Pull-up",
                                "image": "RCPE15",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211545,
                                "setsAndReps": "3x1r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Wide Grip L Pull-up",
                                        "setsAndReps": "3x1r",
                                        "imageName": "RCPE15",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 177,
                                                "description": "1) Use approximately a double shoulder width grip.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 177,
                                                "description": "2) Maintain a horizontal L-sit during the entire pull-up.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 177,
                                                "instructions": "Begin in a hanging L on a pull-up bar with approximately a double shoulder-width over grip (palms away). Keep a straight body and, without the use of any momentum, pull your chin over the bar at a minimum, keeping the L shape. Lower with control and repeat for reps, keeping your legs parallel to the floor, hips at 90-degrees, at all times.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1384,
                                                "exerciseId": 177,
                                                "tag": 1,
                                                "videoName": "a9dRx2DT.json?exp=1766068225154&sig=f84ffd5eb6b645d2bbf215fb29020553",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Shoulder Distraction Three",
                                        "setsAndReps": "3x5r",
                                        "imageName": "RCPE15IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 177,
                                                "description": "1) Focus on circling against the resistance with the shoulder.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 177,
                                                "description": "2) The hands, and the arms, are merely hooks.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 177,
                                                "instructions": "To set up, fix a band to approximately shoulder-height and hold on with your left hand. Turn away from the stall bars and bring your hand behind you, palm down. Straighten your elbow and step away until the band is tight. Keep a straight elbow and perform forward shoulder circles, working fluidly through scapular protraction, elevation, retraction, and  depression. Repeat for reps before switching sides. ",
                                                "equipment": "Resistance Band"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1385,
                                                "exerciseId": 177,
                                                "tag": 2,
                                                "videoName": "wgJ8ZHcw.json?exp=1766068225154&sig=bf01093333cf6e1afeac1a814c547dca",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 151,
                                "name": "Open Planche",
                                "image": "sPLSE4",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C11",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 73,
                                        "masteryLevel": "30s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6s"
                                    },
                                    "2": {
                                        "masterySetId": 74,
                                        "masteryLevel": "30s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6s"
                                    },
                                    "3": {
                                        "masterySetId": 75,
                                        "masteryLevel": "30s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "4": {
                                        "masterySetId": 77,
                                        "masteryLevel": "30s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12s"
                                    },
                                    "5": {
                                        "masterySetId": 78,
                                        "masteryLevel": "30s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18s"
                                    },
                                    "6": {
                                        "masterySetId": 79,
                                        "masteryLevel": "30s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18s"
                                    },
                                    "7": {
                                        "masterySetId": 81,
                                        "masteryLevel": "30s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "8": {
                                        "masterySetId": 82,
                                        "masteryLevel": "30s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30s"
                                    },
                                    "9": {
                                        "masterySetId": 83,
                                        "masteryLevel": "30s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211540,
                                "setsAndReps": "3x6s",
                                "order": 11,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Open Planche",
                                        "setsAndReps": "3x6s",
                                        "imageName": "sPLSE4",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 151,
                                                "description": "1) Planche work requires the scapula to be BOTH protracted and depressed to maximize your leverage.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 151,
                                                "instructions": "Begin kneeling on all fours with your hands rotated outward approximately 45-degrees. With locked elbows and protracted and depressed shoulders, begin to lean forward. As you lean, allow your feet to lift off the ground and your legs to come apart. Continue angling forward until your hips reach shoulder height. Spread your legs apart until your knees are just outside of your elbows (keep them bent to 90-degrees). Pause and hold for time. Keep your shoulder blades strongly depressed and protracted to maximize your leverage.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1332,
                                                "exerciseId": 151,
                                                "tag": 1,
                                                "videoName": "exTjsEnD.json?exp=1766068225154&sig=0c448e925b4ac03a32651e53ad6b99c7",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Bent Arm Straddle Planche Single Leg Hold",
                                        "setsAndReps": "3x10r",
                                        "imageName": "sPLSE4IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 151,
                                                "description": "1) The hips must remain completely flat and open.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 151,
                                                "description": "2) Keep the chest well clear of the floor.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 151,
                                                "instructions": "Begin kneeling on all fours with your hands rotated out approximately 45-degrees. Begin to lean forward and lower your torso down toward the floor. As you lower, lift your feet up, keep your knees bent to 90-degrees, and straddle wide. Hold your torso just off the floor and achieve a half straddle with your hips. You'll need a strong forward lean to maintain balance. Keep your shoulder blades strongly depressed and protracted to maximize your leverage. Now extend your right leg until your right knee completely straightens and is parallel to the floor (level with your upper body and hips). Pause, be sure your right quadricep is engaged, straddle wide, and hold for time. Before exiting the bent arm planche, switch legs and perform another static hold with your left leg extended. Keep your torso just off the floor in a proper bent arm planche position for both single leg holds.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1333,
                                                "exerciseId": 151,
                                                "tag": 2,
                                                "videoName": "61jzC7aK.json?exp=1766068225154&sig=a11f2ad8e022559a4cab5c4fae2859d0",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 4": {}
                }
            }
        ],
        "FRIDAY,DECEMBER 19": [
            {
                "scheduleId": 518670,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068225154&sig=b4194f9d9b02f26850a321a17faeb2f3",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518671,
                "classId": 60033,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "Hip Prehab",
                    "trainingType": "Mobility",
                    "mediaId": "oYB1u4Mj.json?exp=1766068225154&sig=44809a821096f651cf9c1cabe0437855",
                    "image": "330x220-hip-prehab.jpg",
                    "description": "Keep your hips healthy and strong while protecting against common injuries, aches, and pains. This short follow along moves your hips through their whole range of motion and creates strength through the whole range. All this is done through simple, standing leg raise variations that can be done anywhere. Use this class to prime your hips for squatting or other lower-body exercises, or as part of a longer mobility session.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518672,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {
                        "Front Lever": [
                            {
                                "exerciseId": 145,
                                "name": "Negative Front Pull",
                                "image": "FLPE15",
                                "group": "Foundation Core",
                                "exerciseNotation": "A15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211539,
                                "setsAndReps": "3x1r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Negative Front Pull",
                                        "setsAndReps": "3x1r",
                                        "imageName": "FLPE15",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 145,
                                                "description": "1) Feel the shoulders partially protract and widen during the descent. This provides the best leverage.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 145,
                                                "instructions": "Begin in an inverted hang from a pull-up bar or between parallel bars. Straighten your elbows, knees, and achieve a posterior pelvic tilt (PPT). Keep this hollow body position and slowly lower your body down through a front lever to a dead hang. Tuck your knees, press back up to the start position, and repeat for reps. During each negative front lever pull, keep your shoulders depressed and partially protracted.\r\n",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1320,
                                                "exerciseId": 145,
                                                "tag": 1,
                                                "videoName": "WqjC0k0Q.json?exp=1766068225158&sig=049579d972a51339f63276504e4696dc",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Low Bridge Rock",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLPE15IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 145,
                                                "description": "1) Pull the feet into the glutes and the hands close into the shoulders to give the best leverage pressing off the floor.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 145,
                                                "instructions": "Lie on your back with your hands placed palms down next to your ears. With your elbows and knees bent, feet flat on the floor, push through your hands and feet to raise your head just off the ground. Keep your head one to two inches off the ground, press your hips high, and pause briefly. Lower back down to the floor with control and repeat for reps. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1321,
                                                "exerciseId": 145,
                                                "tag": 2,
                                                "videoName": "e4ipIMCU.json?exp=1766068225158&sig=c504a5372d8874e9d299cdd38e95abbb",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 155,
                                "name": "Side Arch Body Rock",
                                "image": "SLPE13",
                                "group": "Foundation Core",
                                "exerciseNotation": "B13",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 37,
                                        "masteryLevel": "30r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6r"
                                    },
                                    "2": {
                                        "masterySetId": 38,
                                        "masteryLevel": "30r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "3": {
                                        "masterySetId": 39,
                                        "masteryLevel": "30r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12r"
                                    },
                                    "4": {
                                        "masterySetId": 41,
                                        "masteryLevel": "30r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12r"
                                    },
                                    "5": {
                                        "masterySetId": 42,
                                        "masteryLevel": "30r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18r"
                                    },
                                    "6": {
                                        "masterySetId": 43,
                                        "masteryLevel": "30r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18r"
                                    },
                                    "7": {
                                        "masterySetId": 45,
                                        "masteryLevel": "30r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24r"
                                    },
                                    "8": {
                                        "masterySetId": 46,
                                        "masteryLevel": "30r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30r"
                                    },
                                    "9": {
                                        "masterySetId": 47,
                                        "masteryLevel": "30r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211541,
                                "setsAndReps": "3x6r",
                                "order": 13,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Side Arch Body Rock",
                                        "setsAndReps": "3x6r",
                                        "imageName": "SLPE13",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 155,
                                                "description": "1) The torso and feet should elevate equally on their respective sides during the rocking motion.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 155,
                                                "instructions": "Begin lying on your right side, body extended, with your right arm overhead. Place your left hand on the floor just in front of you for balance. Be sure your body is straight (no piking a your hips). Now lift your torso and legs straight up at the exact same time, arching through the left side of your body. Aim to lift your upper and lower body the same amount. From your best side arch, begin to use your left oblique to smoothly rock forward, toward your right shoulder and backward, toward your right hip. Keep a straight body and avoid using your left hand to push; generate the momentum fro your core. Repeat for reps.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1340,
                                                "exerciseId": 155,
                                                "tag": 1,
                                                "videoName": "xVqyQBI0.json?exp=1766068225158&sig=d510bb9723d38061621fad76dfe999bd",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Hurdler Static",
                                        "setsAndReps": "3x10s",
                                        "imageName": "SLPE13IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 155,
                                                "description": "1) Feel the back of the extended knee pressing firmly into the ground as you reach out into the stretch.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 155,
                                                "instructions": "Start sitting upright in a seated straddle on the floor. Pull your right foot into your groin and straighten your left knee completely. Extend a light weight overhead, shrug your shoulders to your ears, and lock your elbows. Leading with the weight, lean to your side over your left leg. Keep your torso facing forward and shoulders fully open (biceps behind your ears). Lower down until you feel a strong stretch in your right oblique. Stretch your torso long across your leg rather than hunching; try to get your bottom shoulder to your knee. Also be sure keep both glutes in contact with the floor throughout. Hold for time on your left side before switching. ",
                                                "equipment": "Dumbbell, Yoga Block"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1341,
                                                "exerciseId": 155,
                                                "tag": 2,
                                                "videoName": "UQaQw6Mx.json?exp=1766068225158&sig=7d7d58a5904f2db5d06d68992c63cc92",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 161,
                                "name": "L-sit Scissors",
                                "image": "MNSE4",
                                "group": "Foundation Core",
                                "exerciseNotation": "C13",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211542,
                                "setsAndReps": "3x1r",
                                "order": 13,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "L-sit Scissors",
                                        "setsAndReps": "3x1r",
                                        "imageName": "MNSE4",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 161,
                                                "description": "1) Pull the legs apart with control; no jerking or rushing.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 161,
                                                "description": "2) Do not allow the feet to drop below the knees.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 161,
                                                "instructions": "Begin in a top support position on parallel bars with your elbows locked and body straight. With your torso vertical, lift your knees up to hip height, bending them to 90-degrees. Alternatively, begin kneeling between two parallettes and press into a bent knee top support. Fight to keep your shoulders down as far from your ears as possible (depressed) and your thighs perfectly parallel to the floor. Now quickly extend your legs, lock your knees, and straddle your legs wide (legs held parallel to the floor). Bring your legs back together, returning the L-sit, and repeat the L-sit scissor for reps.",
                                                "equipment": "Parallettes, Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1352,
                                                "exerciseId": 161,
                                                "tag": 1,
                                                "videoName": "P6NKNnal.json?exp=1766068225158&sig=7d9112478ec714a373d1dad3d4e9aaf1",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Standing Weighted Straddle Hang",
                                        "setsAndReps": "3x30s",
                                        "imageName": "MNSE4IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 161,
                                                "description": "1) The hips press backwards slightly to maintain balance.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 161,
                                                "description": "2) Don't pull against the weight, allow the shoulders to open.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 161,
                                                "instructions": "Begin standing on an elevated surface with your knees straight and legs straddled wide. Use a weight that is well within your comfort zone. Fold forward, allowing the weight to pull you down. Once you’ve reached your limit, tuck your chin into your chest and allow your lats and the muscles surrounding your spine to relax and lengthen. Make an effort to keep your quads engaged throughout the hold. Sink deep into the stretch and remember to breath as you hold for time.",
                                                "equipment": "Dumbbell, Barbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1353,
                                                "exerciseId": 161,
                                                "tag": 2,
                                                "videoName": "FFojs3hQ.json?exp=1766068225158&sig=e91a6801c0fd70fa01b3f137f15fbe95",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 4": {}
                }
            },
            {
                "scheduleId": 518673,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 167,
                                "name": "Static Single Leg Squat",
                                "image": "SLSSE2",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A10",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 73,
                                        "masteryLevel": "30s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6s"
                                    },
                                    "2": {
                                        "masterySetId": 74,
                                        "masteryLevel": "30s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6s"
                                    },
                                    "3": {
                                        "masterySetId": 75,
                                        "masteryLevel": "30s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "4": {
                                        "masterySetId": 77,
                                        "masteryLevel": "30s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12s"
                                    },
                                    "5": {
                                        "masterySetId": 78,
                                        "masteryLevel": "30s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18s"
                                    },
                                    "6": {
                                        "masterySetId": 79,
                                        "masteryLevel": "30s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18s"
                                    },
                                    "7": {
                                        "masterySetId": 81,
                                        "masteryLevel": "30s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "8": {
                                        "masterySetId": 82,
                                        "masteryLevel": "30s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30s"
                                    },
                                    "9": {
                                        "masterySetId": 83,
                                        "masteryLevel": "30s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211543,
                                "setsAndReps": "3x6s",
                                "order": 10,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Static Single Leg Squat",
                                        "setsAndReps": "3x6s",
                                        "imageName": "SLSSE2",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 167,
                                                "description": "1) Depending on your individual proportions, you may find that extending a light weight greatly aids in counter balance.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 167,
                                                "instructions": "Squat down to full-depth, achieving full hamstring to calf contact, with your feet together. Stay in the bottom of the squat and extend your right leg completely. Engage your right quad, point your right toe, and hold this position for time. Pay close attention to your left knee and never allow it to drift inside of your left foot. Your extended foot should never touch the floor; keep it suspended for the entire set. If balance is an issue, extend a light weight in front of you to help counter-balance. Once time is up, retract your right leg and switch, remaining in the low squat.",
                                                "equipment": "Body Only, Weight Plate, Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1364,
                                                "exerciseId": 167,
                                                "tag": 1,
                                                "videoName": "eSgNtCbV.json?exp=1766068225160&sig=b4e2786b65487d1e19cc748f23a50219",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Single Leg Bridge Curl",
                                        "setsAndReps": "3x5r@",
                                        "imageName": "SLSSE2IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 167,
                                                "description": "1) A furniture slider is employed to reduce friction.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 167,
                                                "description": "2) Only the foot moves; the rest of the body should be rigid.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 167,
                                                "instructions": "Lie on your back with knees bent, legs hip-distance apart, and right heel on an exercise slider. Lift your left foot up until your left knee straightens. Keep your arms by your side and press your hips up toward the ceiling. Open your chest and maintain a straight line from your shoulders to your left foot. Slide your right foot away from you until your knee fully straightens. Pause, keep your hips high, and use your hamstring to pull your foot back under your knee. Use a slider or other object that reduces friction enough to keep your leg curls smooth. Repeat for reps, keeping your glutes engaged, hips high, and non-working leg straight throughout before alternating legs. ",
                                                "equipment": "Slider"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1365,
                                                "exerciseId": 167,
                                                "tag": 2,
                                                "videoName": "HraTyr2G.json?exp=1766068225160&sig=9182d0215a88fe32dc314febb6efcfed",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    },
                    "LEVEL 4": {}
                }
            }
        ],
        "SATURDAY,DECEMBER 20": [
            {
                "scheduleId": 518674,
                "classId": 59210,
                "type": "Class",
                "dayIndex": 6,
                "workout": {
                    "className": "Middle Split",
                    "trainingType": "Stretch",
                    "mediaId": "JatJjiFp.json?exp=1766068225160&sig=4442ad8375d13586213491647b703602",
                    "image": "stretch-middle-split.jpg",
                    "description": "Everyone can start building the mobility necessary for the middle splits and pancake–no matter what your flexibility level is! This 45-minute sequence will help you find relief and develop flexibility throughout your lower body.",
                    "isLogged": false
                }
            }
        ],
        "SUNDAY,DECEMBER 21": null
    }
    let advancedTwo = {
        "MONDAY,DECEMBER 15": [
            {
                "scheduleId": 518675,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 1,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068248403&sig=9e1f77ebbdd92d4da08e851cb9e2a3c5",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518676,
                "classId": 59274,
                "type": "Class",
                "dayIndex": 1,
                "workout": {
                    "className": "Wrist Sequence",
                    "trainingType": "Mobility",
                    "mediaId": "W6c5dMg6.json?exp=1766068248403&sig=1d6f641cf8782730dcd14b75f5b120da",
                    "image": "330x220-WristSequence.jpg",
                    "description": "In less than five minutes you can strengthen your wrists to prevent injury and properly prepare for wrist-intense workouts–like handstand or planche training. These often-overlooked but seriously vital joints should make an appearance in any warm-up, and this follow-along makes it simple.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518677,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 1,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 212,
                                "name": "Chest Roll 1",
                                "image": "HBPSE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A23",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211550,
                                "setsAndReps": "3x1r",
                                "order": 23,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Chest Roll 1",
                                        "setsAndReps": "3x1r",
                                        "imageName": "HBPSE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 212,
                                                "description": "1) A common error is failing to pull the feet over the head.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 212,
                                                "description": "2) If this occurs, the chest roll will press out to a planche.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 212,
                                                "instructions": "Setup by lying prone with your body elevated 1-2 feet up on panel mats or another soft surface. Place your hands on the floor below the mat, handstand width apart. Press up to a kneeling plank to assume your starting position. Quickly bend your elbows and use momentum to roll your body forward along the mat. Maintain a curve in your back during the entire roll. Once your feet stack overhead, press your body upward and perform a handstand push-up up to free handstand. Achieve a stable handstand before dropping out to end the rep. Reset on the mat and repeat for reps.",
                                                "equipment": "Panel Mat "
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1454,
                                                "exerciseId": 212,
                                                "tag": 1,
                                                "videoName": "sdX1MAD7.json?exp=1766068248473&sig=e20b85c4912b3bfbc1b46650477f6522",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Prone Retraction Two",
                                        "setsAndReps": "3x30s",
                                        "imageName": "HBPSE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 212,
                                                "description": "1) Fully retract the scapula at the top of each repetition.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 212,
                                                "instructions": "Lay flat on your stomach (prone) with your arms out in a letter T shape. Check that you have a 90-degree angle at each armpit. With straight elbows, lift your hands and arms straight up as high as possible while fully retracting your shoulder blades. Keep your hands in line with your shoulders and pause briefly before lowering. Repeat for reps, ensuring that you are pinching your shoulder blades together as much as possible during each.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1455,
                                                "exerciseId": 212,
                                                "tag": 2,
                                                "videoName": "7VqsObVa.json?exp=1766068248473&sig=14b3d6aa94a697c9c02a229ed0f860af",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 220,
                                "name": "Czech 1",
                                "image": "RCSE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B23",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211551,
                                "setsAndReps": "3x1r",
                                "order": 23,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Czech 1",
                                        "setsAndReps": "3x1r",
                                        "imageName": "RCSE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 220,
                                                "description": "1) Grasp the bottom hand near the wrist of the top hand.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 220,
                                                "description": "2) After 5 reps, switch hands and do 5 more reps.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 220,
                                                "instructions": "Stand next to a gym rope and grab it as high as possible with your right hand. Your right elbow should now be fully extended. Next, grab on with your left hand at the height of your right wrist. Pull up until your right hand is shoulder height. Lower with control and repeat for reps. Reverse your grips and perform the same number of reps with opposite hand positioning. ",
                                                "equipment": "Gym Climbing Rope"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1470,
                                                "exerciseId": 220,
                                                "tag": 1,
                                                "videoName": "um5smFTZ.json?exp=1766068248473&sig=e2b1005bebc501f55bafa91a816723ac",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Scap Pull",
                                        "setsAndReps": "3x5r",
                                        "imageName": "RCSE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 220,
                                                "description": "1) Using the scaps, strongly retract and arch backward.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 220,
                                                "description": "2) Do not bend the arms.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 220,
                                                "instructions": "Grab a pull-up bar or top rung of stall bars in a shoulder-width overgrip (palms away). If you are using stall bars, face them to prevent your body from drifting forward during the pull. If you are hanging from a pull-up bar, do not allow your hips to drift forward in front of the bar. Initiate the scap pull by fully depressing your shoulder blades and retracting them as much as possible. Keep your arms straight and allow the depression and retraction to arch your body backward. Control your body back to the dead hang and repeat for reps.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1471,
                                                "exerciseId": 220,
                                                "tag": 2,
                                                "videoName": "iUtMujQ6.json?exp=1766068248473&sig=ffe89d1c8d243de7adb7a87c057cb276",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 192,
                                "name": "1/2 Straddle Planche Single Extension",
                                "image": "sPLSE8",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211547,
                                "setsAndReps": "3x2r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "1/2 Straddle Planche Single Extension",
                                        "setsAndReps": "3x2r",
                                        "imageName": "sPLSE8",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 192,
                                                "description": "1) The hip should be completely flat at full extension.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 192,
                                                "description": "2) Do not kick or jerk; this is a smooth movement.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 192,
                                                "instructions": "Begin kneeling on all fours with your hands rotated outward approximately 45-degrees. With locked elbows and protracted and depressed shoulders, begin to lean forward. As you lean, allow your feet to lift off the ground and your legs to come apart. Continue angling forward until your hips reach shoulder height. Open your hips, keep your knees bent to 90-degrees, and straddle as wide as you can. Now extend your right leg while continuing to straddle wide with both hips open. Pause briefly and return to the half straddle planche. Switch sides and continue to alternate for reps. Avoid bobbing up and down during the extensions; keep a stable planche position throughout. Be sure your shoulder blades remain strongly depressed and protracted to maximize your leverage. To keep your hips open you must maintain a significant forward lean.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1414,
                                                "exerciseId": 192,
                                                "tag": 1,
                                                "videoName": "QeZj1kmN.json?exp=1766068248473&sig=32ba35e42be150e13dde1fae318a2ab8",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "SAC 3",
                                        "setsAndReps": "3x5r",
                                        "imageName": "sPLSE8IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 192,
                                                "description": "1) Raise the knee upward as far as possible without tilting.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 192,
                                                "description": "2) Keep the shin parallel to the floor while pressing back.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 192,
                                                "instructions": "From standing, bend your right knee to 90-degrees behind you (shin parallel to the floor), so that you're balancing on your left leg. Remain completely upright and use a wall or other object for balance if necessary as you lift your thigh out to the side and as high as possible. Keep the hips square to the front. Avoid shifting your weight sideways as you lift; feel the outside of your right hip work hard to lift your leg. Pause at your end range and then, keeping your knee at the same height, slowly slide your leg back behind you. Slide it as far as you can without losing height, pause, and return the top of the standing abduction position. Repeat the backward slide for reps before lowering your leg and switching sides.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1415,
                                                "exerciseId": 192,
                                                "tag": 2,
                                                "videoName": "9ww6LeeP.json?exp=1766068248473&sig=40930444c8f054d72dc98286763b1a20",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ],
        "TUESDAY,DECEMBER 16": [
            {
                "scheduleId": 518678,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068248473&sig=a4348833d4fd865c35b52d3dd1b0c8db",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518679,
                "classId": 59278,
                "type": "Class",
                "dayIndex": 2,
                "workout": {
                    "className": "Stall Bar Intensive Stretch",
                    "trainingType": "Mobility",
                    "mediaId": "1rtbTT5F.json?exp=1766068248473&sig=e49978d79647bb62b0d4224d354b99a6",
                    "image": "330x220-StallBarIntensiveStretch.jpg",
                    "description": "Looking for fresh ways to incorporate stall bars into your fitness routine? This 10-minute follow-along introduces six stall bar stretches that target and ignite the hamstrings, hips and thoracic spine.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518680,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {
                        "Front Lever": [
                            {
                                "exerciseId": 185,
                                "name": "1/2 Straddle Front Lever Scissor",
                                "image": "FLSE5",
                                "group": "Foundation Core",
                                "exerciseNotation": "A21",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211546,
                                "setsAndReps": "3x1r",
                                "order": 21,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "1/2 Straddle Front Lever Scissor",
                                        "setsAndReps": "3x1r",
                                        "imageName": "FLSE5",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 185,
                                                "description": "1) Do not perform speed scissors; each repetition should be controlled and deliberate.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 185,
                                                "instructions": "Begin from a dead hang with your knees bent to 90-degrees and legs straddled wide. With straight elbows, keep your body in the half straddle position and pull it up to horizontal. You should have a straight line from your knees to your shoulders. Feel your shoulders press backward as you maintain scapular depression and partial protraction. Maintain a posterior pelvic tilt (PPT), locked elbows, and stable torso position with strong core and back tension. From this start position, slowly bring your thighs together (knees still bent). Pause, and return to a wide half-straddle. Keep a stable torso position and repeat this half-straddle scissor for reps.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1400,
                                                "exerciseId": 185,
                                                "tag": 1,
                                                "videoName": "hIfip529.json?exp=1766068248478&sig=1c2cf5e805947dfa49e3f3d3e519cdad",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Bridge",
                                        "setsAndReps": "3x10s",
                                        "imageName": "FLSE5IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 185,
                                                "description": "1) The progression of refinement is; first arms straight, then chest pressed forward, then legs straight, then feet together.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 185,
                                                "instructions": "Lie on your back with your hands placed flat next to your ears. With your elbows and knees bent, feet flat on the floor, press through your feet to get your hips up and engage your glutes. Push through your hands and press your elbows as straight as possible. As your back arches, be sure you feel the stretch in your upper back and not your lower back. The progression of refinement for the full bridge is: arms straight, chest pressed forward, legs straight, and feet together in that order. Hold for time. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1401,
                                                "exerciseId": 185,
                                                "tag": 2,
                                                "videoName": "PfcuKtas.json?exp=1766068248478&sig=549c4af0c4d114b25189b508f0f906a0",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 196,
                                "name": "Side Lever Inverted Hold",
                                "image": "SLSE4",
                                "group": "Foundation Core",
                                "exerciseNotation": "B19",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 73,
                                        "masteryLevel": "30s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6s"
                                    },
                                    "2": {
                                        "masterySetId": 74,
                                        "masteryLevel": "30s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6s"
                                    },
                                    "3": {
                                        "masterySetId": 75,
                                        "masteryLevel": "30s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "4": {
                                        "masterySetId": 77,
                                        "masteryLevel": "30s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12s"
                                    },
                                    "5": {
                                        "masterySetId": 78,
                                        "masteryLevel": "30s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18s"
                                    },
                                    "6": {
                                        "masterySetId": 79,
                                        "masteryLevel": "30s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18s"
                                    },
                                    "7": {
                                        "masterySetId": 81,
                                        "masteryLevel": "30s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "8": {
                                        "masterySetId": 82,
                                        "masteryLevel": "30s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30s"
                                    },
                                    "9": {
                                        "masterySetId": 83,
                                        "masteryLevel": "30s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211548,
                                "setsAndReps": "3x6s",
                                "order": 19,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Side Lever Inverted Hold",
                                        "setsAndReps": "3x6s",
                                        "imageName": "SLSE4",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 196,
                                                "description": "1) Press up strongly with the bottom arm.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 196,
                                                "description": "2) Keep the hips square at the top of the movement.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 196,
                                                "instructions": "Begin facing a set of stall bars and place your right hand on a rung above head height (palm down). With your left hand, a rung below hip height directly underneath (in line with) your right hand, palm up. Adjust your hands so they are centered in the middle of your body. Ensure that your arms make approximately a 120-degree angle. Some experimentation with your side lever hand position may be necessary to find the most comfortable position for your proportions. Now either kick your legs up overhead or walk your feet up the stall bars to invert your body. As you invert, straight your elbows and knees. With your body facing the stall bars, assume a hollow position with posterior pelvic tilt. Keep your legs just in front of the stall bars and push strongly through your left arm (depress) to maintain position. Hold for time before switching sides.",
                                                "equipment": "Stall Bars"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1422,
                                                "exerciseId": 196,
                                                "tag": 1,
                                                "videoName": "MgwA358Z.json?exp=1766068248478&sig=c2f0127397f916dbf766686f680ab944",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Pancake Side Static",
                                        "setsAndReps": "3x10s",
                                        "imageName": "SLSE4IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 196,
                                                "description": "1) Press strongly upward before beginning to lower to the side.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 196,
                                                "instructions": "Start sitting upright in a seated straddle on the floor with straight knees. Extend a light weight overhead, shrug your shoulders to your ears, and lock your elbows. Leading with the weight, lean to your side over your left leg. Keep your torso facing forward and shoulders fully open (biceps behind your ears). Lower down until you feel a strong stretch through the right side of your torso. Stretch your torso long across your leg rather than hunching; try to get your bottom shoulder to your knee. Also be sure keep both glutes in contact with the floor throughout. Hold for time on your left side before switching. ",
                                                "equipment": "Dumbbell, Yoga Block"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1423,
                                                "exerciseId": 196,
                                                "tag": 2,
                                                "videoName": "InhG1Su7.json?exp=1766068248478&sig=bd8488aa1f58e61fa9c7993a6857851f",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 203,
                                "name": "Elevated Reverse Plank",
                                "image": "MNSE10",
                                "group": "Foundation Core",
                                "exerciseNotation": "C19",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 85,
                                        "masteryLevel": "60s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "2": {
                                        "masterySetId": 86,
                                        "masteryLevel": "60s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "12s"
                                    },
                                    "3": {
                                        "masterySetId": 87,
                                        "masteryLevel": "60s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "24s"
                                    },
                                    "4": {
                                        "masterySetId": 89,
                                        "masteryLevel": "60s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "5": {
                                        "masterySetId": 90,
                                        "masteryLevel": "60s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "36s"
                                    },
                                    "6": {
                                        "masterySetId": 91,
                                        "masteryLevel": "60s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "36s"
                                    },
                                    "7": {
                                        "masterySetId": 93,
                                        "masteryLevel": "60s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "48s"
                                    },
                                    "8": {
                                        "masterySetId": 94,
                                        "masteryLevel": "60s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "60s"
                                    },
                                    "9": {
                                        "masterySetId": 95,
                                        "masteryLevel": "60s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "60s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211549,
                                "setsAndReps": "3x12s",
                                "order": 19,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Elevated Reverse Plank",
                                        "setsAndReps": "3x12s",
                                        "imageName": "MNSE10",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 203,
                                                "description": "1) With hands shoulder width, strongly retract the scapula while pressing the hips up to shoulder height.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 203,
                                                "instructions": "Begin seated on the floor with your feet elevated on a box, bench, or other stable object approximately 2-3 feet high. Place your hands behind you, fingers facing backward, at shoulder width. Straighten your elbows, open your chest (fully retract your scapula), and press your hips up to shoulder height. At the top, engage your glutes and be sure your body is parallel to the floor. Keep your elbows locked and shoulder blades completely pinched together as you hold for time.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1436,
                                                "exerciseId": 203,
                                                "tag": 1,
                                                "videoName": "OTIZMciR.json?exp=1766068248478&sig=58a0c3b0273fe58230a87224e4904a7c",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Seated Straddle Pulse",
                                        "setsAndReps": "3x30s",
                                        "imageName": "MNSE10IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 203,
                                                "description": "1) Perform the pulses for a block of time rather than for reps.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 203,
                                                "description": "2) Keep the hands at least in front of the knees if possible.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 203,
                                                "instructions": "Begin in a seated straddle and ensure your torso is upright. Place your hands flat on the floor between your thighs and straighten your elbows. With your elbows and knees locked (quads engaged) see if you can lift your legs off the floor. If you can't, slide your hands back (toward your groin) until you can lift your heels with straight legs. You want to reach your hands as far toward your ankles as you can while still maintaining your ability to lift your heels. Once your ideal hand position is set, lift your legs as high as possible. Now perform small reps up and down, keeping your legs high, hands fixed, and torso in place. During the set do not allow your heels to touch the floor, nor your straddle to narrow. Keep your heels held up as high as you can while you perform subtle pulses.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1437,
                                                "exerciseId": 203,
                                                "tag": 2,
                                                "videoName": "87gDR9Mb.json?exp=1766068248478&sig=f736efa9849975724f025d4985a4fb55",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                "scheduleId": 518681,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 2,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 410,
                                "name": "Lunge with 25% Additional Bodyweight",
                                "image": "FLSSE6",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A14",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211552,
                                "setsAndReps": "3x2r",
                                "order": 14,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Lunge with 25% Additional Bodyweight",
                                        "setsAndReps": "3x2r",
                                        "imageName": "FLSSE6",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 410,
                                                "description": "1) The rear knee should lightly brush the ground; do not allow it to bounce off the ground.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 410,
                                                "instructions": "Weighted Lunge +25% Bodyweight: Using an additional 25% bodyweight, stand upright with your feet together and the weight either held in each hand or across your shoulders. Step forward with your right leg, leaving your left leg stationary. Bend your right knee to bring it directly over your toes. At the same time, bring your left knee to touch the ground gently. Keep your torso vertical throughout the movement. Strongly push back with your right leg to return to the start position. Alternate legs for each rep. Use your preference of weight–dumbbells, a barbell, plates, a sandbag, etc.",
                                                "equipment": "Barbell, Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1721,
                                                "exerciseId": 410,
                                                "tag": 1,
                                                "videoName": "nArlr4Ro.json?exp=1766068248480&sig=4c61cbfb4e096850b98e6c97e2342ca4",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Arch Up + 10 lbs",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLSSE6IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 410,
                                                "description": "1) Note the deliberate tempo of the movement; do not swing or bounce up into the reps.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 410,
                                                "instructions": "Lie prone over a support that allows your torso to hang freely when it is set at the crease of your hips. With 10 pounds held to your chest (in the form of a plate is the most effective), begin with your torso hanging, hips bent to 90-degrees. Anchor your feet down by having someone or something hold them in place. Now pull against your foot anchor to raise your torso as high as possible, arching your spine as you lift past parallel. Pause at the top in your best arch, lower back down with control, and repeat for reps.",
                                                "equipment": "Weight Plate, Plyometric Box, Stall Bars, Back Strap"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1722,
                                                "exerciseId": 410,
                                                "tag": 2,
                                                "videoName": "uOgTsSEf.json?exp=1766068248480&sig=a7bcd0bac174c51975a3a9b069ca92f2",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ],
        "WEDNESDAY,DECEMBER 17": [
            {
                "scheduleId": 518682,
                "classId": 59216,
                "type": "Class",
                "dayIndex": 3,
                "workout": {
                    "className": "Front Split",
                    "trainingType": "Stretch",
                    "mediaId": "aH1k32u9.json?exp=1766068248480&sig=c06ce6053fafa3ac39bc2fb3f13efbbe",
                    "image": "stretch-front-split.jpg",
                    "description": "A perfect 45-minute mobility routine for athletes and office workers alike! Tension in the quads, hip flexors, feet, calves, and hamstrings will rapidly disappear with continued use of this sequence. If Front Splits are your goal, start here!",
                    "isLogged": false
                }
            }
        ],
        "THURSDAY,DECEMBER 18": [
            {
                "scheduleId": 518683,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 4,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068248480&sig=9c9766d4dff1758c46846827940ba6b5",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518684,
                "classId": 59274,
                "type": "Class",
                "dayIndex": 4,
                "workout": {
                    "className": "Wrist Sequence",
                    "trainingType": "Mobility",
                    "mediaId": "W6c5dMg6.json?exp=1766068248480&sig=b776c257c72e64297e994cc9d65e449e",
                    "image": "330x220-WristSequence.jpg",
                    "description": "In less than five minutes you can strengthen your wrists to prevent injury and properly prepare for wrist-intense workouts–like handstand or planche training. These often-overlooked but seriously vital joints should make an appearance in any warm-up, and this follow-along makes it simple.",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518685,
                "classId": 59219,
                "type": "Program",
                "dayIndex": 4,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {
                        "Hollow Back Press": [
                            {
                                "exerciseId": 212,
                                "name": "Chest Roll 1",
                                "image": "HBPSE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "A23",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211550,
                                "setsAndReps": "3x1r",
                                "order": 23,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Chest Roll 1",
                                        "setsAndReps": "3x1r",
                                        "imageName": "HBPSE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 212,
                                                "description": "1) A common error is failing to pull the feet over the head.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 212,
                                                "description": "2) If this occurs, the chest roll will press out to a planche.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 212,
                                                "instructions": "Setup by lying prone with your body elevated 1-2 feet up on panel mats or another soft surface. Place your hands on the floor below the mat, handstand width apart. Press up to a kneeling plank to assume your starting position. Quickly bend your elbows and use momentum to roll your body forward along the mat. Maintain a curve in your back during the entire roll. Once your feet stack overhead, press your body upward and perform a handstand push-up up to free handstand. Achieve a stable handstand before dropping out to end the rep. Reset on the mat and repeat for reps.",
                                                "equipment": "Panel Mat "
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1454,
                                                "exerciseId": 212,
                                                "tag": 1,
                                                "videoName": "sdX1MAD7.json?exp=1766068248550&sig=c09e27c592f0b8c6e9f73a59afd035f5",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Prone Retraction Two",
                                        "setsAndReps": "3x30s",
                                        "imageName": "HBPSE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 212,
                                                "description": "1) Fully retract the scapula at the top of each repetition.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 212,
                                                "instructions": "Lay flat on your stomach (prone) with your arms out in a letter T shape. Check that you have a 90-degree angle at each armpit. With straight elbows, lift your hands and arms straight up as high as possible while fully retracting your shoulder blades. Keep your hands in line with your shoulders and pause briefly before lowering. Repeat for reps, ensuring that you are pinching your shoulder blades together as much as possible during each.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1455,
                                                "exerciseId": 212,
                                                "tag": 2,
                                                "videoName": "7VqsObVa.json?exp=1766068248550&sig=9c71de51a4f93dff003462fc70d1a1f7",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Rope Climb": [
                            {
                                "exerciseId": 220,
                                "name": "Czech 1",
                                "image": "RCSE1",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "B23",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211551,
                                "setsAndReps": "3x1r",
                                "order": 23,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Czech 1",
                                        "setsAndReps": "3x1r",
                                        "imageName": "RCSE1",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 220,
                                                "description": "1) Grasp the bottom hand near the wrist of the top hand.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 220,
                                                "description": "2) After 5 reps, switch hands and do 5 more reps.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 220,
                                                "instructions": "Stand next to a gym rope and grab it as high as possible with your right hand. Your right elbow should now be fully extended. Next, grab on with your left hand at the height of your right wrist. Pull up until your right hand is shoulder height. Lower with control and repeat for reps. Reverse your grips and perform the same number of reps with opposite hand positioning. ",
                                                "equipment": "Gym Climbing Rope"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1470,
                                                "exerciseId": 220,
                                                "tag": 1,
                                                "videoName": "um5smFTZ.json?exp=1766068248550&sig=a016bb58d6baf687ecd0563841658cff",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Scap Pull",
                                        "setsAndReps": "3x5r",
                                        "imageName": "RCSE1IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 220,
                                                "description": "1) Using the scaps, strongly retract and arch backward.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 220,
                                                "description": "2) Do not bend the arms.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 220,
                                                "instructions": "Grab a pull-up bar or top rung of stall bars in a shoulder-width overgrip (palms away). If you are using stall bars, face them to prevent your body from drifting forward during the pull. If you are hanging from a pull-up bar, do not allow your hips to drift forward in front of the bar. Initiate the scap pull by fully depressing your shoulder blades and retracting them as much as possible. Keep your arms straight and allow the depression and retraction to arch your body backward. Control your body back to the dead hang and repeat for reps.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1471,
                                                "exerciseId": 220,
                                                "tag": 2,
                                                "videoName": "iUtMujQ6.json?exp=1766068248550&sig=08b2ec67efd82489afd9e01e2f8f06d5",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Straddle Planche": [
                            {
                                "exerciseId": 192,
                                "name": "1/2 Straddle Planche Single Extension",
                                "image": "sPLSE8",
                                "group": "Foundation Upper Body",
                                "exerciseNotation": "C15",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211547,
                                "setsAndReps": "3x2r",
                                "order": 15,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "1/2 Straddle Planche Single Extension",
                                        "setsAndReps": "3x2r",
                                        "imageName": "sPLSE8",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 192,
                                                "description": "1) The hip should be completely flat at full extension.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 192,
                                                "description": "2) Do not kick or jerk; this is a smooth movement.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 192,
                                                "instructions": "Begin kneeling on all fours with your hands rotated outward approximately 45-degrees. With locked elbows and protracted and depressed shoulders, begin to lean forward. As you lean, allow your feet to lift off the ground and your legs to come apart. Continue angling forward until your hips reach shoulder height. Open your hips, keep your knees bent to 90-degrees, and straddle as wide as you can. Now extend your right leg while continuing to straddle wide with both hips open. Pause briefly and return to the half straddle planche. Switch sides and continue to alternate for reps. Avoid bobbing up and down during the extensions; keep a stable planche position throughout. Be sure your shoulder blades remain strongly depressed and protracted to maximize your leverage. To keep your hips open you must maintain a significant forward lean.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1414,
                                                "exerciseId": 192,
                                                "tag": 1,
                                                "videoName": "QeZj1kmN.json?exp=1766068248550&sig=ef22638bff182b81da179a1cca1ee5aa",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "SAC 3",
                                        "setsAndReps": "3x5r",
                                        "imageName": "sPLSE8IM",
                                        "group": "Foundation Upper Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 192,
                                                "description": "1) Raise the knee upward as far as possible without tilting.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 192,
                                                "description": "2) Keep the shin parallel to the floor while pressing back.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 192,
                                                "instructions": "From standing, bend your right knee to 90-degrees behind you (shin parallel to the floor), so that you're balancing on your left leg. Remain completely upright and use a wall or other object for balance if necessary as you lift your thigh out to the side and as high as possible. Keep the hips square to the front. Avoid shifting your weight sideways as you lift; feel the outside of your right hip work hard to lift your leg. Pause at your end range and then, keeping your knee at the same height, slowly slide your leg back behind you. Slide it as far as you can without losing height, pause, and return the top of the standing abduction position. Repeat the backward slide for reps before lowering your leg and switching sides.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1415,
                                                "exerciseId": 192,
                                                "tag": 2,
                                                "videoName": "9ww6LeeP.json?exp=1766068248550&sig=754fbfafe6c3c814a2d5151caf53a0da",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ],
        "FRIDAY,DECEMBER 19": [
            {
                "scheduleId": 518686,
                "classId": 59176,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "Extended Warmup",
                    "trainingType": "Warm-Up",
                    "mediaId": "UCGHRpMp.json?exp=1766068248550&sig=bfaca352d47c9f8dad6e3027cce7dd49",
                    "image": "330x220-ExtendedWU.jpg",
                    "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518687,
                "classId": 59174,
                "type": "Class",
                "dayIndex": 5,
                "workout": {
                    "className": "Hanging Leg Lifts Triplex",
                    "trainingType": "Mobility",
                    "mediaId": "dD8flkMC.json?exp=1766068248550&sig=c0f66f5386295bd139f9703594b51aa6",
                    "image": "330x220-HLLTriplex.jpg",
                    "description": "Have less than five minutes to spare? You can still fit in this fiery core routine! Have a bit more time? Consider completing a few rounds for a real burner!",
                    "isLogged": false
                }
            },
            {
                "scheduleId": 518688,
                "classId": 59207,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {
                        "Front Lever": [
                            {
                                "exerciseId": 185,
                                "name": "1/2 Straddle Front Lever Scissor",
                                "image": "FLSE5",
                                "group": "Foundation Core",
                                "exerciseNotation": "A21",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 1,
                                        "masteryLevel": "5r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "1r"
                                    },
                                    "2": {
                                        "masterySetId": 2,
                                        "masteryLevel": "5r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "1r"
                                    },
                                    "3": {
                                        "masterySetId": 3,
                                        "masteryLevel": "5r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "4": {
                                        "masterySetId": 5,
                                        "masteryLevel": "5r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "2r"
                                    },
                                    "5": {
                                        "masterySetId": 6,
                                        "masteryLevel": "5r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "3r"
                                    },
                                    "6": {
                                        "masterySetId": 7,
                                        "masteryLevel": "5r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "3r"
                                    },
                                    "7": {
                                        "masterySetId": 9,
                                        "masteryLevel": "5r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "8": {
                                        "masterySetId": 10,
                                        "masteryLevel": "5r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "5r"
                                    },
                                    "9": {
                                        "masterySetId": 11,
                                        "masteryLevel": "5r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "5r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211546,
                                "setsAndReps": "3x1r",
                                "order": 21,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "1/2 Straddle Front Lever Scissor",
                                        "setsAndReps": "3x1r",
                                        "imageName": "FLSE5",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 185,
                                                "description": "1) Do not perform speed scissors; each repetition should be controlled and deliberate.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 185,
                                                "instructions": "Begin from a dead hang with your knees bent to 90-degrees and legs straddled wide. With straight elbows, keep your body in the half straddle position and pull it up to horizontal. You should have a straight line from your knees to your shoulders. Feel your shoulders press backward as you maintain scapular depression and partial protraction. Maintain a posterior pelvic tilt (PPT), locked elbows, and stable torso position with strong core and back tension. From this start position, slowly bring your thighs together (knees still bent). Pause, and return to a wide half-straddle. Keep a stable torso position and repeat this half-straddle scissor for reps.",
                                                "equipment": "Pull-up Bar"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1400,
                                                "exerciseId": 185,
                                                "tag": 1,
                                                "videoName": "hIfip529.json?exp=1766068248554&sig=8c6fdfa50a54fe653735e2e524ba89fa",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Bridge",
                                        "setsAndReps": "3x10s",
                                        "imageName": "FLSE5IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 185,
                                                "description": "1) The progression of refinement is; first arms straight, then chest pressed forward, then legs straight, then feet together.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 185,
                                                "instructions": "Lie on your back with your hands placed flat next to your ears. With your elbows and knees bent, feet flat on the floor, press through your feet to get your hips up and engage your glutes. Push through your hands and press your elbows as straight as possible. As your back arches, be sure you feel the stretch in your upper back and not your lower back. The progression of refinement for the full bridge is: arms straight, chest pressed forward, legs straight, and feet together in that order. Hold for time. ",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1401,
                                                "exerciseId": 185,
                                                "tag": 2,
                                                "videoName": "PfcuKtas.json?exp=1766068248554&sig=5570ffdb153cd69dfa1c5cf298886eca",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Side Lever": [
                            {
                                "exerciseId": 196,
                                "name": "Side Lever Inverted Hold",
                                "image": "SLSE4",
                                "group": "Foundation Core",
                                "exerciseNotation": "B19",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 73,
                                        "masteryLevel": "30s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "6s"
                                    },
                                    "2": {
                                        "masterySetId": 74,
                                        "masteryLevel": "30s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "6s"
                                    },
                                    "3": {
                                        "masterySetId": 75,
                                        "masteryLevel": "30s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "4": {
                                        "masterySetId": 77,
                                        "masteryLevel": "30s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "12s"
                                    },
                                    "5": {
                                        "masterySetId": 78,
                                        "masteryLevel": "30s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "18s"
                                    },
                                    "6": {
                                        "masterySetId": 79,
                                        "masteryLevel": "30s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "18s"
                                    },
                                    "7": {
                                        "masterySetId": 81,
                                        "masteryLevel": "30s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "8": {
                                        "masterySetId": 82,
                                        "masteryLevel": "30s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "30s"
                                    },
                                    "9": {
                                        "masterySetId": 83,
                                        "masteryLevel": "30s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "30s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211548,
                                "setsAndReps": "3x6s",
                                "order": 19,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Side Lever Inverted Hold",
                                        "setsAndReps": "3x6s",
                                        "imageName": "SLSE4",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 196,
                                                "description": "1) Press up strongly with the bottom arm.",
                                                "type": 1,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 196,
                                                "description": "2) Keep the hips square at the top of the movement.",
                                                "type": 1,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 196,
                                                "instructions": "Begin facing a set of stall bars and place your right hand on a rung above head height (palm down). With your left hand, a rung below hip height directly underneath (in line with) your right hand, palm up. Adjust your hands so they are centered in the middle of your body. Ensure that your arms make approximately a 120-degree angle. Some experimentation with your side lever hand position may be necessary to find the most comfortable position for your proportions. Now either kick your legs up overhead or walk your feet up the stall bars to invert your body. As you invert, straight your elbows and knees. With your body facing the stall bars, assume a hollow position with posterior pelvic tilt. Keep your legs just in front of the stall bars and push strongly through your left arm (depress) to maintain position. Hold for time before switching sides.",
                                                "equipment": "Stall Bars"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1422,
                                                "exerciseId": 196,
                                                "tag": 1,
                                                "videoName": "MgwA358Z.json?exp=1766068248554&sig=2fed4710bcee9fd8adc16356c731c9aa",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Pancake Side Static",
                                        "setsAndReps": "3x10s",
                                        "imageName": "SLSE4IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 196,
                                                "description": "1) Press strongly upward before beginning to lower to the side.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 196,
                                                "instructions": "Start sitting upright in a seated straddle on the floor with straight knees. Extend a light weight overhead, shrug your shoulders to your ears, and lock your elbows. Leading with the weight, lean to your side over your left leg. Keep your torso facing forward and shoulders fully open (biceps behind your ears). Lower down until you feel a strong stretch through the right side of your torso. Stretch your torso long across your leg rather than hunching; try to get your bottom shoulder to your knee. Also be sure keep both glutes in contact with the floor throughout. Hold for time on your left side before switching. ",
                                                "equipment": "Dumbbell, Yoga Block"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1423,
                                                "exerciseId": 196,
                                                "tag": 2,
                                                "videoName": "InhG1Su7.json?exp=1766068248554&sig=8b2ada71b0f7f2f003cda551d3fb7fcd",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ],
                        "Manna": [
                            {
                                "exerciseId": 203,
                                "name": "Elevated Reverse Plank",
                                "image": "MNSE10",
                                "group": "Foundation Core",
                                "exerciseNotation": "C19",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 85,
                                        "masteryLevel": "60s",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "12s"
                                    },
                                    "2": {
                                        "masterySetId": 86,
                                        "masteryLevel": "60s",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "12s"
                                    },
                                    "3": {
                                        "masterySetId": 87,
                                        "masteryLevel": "60s",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "24s"
                                    },
                                    "4": {
                                        "masterySetId": 89,
                                        "masteryLevel": "60s",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "24s"
                                    },
                                    "5": {
                                        "masterySetId": 90,
                                        "masteryLevel": "60s",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "36s"
                                    },
                                    "6": {
                                        "masterySetId": 91,
                                        "masteryLevel": "60s",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "36s"
                                    },
                                    "7": {
                                        "masterySetId": 93,
                                        "masteryLevel": "60s",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "48s"
                                    },
                                    "8": {
                                        "masterySetId": 94,
                                        "masteryLevel": "60s",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "60s"
                                    },
                                    "9": {
                                        "masterySetId": 95,
                                        "masteryLevel": "60s",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "60s"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211549,
                                "setsAndReps": "3x12s",
                                "order": 19,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Elevated Reverse Plank",
                                        "setsAndReps": "3x12s",
                                        "imageName": "MNSE10",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 203,
                                                "description": "1) With hands shoulder width, strongly retract the scapula while pressing the hips up to shoulder height.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 203,
                                                "instructions": "Begin seated on the floor with your feet elevated on a box, bench, or other stable object approximately 2-3 feet high. Place your hands behind you, fingers facing backward, at shoulder width. Straighten your elbows, open your chest (fully retract your scapula), and press your hips up to shoulder height. At the top, engage your glutes and be sure your body is parallel to the floor. Keep your elbows locked and shoulder blades completely pinched together as you hold for time.",
                                                "equipment": "Plyometric Box"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1436,
                                                "exerciseId": 203,
                                                "tag": 1,
                                                "videoName": "OTIZMciR.json?exp=1766068248554&sig=092d4e836dce07ff2fa99c83fee45357",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Seated Straddle Pulse",
                                        "setsAndReps": "3x30s",
                                        "imageName": "MNSE10IM",
                                        "group": "Foundation Core",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 203,
                                                "description": "1) Perform the pulses for a block of time rather than for reps.",
                                                "type": 2,
                                                "order": 1
                                            },
                                            {
                                                "exerciseId": 203,
                                                "description": "2) Keep the hands at least in front of the knees if possible.",
                                                "type": 2,
                                                "order": 2
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 203,
                                                "instructions": "Begin in a seated straddle and ensure your torso is upright. Place your hands flat on the floor between your thighs and straighten your elbows. With your elbows and knees locked (quads engaged) see if you can lift your legs off the floor. If you can't, slide your hands back (toward your groin) until you can lift your heels with straight legs. You want to reach your hands as far toward your ankles as you can while still maintaining your ability to lift your heels. Once your ideal hand position is set, lift your legs as high as possible. Now perform small reps up and down, keeping your legs high, hands fixed, and torso in place. During the set do not allow your heels to touch the floor, nor your straddle to narrow. Keep your heels held up as high as you can while you perform subtle pulses.",
                                                "equipment": "Body Only"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1437,
                                                "exerciseId": 203,
                                                "tag": 2,
                                                "videoName": "87gDR9Mb.json?exp=1766068248554&sig=3a5bc7b8e2c43a06265518d188317a5d",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                "scheduleId": 518689,
                "classId": 59213,
                "type": "Program",
                "dayIndex": 5,
                "workout": {
                    "LEVEL 1": {},
                    "LEVEL 2": {},
                    "LEVEL 3": {},
                    "LEVEL 4": {
                        "Single Leg Squat": [
                            {
                                "exerciseId": 410,
                                "name": "Lunge with 25% Additional Bodyweight",
                                "image": "FLSSE6",
                                "group": "Foundation Lower Body",
                                "exerciseNotation": "A14",
                                "stepNo": 1,
                                "masterySteps": {
                                    "1": {
                                        "masterySetId": 13,
                                        "masteryLevel": "10r",
                                        "weekNum": 1,
                                        "sets": 3,
                                        "repsOrSecs": "2r"
                                    },
                                    "2": {
                                        "masterySetId": 14,
                                        "masteryLevel": "10r",
                                        "weekNum": 2,
                                        "sets": 5,
                                        "repsOrSecs": "2r"
                                    },
                                    "3": {
                                        "masterySetId": 15,
                                        "masteryLevel": "10r",
                                        "weekNum": 3,
                                        "sets": 3,
                                        "repsOrSecs": "4r"
                                    },
                                    "4": {
                                        "masterySetId": 17,
                                        "masteryLevel": "10r",
                                        "weekNum": 5,
                                        "sets": 4,
                                        "repsOrSecs": "4r"
                                    },
                                    "5": {
                                        "masterySetId": 18,
                                        "masteryLevel": "10r",
                                        "weekNum": 6,
                                        "sets": 4,
                                        "repsOrSecs": "6r"
                                    },
                                    "6": {
                                        "masterySetId": 19,
                                        "masteryLevel": "10r",
                                        "weekNum": 7,
                                        "sets": 5,
                                        "repsOrSecs": "6r"
                                    },
                                    "7": {
                                        "masterySetId": 21,
                                        "masteryLevel": "10r",
                                        "weekNum": 9,
                                        "sets": 4,
                                        "repsOrSecs": "8r"
                                    },
                                    "8": {
                                        "masterySetId": 22,
                                        "masteryLevel": "10r",
                                        "weekNum": 10,
                                        "sets": 4,
                                        "repsOrSecs": "10r"
                                    },
                                    "9": {
                                        "masterySetId": 23,
                                        "masteryLevel": "10r",
                                        "weekNum": 11,
                                        "sets": 5,
                                        "repsOrSecs": "10r"
                                    }
                                },
                                "selected": true,
                                "usersWorkoutSettingsId": 5211552,
                                "setsAndReps": "3x2r",
                                "order": 14,
                                "isLogged": false,
                                "notes": null,
                                "workoutInfo": {
                                    "Strength": {
                                        "name": "Lunge with 25% Additional Bodyweight",
                                        "setsAndReps": "3x2r",
                                        "imageName": "FLSSE6",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 410,
                                                "description": "1) The rear knee should lightly brush the ground; do not allow it to bounce off the ground.",
                                                "type": 1,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 1,
                                                "exerciseId": 410,
                                                "instructions": "Weighted Lunge +25% Bodyweight: Using an additional 25% bodyweight, stand upright with your feet together and the weight either held in each hand or across your shoulders. Step forward with your right leg, leaving your left leg stationary. Bend your right knee to bring it directly over your toes. At the same time, bring your left knee to touch the ground gently. Keep your torso vertical throughout the movement. Strongly push back with your right leg to return to the start position. Alternate legs for each rep. Use your preference of weight–dumbbells, a barbell, plates, a sandbag, etc.",
                                                "equipment": "Barbell, Dumbbell"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1721,
                                                "exerciseId": 410,
                                                "tag": 1,
                                                "videoName": "nArlr4Ro.json?exp=1766068248556&sig=7f32cb6170cb6d92ecf09cef1ef47bd0",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    },
                                    "Mobility": {
                                        "name": "Arch Up + 10 lbs",
                                        "setsAndReps": "3x5r",
                                        "imageName": "FLSSE6IM",
                                        "group": "Foundation Lower Body",
                                        "focusPoints": [
                                            {
                                                "exerciseId": 410,
                                                "description": "1) Note the deliberate tempo of the movement; do not swing or bounce up into the reps.",
                                                "type": 2,
                                                "order": 1
                                            }
                                        ],
                                        "instructions": [
                                            {
                                                "type": 2,
                                                "exerciseId": 410,
                                                "instructions": "Lie prone over a support that allows your torso to hang freely when it is set at the crease of your hips. With 10 pounds held to your chest (in the form of a plate is the most effective), begin with your torso hanging, hips bent to 90-degrees. Anchor your feet down by having someone or something hold them in place. Now pull against your foot anchor to raise your torso as high as possible, arching your spine as you lift past parallel. Pause at the top in your best arch, lower back down with control, and repeat for reps.",
                                                "equipment": "Weight Plate, Plyometric Box, Stall Bars, Back Strap"
                                            }
                                        ],
                                        "videos": [
                                            {
                                                "exercisesVideoId": 1722,
                                                "exerciseId": 410,
                                                "tag": 2,
                                                "videoName": "uOgTsSEf.json?exp=1766068248556&sig=76a6a9a134faa243ee4c670f6db95e9c",
                                                "weekNum": 0,
                                                "order": 1
                                            }
                                        ],
                                        "technicalTips": null
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ],
        "SATURDAY,DECEMBER 20": [
            {
                "scheduleId": 518690,
                "classId": 59210,
                "type": "Class",
                "dayIndex": 6,
                "workout": {
                    "className": "Middle Split",
                    "trainingType": "Stretch",
                    "mediaId": "JatJjiFp.json?exp=1766068248556&sig=91c30c963a627934ca10f007cdc91a07",
                    "image": "stretch-middle-split.jpg",
                    "description": "Everyone can start building the mobility necessary for the middle splits and pancake–no matter what your flexibility level is! This 45-minute sequence will help you find relief and develop flexibility throughout your lower body.",
                    "isLogged": false
                }
            }
        ],
        "SUNDAY,DECEMBER 21": null
    }

    const state = getState();
    const { levelId, timezone } = state.login;
    let data = {}
    data = levelId == 1 ? { ...intermediateOne } : levelId == 2 ? { ...intermediateTwo } : levelId == 3 ? { ...advancedOne } : { ...advancedTwo };
    const firstAndLast = [getCalanderDate(timezone, 'MMMM DD YYYY')[0], getCalanderDate(timezone, 'MMMM DD YYYY')[6]];
    const dates = [];
    const start = new Date(firstAndLast[0]);
    const end = new Date(firstAndLast[1]);

    while (start <= end) {
        dates.push(start.toLocaleString('en-US', { weekday: 'long', month: 'long', day: '2-digit' }));
        start.setDate(start.getDate() + 1);
    }
    Object.keys(data).forEach((key, index) => {
        data[dates[index]] = data[key]; //create new key
        delete data[key]; //delete old key
    });
    dispatch(updateData(data))
    return data
}

export const updateData = (data) => (dispatch, getState) => {

    // let data = dispatch(getData())
    const state = getState();

    const { UserId, levelId } = state.login;
    const { userSchedule } = state.levels;
    let workoutSchedule = data ? _.cloneDeep(data) : {};
    let userData = {
        userId: UserId,
        type: "levelPath"
    }
    Axios.get(NEWAPI + '/api/user/userStatus', {
        params: userData
    }, config)
        .then(res => {
            console.log("res is:", res)
            let logs = res.data.filter(obj => obj.logs).map(obj => obj.logs)[0];//getting only the logs from response data
            let newData = {}
            logs.map((log) => {
                newData[log.userScheduleDate] = log.data
            })
            const commonDates = Object.keys(data).filter(key => key in newData);


            //simple class update
            commonDates.forEach(date => {
                newData[date].forEach(newItem => {//data in db
                    const orgItem = data[date].find(item =>
                        item.scheduleId === newItem.scheduleId && item.classId === newItem.classId
                    );
                    if (orgItem) {//class or program in log data type that matched original data
                        if (newItem.type === "Class") {
                            
                            let newLogValue = newItem?.isLogged ? newItem?.isLogged : newItem?.workout?.isLogged
                            orgItem.workout.isLogged = newLogValue
                        } else if (newItem.type === "Program") {
                            orgItem.workout = newItem.workout;
                        }
                    } else {//program type with chosenprogs structure
                        if (newItem.type === "Program") {
                            newItem?.chosenProgs?.forEach(prog => {
                                let exerciseId = prog.exerciseId
                                let sectionName = prog.section
                                data[date].forEach(item => {
                                    if (item.type == "Program" && `LEVEL ${levelId}` in item.workout) {
                                        let orgExercise = item?.workout[`LEVEL ${levelId}`][sectionName]
                                        if (orgExercise) {
                                            if (exerciseId = orgExercise[0].exerciseId) {
                                                orgExercise[0] = prog
                                            }
                                        }
                                    }
                                })
                            })
                        }

                    }
                });
                let workouts = workoutSchedule[date] ? workoutSchedule[date] : [];
                workoutSchedule[date] = workouts.map(processUserWorkoutNew);
            });
            // console.log("data is->>>:", data)
            // console.log("workoutSchedule is->>>:", workoutSchedule)
            dispatch({ type: actionTypes.SET_ALL_DATA, data: { allData: data, workoutSchedule: workoutSchedule } })
            return data

        }).catch(error => {
            console.log("error is:", error)
        })

}
const processUserWorkoutNew = workout => {

    if (workout.type === 'Class') {
        let workOutData = {}
        if (workout?.workout) {
            workOutData = { ...workout.workout, showRefresh: showRefreshArray.includes(workout.workout.trainingType) };
            delete workout.workout;
        }
        return {
            ...workout,
            ...workOutData
        }
    }

    if (workout.type === 'Program') {
        return proccesLegacyCoursesNew(workout);
    }
}
export const proccesLegacyCoursesNew = (data) => {

    const { workout = {} } = data;
    let levelKeys = Object.keys(workout);
    let chosenProgs = [];
    let groupName;

    const idToClassName = {
        59207: 'Foundation Core',
        59219: 'Foundation Upper Body',
        59213: 'Foundation Lower Body'
    }

    levelKeys.forEach(lKey => {
        // console.log("lKey:", lKey)
        let progKeys = workout[lKey] ? Object.keys(workout[lKey]) : [];

        progKeys.forEach(pKey => {
            let progessions = workout[lKey][pKey];
            groupName = checkGroup(progessions);
            progessions.forEach(prog => {
                chosenProgs = [...chosenProgs, { ...prog, section: pKey, levelKey: lKey }]
            })
        })
    });

    if (!groupName) {
        groupName = idToClassName[data.classId]
    }
    return { chosenProgs: chosenProgs, isLegacy: true, category: groupName };
}