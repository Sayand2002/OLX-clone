import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCgdL3aB-CCBzMZxu51CWx2Jt0lyWMQK5E",
    authDomain: "olx-clone-191b6.firebaseapp.com",
    projectId: "olx-clone-191b6",
    storageBucket: "olx-clone-191b6.appspot.com",
    messagingSenderId: "745740651020",
    appId: "1:745740651020:web:16d60ab27bcacedc21fc29",
    measurementId: "G-SV54T5W7GB"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };