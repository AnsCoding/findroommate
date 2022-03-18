import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN8fTsJ79KBpMqGJwH7X6Yisg0JRujFSE",
  authDomain: "roommate-29e88.firebaseapp.com",
  projectId: "roommate-29e88",
  storageBucket: "roommate-29e88.appspot.com",
  messagingSenderId: "218841412128",
  appId: "1:218841412128:web:1ad17d7f7f437568a1c245",
  measurementId: "G-8KR09HF38Q",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const usersRef = collection(db, "users");
export const postsRef = collection(db, "posts");
