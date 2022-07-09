// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "../../../config";
require('firebase/auth');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${config.API_KEY_FIREBASE}`,
  authDomain: `${config.AUTH_DOMAIN_FIREBASE}`,
  projectId: `${config.PROJECT_ID_FIREBASE}`,
  storageBucket: `${config.STORAGE_BUCKET_FIREBASE}`,
  messagingSenderId: `${config.MESSAGING_SENDER_ID_FIREBASE}`,
  appId: `${config.APP_ID_FIREBASE}`,
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

export { auth, app };