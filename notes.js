/*GW*/
function gw() {
    //https://api.gymnasticbodies.com/auth/refreshToken
    let response1 = {
        "authorizationToken": "eyJhbGciOiJIUzUxMiJ9.eyJmbmFtZSI6IkciLCJzdWIiOiJnd0B0bGNoYXR0LmNvbSIsImxuYW1lIjoiVyIsInR6IjoiQW1lcmljYS9OZXdfWW9yayIsInRhZ2lkcyI6W10sImV4cCI6MTc2NDY5NjQ2NCwiaWF0IjoxNzY0NjEwMDY0LCJjaWQiOjQzMDA4M30.r406icbF6ak44SkDytQmeI4-AU89oYFOlNiGS5Y_fe6qmFx3Xi9u0YMtZxGNVGdjd4nhiO_TjpApGFK3UzkmZA",
        "isAllAccessUser": false,
        "timezone": "America/New_York",
        "hasCourseProduct": false,
        "isFreeMember": false
    }

    //https://api.gymnasticbodies.com/welcome/v1/users
    let response2 = {
        "fname": "G",
        "lname": "W",
        "contactId": 430083,
        "emailId": "gw@tlchatt.com",
        "isAllAccessUser": false,
        "isThriveUser": false,
        "isAdmin": false,
        "playerScript": "?exp=1764610068104&sig=927ec0bd8ae475ce7120e58d24d235e6",
        "guidedPlanAccessLevels": [],
        "userLevel": "My Courses",
        "levelId": 11
    }


    //https://api.gymnasticbodies.com/byo/workout/my-courses/users/430083
    let response3 = { "courses": [], "dayIndex": 0 }

    //https://api.gymnasticbodies.com/myschedule/beginner/view/weekly/users/430083
    //Permission Denied.Not an authorized user.

}


/*Luke*/

