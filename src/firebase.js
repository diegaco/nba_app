import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAocvkEJfE_9TxKbKaE-qRY89qR61DtdPs",
  authDomain: "nba-app-a4b78.firebaseapp.com",
  databaseURL: "https://nba-app-a4b78.firebaseio.com",
  projectId: "nba-app-a4b78",
  storageBucket: "nba-app-a4b78.appspot.com",
  messagingSenderId: "504861362885"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

const firebaseArticles = firebaseDB.ref("articles");
const firebaseTeams = firebaseDB.ref("teams");
const firebaseVideos = firebaseDB.ref("videos");

const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
};
