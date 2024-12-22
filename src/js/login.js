import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { getDoc, doc, setDoc } from 'firebase/firestore';

import { db, auth } from './firebaseConfig';

import { dynRefs } from './dynamicRefs';
import 'notiflix/dist/notiflix-3.2.7.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// // // // // // // // // // // // //

export function singUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      postData(
        {
          watched: [],
          queue: [],
        },
        user.uid
      );
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      Notify.failure(errorMessage);
      // ..
    });
}

export function singIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {})
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure(errorMessage);
    });
}

export function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      Notify.failure("Something went wrong");
    });
}

export async function getData() {
  try {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.dataFromDB = JSON.stringify(docSnap.data());
      return docSnap.data();
    } else {
      Notify.warning("Empty database");
    }
  } catch (e) {
    Notify.failure("Something went wrong");
  }
}

export async function postData(usersFilmsObj, uid = auth.currentUser.uid) {
  try {
    const userData = doc(db, 'users', uid);

    await setDoc(userData, usersFilmsObj, { merge: true });

  } catch (e) {
    console.error('Error adding document: ', e);
    Notify.failure("Something went wrong, data not saved");
  }
}

export function authObserver(fncLogIn, fncNotLog) {
  onAuthStateChanged(auth, user => {
    if (user) {

      getData().then(e => {
        localStorage.dataFromDB = JSON.stringify(e);
        if (fncLogIn) {
          fncLogIn.forEach(element => element());
        }
      });
    } else {
      const { notLoggedIn, loggedIn } = dynRefs();
      if (fncNotLog) {
        fncNotLog.forEach(func => func());
      }

      localStorage.removeItem('dataFromDB');
      //usersFilms = localStorage.getItem('usersFilms');
    }
  });
}