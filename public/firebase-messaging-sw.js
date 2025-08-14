// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCoxaEWbPuPG4tZf0bW_-sZeSvVulw8WR8",
  authDomain: "sales-e8f5a.firebaseapp.com",
  projectId: "sales-e8f5a",
  storageBucket: "sales-e8f5a.firebasestorage.app",
  messagingSenderId: "852956645307",
  appId: "1:852956645307:web:5f41b3e0338a1c6d2fa69e",
  measurementId: "G-BBSBSRFEL4",
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
