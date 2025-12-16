import firebase from "firebase/app";

import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyD6RVzt3rj-g2YjavzPtqR0qa3gSjzUDEU",
  authDomain: "gymfit-project.firebaseapp.com",
  databaseURL: "https://gymfit-project.firebaseio.com",
  projectId: "gymfit-project",
  storageBucket: "gymfit-project.appspot.com",
  messagingSenderId: "622269109093",
  appId: "1:622269109093:web:23d3d351af94ac4213478c"
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();

export default firebase;
