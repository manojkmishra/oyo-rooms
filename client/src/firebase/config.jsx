// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUzPAw0SphHQSfX0Doqa7aKRRxAHC5ALY",
    authDomain: "couchserf.firebaseapp.com",  
    projectId: "couchserf",  
    storageBucket: "couchserf.appspot.com",  
    messagingSenderId: "258259968913",  
    appId: "1:258259968913:web:72c617765fb15b34077030"  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();