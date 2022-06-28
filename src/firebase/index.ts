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
} from 'firebase/firestore';

import { auth } from '../config/firebase';

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

  handleAddDoc = async (
    documentKey: string,
    collection: string,
    document: string,
    data: object[]
  ) => {
    const docRef = doc(this.db, collection, document);
    await updateDoc(docRef, {
      [documentKey]: data,
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
      [documentKey]: arrayUnion(data),
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
      onSuccess?.();
    } catch (error: any) {
      onError?.(error);
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
