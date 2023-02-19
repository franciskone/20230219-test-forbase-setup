// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  REACT_APP_apiKey: apiKey,
  REACT_APP_authDomain: authDomain,
  REACT_APP_projectId: projectId,
  REACT_APP_storageBucket: storageBucket,
  REACT_APP_messagingSenderId: messagingSenderId,
  REACT_APP_appId: appId,
  REACT_APP_measurementId: measurementId,
  REACT_APP_dbName: dbName,
} = process.env

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const DB_NAME = dbName || "test-db"

export const addItem = async (title, description) => {
  try {
    const docRef = await addDoc(collection(db, DB_NAME), {
      title,
      description,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

