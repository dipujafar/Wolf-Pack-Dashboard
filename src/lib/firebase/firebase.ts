// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoxaEWbPuPG4tZf0bW_-sZeSvVulw8WR8",
  authDomain: "sales-e8f5a.firebaseapp.com",
  projectId: "sales-e8f5a",
  storageBucket: "sales-e8f5a.firebasestorage.app",
  messagingSenderId: "852956645307",
  appId: "1:852956645307:web:5f41b3e0338a1c6d2fa69e",
  measurementId: "G-BBSBSRFEL4",
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
