// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv13AJKA2bVK9-f1d37XG0c5c_98KD51Y",
  authDomain: "podcast-project-react.firebaseapp.com",
  projectId: "podcast-project-react",
  storageBucket: "podcast-project-react.appspot.com",
  messagingSenderId: "911570881847",
  appId: "1:911570881847:web:6b87d3419f537bdef4deb2",
  measurementId: "G-JP3KCWKENN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
const auth  = getAuth(app);

export { auth,storage,db };