// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const {
  REACT_APP_apiKey: apiKey,
  REACT_APP_authDomain: authDomain,
  REACT_APP_projectId: projectId,
  REACT_APP_storageBucket: storageBucket,
  REACT_APP_messagingSenderId: messagingSenderId,
  REACT_APP_appId: appId,
  REACT_APP_measurementId: measurementId,
  REACT_APP_collectionName: collectionName,
  REACT_APP_testEmail: testEMail,
  REACT_APP_testPw: testPW
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
const auth = getAuth(app);

const COLLECTION_NAME = collectionName || "test-collection"

export const addItem = async (title, description) => {
  try {
    debugger
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      title,
      description,
      author_uid: auth.currentUser.uid
    });

    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getNotesLive = (onNewValue) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("author_uid", "==", auth.currentUser?.uid || null)
  );
  const unsub = onSnapshot(q, (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach((doc) => {
      const { title, description } = doc.data()

      notes.push({
        title,
        description,
      });
    });

    onNewValue(notes)
  });

  return unsub
}

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (e) {
    console.log(e)
    return null
  }
}

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (e) {
    console.log(e)
    return null
  }
}


