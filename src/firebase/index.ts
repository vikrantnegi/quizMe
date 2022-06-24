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

class firebaseManager {
  db: Firestore;

  constructor() {
    this.db = getFirestore();
  }

  handleAddDoc = async (collection: string, document: string, data: []) => {
    const docRef = doc(this.db, collection, document);
    await updateDoc(docRef, {
      questions: data,
    });
  };

  handleUpdateDoc = async (collectionName: string, documentName: string, data: object) => {
    const docRef = doc(this.db, collectionName, documentName);
    await updateDoc(docRef, {
      questions: arrayUnion(data),
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

  getCollection = async (collectionName: string) => {
    const quizCollectionSnapshot = await getDocs(collection(this.db, collectionName));
    return quizCollectionSnapshot;
  };
}

export default new firebaseManager();
