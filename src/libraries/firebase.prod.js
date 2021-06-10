//.prod => production

import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";

//Seeding must be done only once!!!

const config = {
  apiKey: "AIzaSyDidiDgJDlbMZnJwnQUlrrgr9OlibnXV50",
  authDomain: "netflix-6da58.firebaseapp.com",
  projectId: "netflix-6da58",
  storageBucket: "netflix-6da58.appspot.com",
  messagingSenderId: "737320297485",
  appId: "1:737320297485:web:5423901b9f13bebcdde144",
};

const firebase = Firebase.initializeApp(config);

// seedDatabase(firebase);

export { firebase };
