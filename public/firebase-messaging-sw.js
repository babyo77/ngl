// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBTb6PAR7CyJzH6R1GkT0pZwgVI3Msv-2c",
  authDomain: "ngldrx.firebaseapp.com",
  projectId: "ngldrx",
  storageBucket: "ngldrx.appspot.com",
  messagingSenderId: "1011251421809",
  appId: "1:1011251421809:web:89f1238ed265a12052b1d0",
  measurementId: "G-S54D629J4V"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});