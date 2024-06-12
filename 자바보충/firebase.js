const firebaseConfig = {
  apiKey: "AIzaSyCREEdi1EUrARen8jLYiZXP1o7mOkdj1lc",
  authDomain: "myproject-8e5f0.firebaseapp.com",
  projectId: "myproject-8e5f0",
  storageBucket: "myproject-8e5f0.appspot.com",
  messagingSenderId: "981961164823",
  appId: "1:981961164823:web:227d68716308f588fbf452",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}

async function deleteDatas(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj);
}
