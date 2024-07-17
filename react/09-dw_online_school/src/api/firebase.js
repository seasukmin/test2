import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyPjAeV6FrNHtAudjn_DtR2LjSnAKrGAU",
  authDomain: "dwos-fc6ea.firebaseapp.com",
  projectId: "dwos-fc6ea",
  storageBucket: "dwos-fc6ea.appspot.com",
  messagingSenderId: "238525684313",
  appId: "1:238525684313:web:2fdf50a389f0bef1412f48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return resultData;
}

export { getDatas };
