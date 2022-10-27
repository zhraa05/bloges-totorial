import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyC9GowP8IUkm6lr1eV1QxJplfIo2Q3oxtI",
    authDomain: "react-blogs-app-20cd3.firebaseapp.com",
    projectId: "react-blogs-app-20cd3",
    storageBucket: "react-blogs-app-20cd3.appspot.com",
    messagingSenderId: "381213829648",
    appId: "1:381213829648:web:e127bf8f31173141adf895"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };