import { collection, getFirestore } from "firebase/firestore"
import { app } from "./firebase";

// // Initialize Cloud Firestore through Firebase
// const firestore = firebase.firestore();
const db = getFirestore(app);
const usersCollection = collection(db, "users");

export {db, usersCollection};
