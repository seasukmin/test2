import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCREEdi1EUrARen8jLYiZXP1o7mOkdj1lc",
  authDomain: "myproject-8e5f0.firebaseapp.com",
  projectId: "myproject-8e5f0",
  storageBucket: "myproject-8e5f0.appspot.com",
  messagingSenderId: "981961164823",
  appId: "1:981961164823:web:227d68716308f588fbf452",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMembers() {
  const collect = await collection(db, "member");
  const snapshot = await getDocs(collect);
  return snapshot;

  // console.log(snapshot);
}
export { db, getMembers };
