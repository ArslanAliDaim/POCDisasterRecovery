// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCCwnuMCMNCQwksaEDRj5XwypwtqoiiKo",
  authDomain: "hello-notification-a9d9e.firebaseapp.com",
  projectId: "hello-notification-a9d9e",
  storageBucket: "hello-notification-a9d9e.appspot.com",
  messagingSenderId: "522548358585",
  appId: "1:522548358585:web:9d17aeba9b141dfe4cda68",
  measurementId: "G-SC38JJZM2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