function luke() {
    //https://api.gymnasticbodies.com/auth
    let response1 = {
        "jwtAuthorizationToken": "eyJhbGciOiJIUzUxMiJ9.eyJmbmFtZSI6Ikx1a2UiLCJzdWIiOiJsdWtlc2VhcnJhQGljbG91ZC5jb20iLCJsbmFtZSI6IiIsInR6IjoiQW1lcmljYS9Ub3JvbnRvIiwidGFnaWRzIjpbMTAyLDEyMiwyMjQsMjI2LDIyOCwzMzAsNDQ2LDYxMiw2MTYsNjIwLDYzMiw2OTgsNzg4LDEwMzYsMTMwMV0sImV4cCI6MTc2NDY5NjYyNSwiaWF0IjoxNzY0NjEwMjI1LCJjaWQiOjQxMTg0N30.FpkIFCLMTpqW6v6Ta-vVAk8CPiX5FB1jM-O6mqZ2UWiclK8FFrW6oA_M3uxQXmbo_yngps2-ShwegnDV_5OIGA",
        "jwtRefreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJhbGxhY2Nlc3MiOnRydWUsInN1YiI6Imx1a2VzZWFycmFAaWNsb3VkLmNvbSIsInR6IjoiQW1lcmljYS9Ub3JvbnRvIiwiZnJlZW1lbSI6dHJ1ZSwidHlwZSI6InJlZnJlc2giLCJleHAiOjE3ODAxNjIyMjUsInNwIjp0cnVlLCJpYXQiOjE3NjQ2MTAyMjUsImNpZCI6NDExODQ3fQ.pJMO3lxzI8EEW8UY-gPlWmyCKQazXw4lu7SU6PnNc_rU6GQlQU2t0Zr_ctTau_udhTyHYp1gxOCIZxen0ZlpMA",
        "timezone": "America/Toronto",
        "isAllAccessUser": true,
        "isFreeMember": true,
        "hasCourseProduct": true
    }


    //https://api.gymnasticbodies.com/auth/refreshToken
    let response2 = {
        "authorizationToken": "eyJhbGciOiJIUzUxMiJ9.eyJmbmFtZSI6Ikx1a2UiLCJzdWIiOiJsdWtlc2VhcnJhQGljbG91ZC5jb20iLCJsbmFtZSI6IiIsInR6IjoiQW1lcmljYS9Ub3JvbnRvIiwidGFnaWRzIjpbMTAyLDEyMiwyMjQsMjI2LDIyOCwzMzAsNDQ2LDYxMiw2MTYsNjIwLDYzMiw2OTgsNzg4LDEwMzYsMTMwMV0sImV4cCI6MTc2NDY5NjcxOSwiaWF0IjoxNzY0NjEwMzE5LCJjaWQiOjQxMTg0N30.1xmAR0DQouSyZtSkM1p0PYcAfFcqWwcYWcYgthZGDdveDZLB-9lG9Qomi14VW1xFVXRcR0wvcikhkLhA_zzq3Q",
        "isAllAccessUser": true,
        "timezone": "America/Toronto",
        "hasCourseProduct": true,
        "isFreeMember": true
    }

    //https://api.gymnasticbodies.com/welcome/v1/users
    let response3 = {
        "fname": "Luke",
        "lname": "",
        "contactId": 411847,
        "emailId": "lukesearra@icloud.com",
        "isAllAccessUser": true,
        "isThriveUser": true,
        "isAdmin": false,
        "playerScript": "?exp=1764610361483&sig=36efbefa3f0dd81bdcb6df6e779e1b13",
        "guidedPlanAccessLevels": [
            0,
            1,
            2,
            3,
            4
        ],
        "userLevel": "Intermediate Two",
        "levelId": 2
    }

    //https://api.gymnasticbodies.com/myschedule/beginner/view/weekly/users/411847
    let response4 = {
        "MONDAY,DECEMBER 1": {
            "scheduleId": 31595,
            "workoutId": 3,
            "classesList": [
                {
                    "classId": 59600,
                    "className": "7 Minute Warm-Up",
                    "trainingType": "Warm-Up",
                    "mediaId": "jTRUtQhq.json?exp=1764610361740&sig=461dbb24a3fb5a3d52343c95e67e16f0",
                    "image": "330x220-7min.jpg",
                    "caption": null,
                    "isLogged": false,
                    "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work."
                },
                {
                    "classId": 59526,
                    "className": "Crab/Ape",
                    "trainingType": "Fundamentals",
                    "mediaId": "J6YVXB0m.json?exp=1764610361740&sig=832be899708dd17002ba1f4e318f7783",
                    "image": "Fundamentals-Posters.jpg",
                    "caption": "3x Walk 25 ft ",
                    "isLogged": false,
                    "description": "Learn to execute the crab and ape movements. The crab position will test your shoulder extension mobility while the ape exercise will assess your ankle and hip range. Both of these movements will have you working into your best variation of the exercise, and moving across the floor in the positions."
                },
                {
                    "classId": 59528,
                    "className": "Body Orientations",
                    "trainingType": "Fundamentals",
                    "mediaId": "WA2YRETv.json?exp=1764610361740&sig=d08a8386d29287dae28247dbb7330069",
                    "image": "Fundamentals-Posters2.jpg",
                    "caption": "Hold 3x30 sec",
                    "isLogged": false,
                    "description": "You’ll become proficient in four new body positions: front support, rear support, supine, and prone. Knowing what these terms mean, and practicing their shapes, will prepare you to use them as building blocks in more advanced movements"
                },
                {
                    "classId": 59530,
                    "className": "Wrist Mobility",
                    "trainingType": "Fundamentals",
                    "mediaId": "ShsIhtjD.json?exp=1764610361740&sig=4cc97a299041dbfe2556999e61776645",
                    "image": "Fundamentals-Posters3.jpg",
                    "caption": "Follow Along",
                    "isLogged": false,
                    "description": "In this lesson, you’ll move your wrists through a sequence of stretches created to help you regain your full movement ability in these key joints. When done consistently, these mobilities will prepare the wrists to be healthy and strong, even with additional pressure and load from movements like push-ups."
                },
                {
                    "classId": 59873,
                    "className": "Bands Elbow & Wrist",
                    "trainingType": "Bands",
                    "mediaId": "WGwT0Sv5.json?exp=1764610361740&sig=f87c69948f73ecace7ad51f98d413541",
                    "image": "330x220-Elbows-WristsBands-1.jpg",
                    "caption": null,
                    "isLogged": false,
                    "description": null
                },
                {
                    "classId": 59251,
                    "className": "Thoracic",
                    "trainingType": "Restore",
                    "mediaId": "4hoH3sAq.json?exp=1764610361740&sig=3eb1f355ad5c5c0073c02a682ea86e42",
                    "image": "restore-thoracic-330x2206.jpg",
                    "caption": null,
                    "isLogged": false,
                    "description": "In just 10 minutes, you can begin building essential range of motion for healthy daily movement as well as mobility in the thoracic spine, a first step if bridge work is on your horizon."
                }
            ]
        },
        "TUESDAY,DECEMBER 2": {
            "scheduleId": 31772,
            "workoutId": 4,
            "classesList": [
                {
                    "classId": 59600,
                    "className": "7 Minute Warm-Up",
                    "trainingType": "Warm-Up",
                    "mediaId": "jTRUtQhq.json?exp=1764610361742&sig=f4ece6b7484d0f797a6712d8511c5b60",
                    "image": "330x220-7min.jpg",
                    "caption": null,
                    "isLogged": false,
                    "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work."
                },
                {
                    "classId": 59526,
                    "className": "Crab/Ape",
                    "trainingType": "Fundamentals",
                    "mediaId": "J6YVXB0m.json?exp=1764610361742&sig=2e5a32e0bfe43cff3aaf695022c69db6",
                    "image": "Fundamentals-Posters.jpg",
                    "caption": "3x Walk 25 ft ",
                    "isLogged": false,
                    "description": "Learn to execute the crab and ape movements. The crab position will test your shoulder extension mobility while the ape exercise will assess your ankle and hip range. Both of these movements will have you working into your best variation of the exercise, and moving across the floor in the positions."
                },
                {
                    "classId": 59528,
                    "className": "Body Orientations",
                    "trainingType": "Fundamentals",
                    "mediaId": "WA2YRETv.json?exp=1764610361742&sig=9ea0c326fd68c28009d95d689ff4dc0a",
                    "image": "Fundamentals-Posters2.jpg",
                    "caption": "Hold 3x30 sec",
                    "isLogged": false,
                    "description": "You’ll become proficient in four new body positions: front support, rear support, supine, and prone. Knowing what these terms mean, and practicing their shapes, will prepare you to use them as building blocks in more advanced movements"
                },
                {
                    "classId": 59530,
                    "className": "Wrist Mobility",
                    "trainingType": "Fundamentals",
                    "mediaId": "ShsIhtjD.json?exp=1764610361742&sig=b42821ef29df25daa15f31b88fdb9c82",
                    "image": "Fundamentals-Posters3.jpg",
                    "caption": "Follow Along",
                    "isLogged": false,
                    "description": "In this lesson, you’ll move your wrists through a sequence of stretches created to help you regain your full movement ability in these key joints. When done consistently, these mobilities will prepare the wrists to be healthy and strong, even with additional pressure and load from movements like push-ups."
                },
                {
                    "classId": 59532,
                    "className": "Body Positions",
                    "trainingType": "Fundamentals",
                    "mediaId": "5XTTWF9G.json?exp=1764610361742&sig=d08e43d61ff316ba9a3758e5c7f2c2a2",
                    "image": "Fundamentals-Posters4.jpg",
                    "caption": "Hold 3x30 sec",
                    "isLogged": false,
                    "description": "You’ll learn the positioning for a straight body, a tuck, a straddle, and a pike. These four movements serve as the base for many stretches and core exercises, so take your time getting comfortable with them!"
                },
                {
                    "classId": 59263,
                    "className": "Hamstring",
                    "trainingType": "Restore",
                    "mediaId": "XfFTWgh1.json?exp=1764610361742&sig=ae0541a749e04afadd960f68b1d08eee",
                    "image": "restore-hamstrings-330x2203.jpg",
                    "caption": null,
                    "isLogged": false,
                    "description": "Develop balance, prevent common issues such as hip and low back pain, and create better posture by spending 10 minutes focusing on hamstring health!"
                },
                {
                    "classId": 59286,
                    "className": "Ankle/Knee",
                    "trainingType": "Restore",
                    "mediaId": "ti9rOyVr.json?exp=1764610361742&sig=247fd0f8839238483f9347ea6a3071d3",
                    "image": "restore-ankle-knee-330x2202.jpg",
                    "caption": null,
                    "isLogged": false,
                    "description": "Support your knees and ankles with this 10-minute course. Learn to squat, stand, crouch, jump, and walk with less effort, all while preventing common issues, like ankle rolling and chronic knee pain."
                }
            ]
        },
        "WEDNESDAY,DECEMBER 3": {
            "scheduleId": null,
            "workoutId": 5,
            "classesList": null
        },
        "THURSDAY,DECEMBER 4": {
            "scheduleId": null,
            "workoutId": 5,
            "classesList": null
        },
        "FRIDAY,DECEMBER 5": {
            "scheduleId": null,
            "workoutId": 5,
            "classesList": null
        },
        "SATURDAY,DECEMBER 6": {
            "scheduleId": null,
            "workoutId": 5,
            "classesList": null
        },
        "SUNDAY,DECEMBER 7": {
            "scheduleId": null,
            "workoutId": 5,
            "classesList": null
        }
    }
    //https://api.gymnasticbodies.com/auto-pilot/view/weekly/users/411847
    let response5 = {
        "firstName": "Luke",
        "lastName": "",
        "startDate": "2025-12-01",
        "endDate": "2025-12-07",
        "todaysDate": "2025-12-01",
        "dayView": {
            "MONDAY,DECEMBER 1": {
                "favoriteId": null,
                "exerciseListForDay": [
                    {
                        "category": "Mobility",
                        "exerciseName": "Over Grip 1 Arm Pull",
                        "autoPilotExerciseId": 261,
                        "imageUrl": "RCPE10IM.jpg",
                        "repsOrSecs": "5r",
                        "autoPilotId": 76493,
                        "levelId": 2,
                        "rounds": 3,
                        "isLogged": false,
                        "exerciseFocusPoints": [
                            {
                                "description": "1) To rise pull down on the bar with a locked straight arm.",
                                "descOrder": 1
                            },
                            {
                                "description": "2) The feet are to be used for secondary assistance only.",
                                "descOrder": 2
                            }
                        ],
                        "videos": [
                            {
                                "mediaId": "4NlJaMuH.json?exp=1764615596690&sig=c15c5732193fece3b56aacdb29b8f9ec",
                                "version": "a"
                            },
                            {
                                "mediaId": "lpkneAMR.json?exp=1764615596690&sig=51676b9e81bf82a660a3d9a238c6d64b",
                                "version": "b"
                            }
                        ]
                    },
                    {
                        "category": "Core",
                        "exerciseName": "Negative Straddle Body Lever",
                        "autoPilotExerciseId": 7,
                        "imageUrl": "FLPE7.jpg",
                        "repsOrSecs": "5r",
                        "autoPilotId": 76494,
                        "levelId": 2,
                        "rounds": 3,
                        "isLogged": false,
                        "exerciseFocusPoints": [
                            {
                                "description": "1) Do not allow the lower back to arch during the descent.",
                                "descOrder": 1
                            },
                            {
                                "description": "2) The arms should be comfortably bent.",
                                "descOrder": 2
                            }
                        ],
                        "videos": [
                            {
                                "mediaId": "nDMSaXVK.json?exp=1764615596691&sig=cf4040c0ff9694ddd05dd435bf01f7ce",
                                "version": "a"
                            }
                        ]
                    },
                    {
                        "category": "Push",
                        "exerciseName": "Russian Dip",
                        "autoPilotExerciseId": 88,
                        "imageUrl": "HBPPE11.jpg",
                        "repsOrSecs": "5r",
                        "autoPilotId": 76495,
                        "levelId": 2,
                        "rounds": 3,
                        "isLogged": false,
                        "exerciseFocusPoints": [
                            {
                                "description": "1) Descend completely to the bottom of the dip before lowering backward to the upper arm support.",
                                "descOrder": 1
                            }
                        ],
                        "videos": [
                            {
                                "mediaId": "8DzSEYis.json?exp=1764615596691&sig=2120dd5baa42d062fb0f32b7e1441556",
                                "version": "a"
                            }
                        ]
                    },
                    {
                        "category": "Pull",
                        "exerciseName": "Bulgarian L Pull-Up",
                        "autoPilotExerciseId": 137,
                        "imageUrl": "RCPE12.jpg",
                        "repsOrSecs": "5r",
                        "autoPilotId": 76496,
                        "levelId": 2,
                        "rounds": 3,
                        "isLogged": false,
                        "exerciseFocusPoints": [
                            {
                                "description": "1) The addition of the L-sit precludes the torso from tilting forwards during the ascent.",
                                "descOrder": 1
                            }
                        ],
                        "videos": [
                            {
                                "mediaId": "IH0GvG4N.json?exp=1764615596692&sig=29961a51fef777d8f03ebdc8401faeaf",
                                "version": "a"
                            }
                        ]
                    },
                    {
                        "category": "Legs",
                        "exerciseName": "Speed Skater Squat",
                        "autoPilotExerciseId": 160,
                        "imageUrl": "SLSPE8.jpg",
                        "repsOrSecs": "5r",
                        "autoPilotId": 76497,
                        "levelId": 2,
                        "rounds": 3,
                        "isLogged": false,
                        "exerciseFocusPoints": [
                            {
                                "description": "1) The rear knee and foot touch simultaneously.",
                                "descOrder": 1
                            },
                            {
                                "description": "2) Gently touch the ground; do not bounce off the knee.",
                                "descOrder": 2
                            }
                        ],
                        "videos": [
                            {
                                "mediaId": "J9JHQo4h.json?exp=1764615596692&sig=74794302c8c5b9094020dbe515c9b5e1",
                                "version": "a"
                            }
                        ]
                    }
                ]
            },
            "TUESDAY,DECEMBER 2": null,
            "WEDNESDAY,DECEMBER 3": null,
            "THURSDAY,DECEMBER 4": null,
            "FRIDAY,DECEMBER 5": null,
            "SATURDAY,DECEMBER 6": null,
            "SUNDAY,DECEMBER 7": null
        }
    }

    //https://api.gymnasticbodies.com/myschedule/levels/lastViewed/users/411847
    let response6={"lastLoginLevel":2}
//https://api.gymnasticbodies.com/myschedule/choose/continue/level/2/users/411847
let response7 = {"userLevel":"Intermediate Two","levelId":2}

}
