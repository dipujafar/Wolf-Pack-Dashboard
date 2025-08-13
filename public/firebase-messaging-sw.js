// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

//const firebaseConfig = {
//  apiKey: "AIzaSyBZNkESD1ePURF5bcthDnYbZphva-_vrdQ",
//  authDomain: "pentagon-5171c.firebaseapp.com",
//  projectId: "pentagon-5171c",
//  storageBucket: "pentagon-5171c.firebasestorage.app",
//  messagingSenderId: "558499095211",
//  appId: "1:558499095211:web:a4c334870ccf78c4bdcdee",
//};

const firebaseConfig = {
  apiKey: "AIzaSyB189eWtQty9XX7vKTSzg1h9r_z5gIgOXE",
  authDomain: "pentagoan-9a485.firebaseapp.com",
  projectId: "pentagoan-9a485",
  storageBucket: "pentagoan-9a485.firebasestorage.app",
  messagingSenderId: "279654279959",
  appId: "1:279654279959:web:80f2d010aa6268e1c06552",
  measurementId: "G-P8LQN292E2",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
