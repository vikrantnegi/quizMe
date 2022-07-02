import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import {
  arrayUnion,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  collection,
  setDoc,
} from 'firebase/firestore';

import { auth } from '../config/firebase';
import { quizCollectionTypes } from '../constants/Constants';

export type AuthEventError = {
  code: string;
  message: string;
};

class firebaseManager {
  db: Firestore;
  user: User | null = null;

  constructor() {
    this.db = getFirestore();
  }

  handleAddObjToDoc = async (
    documentKey: string,
    collection: string,
    document: string,
    data: object
  ) => {
    const docRef = doc(this.db, collection, document);
    await updateDoc(docRef, {
      [documentKey]: data,
    });
  };

  handleAddArrayToDoc = async (
    documentKey: string,
    collectionName: string,
    documentName: string,
    data: object
  ) => {
    const docRef = doc(this.db, collectionName, documentName);
    await updateDoc(docRef, {
      [documentKey]: arrayUnion(data),
    });
  };

  handleUpdateDoc = async (
    documentKey: string,
    collectionName: string,
    documentName: string,
    data: object
  ) => {
    const docRef = doc(this.db, collectionName, documentName);

    await updateDoc(docRef, {
      [documentKey]: data,
    });
  };

  getDoc = async (collectionName: string, documentName: string) => {
    const docRef = doc(this.db, collectionName, documentName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  getAllDocFromCollection = async (collectionName: string) => {
    const quizCollectionSnapshot = await getDocs(collection(this.db, collectionName));
    return quizCollectionSnapshot;
  };

  authChangeListener = (onSuccess: (user: User) => void, onError: (user: null) => void) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        onSuccess?.(user);
        this.user = user;
      } else {
        // User is signed out
        this.user = null;
        onError?.(null);
      }
    });
  };

  createUserUsingEmail = async (
    email: string,
    password: string,
    onSuccess: () => void,
    onError: (error: AuthEventError) => void
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      this.user = userCredentials.user;
      this.createUserCollection();
      onSuccess?.();
    } catch (error: any) {
      onError?.(error);
    }
  };

  createUserCollection = async () => {
    // TODO: Add feature to  avoid adding same user to database  multiple times
    if (this.user?.uid) {
      try {
        await setDoc(doc(this.db, quizCollectionTypes.users, this.user?.uid), {
          uid: this.user?.uid,
          email: this.user?.email,
          emailVerified: this.user?.emailVerified,
          isAnonymous: this.user?.isAnonymous,
          providerData: this.user?.providerData,
          createdAt: this.user?.metadata.creationTime,
          lastLoginAt: this.user?.metadata.lastSignInTime,
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log('User is not signed in');
    }
  };

  signInUsingEmail = async (
    email: string,
    password: string,
    onSuccess: () => void,
    onError: (error: AuthEventError) => void
  ) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      this.user = userCredentials.user;
      onSuccess?.();
    } catch (error: any) {
      onError?.(error);
    }
  };

  signOut = () => {
    auth.signOut();
  };
}

export default new firebaseManager();
