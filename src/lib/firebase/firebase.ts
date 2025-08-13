// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: "AIzaSyB189eWtQty9XX7vKTSzg1h9r_z5gIgOXE",
  //authDomain: "pentagoan-9a485.firebaseapp.com",
  //projectId: "pentagoan-9a485",
  //storageBucket: "pentagoan-9a485.firebasestorage.app",
  //messagingSenderId: "279654279959",
  //appId: "1:279654279959:web:80f2d010aa6268e1c06552",
  //measurementId: "G-P8LQN292E2",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
let messaging: any = null;
try {
  messaging = getMessaging(firebaseApp);
} catch (error) {
  console.error("Error initializing Firebase Messaging:", error);
}
export { messaging };
