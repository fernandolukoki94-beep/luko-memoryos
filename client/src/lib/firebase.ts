import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getDatabase, Database } from "firebase/database";

// Firebase configuration provided by user
const firebaseConfig = {
  apiKey: "AIzaSyBFZU9l6mJFMQsNEUM0E7Juva24s55_O4A",
  authDomain: "luko-e7095.firebaseapp.com",
  projectId: "luko-e7095",
  storageBucket: "luko-e7095.firebasestorage.app",
  messagingSenderId: "434490396983",
  appId: "1:434490396983:web:d23f19f9fa2ba53551cab2",
  measurementId: "G-W59Q9NC4S3",
  databaseURL: "https://luko-e7095-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const realtimeDb: Database = getDatabase(app);

export default app;
