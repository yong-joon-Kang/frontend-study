import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBerCXH1wAfPr2xbezVy5f7f7vUmTdKfBU",
  authDomain: "frontend-yongjunkang.firebaseapp.com",
  projectId: "frontend-yongjunkang",
  storageBucket: "frontend-yongjunkang.appspot.com",
  messagingSenderId: "364128568518",
  appId: "1:364128568518:web:81324eaa30d09f7dc403c7",
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
