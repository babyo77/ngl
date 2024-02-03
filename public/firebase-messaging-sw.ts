importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBTb6PAR7CyJzH6R1GkT0pZwgVI3Msv-2c",
    authDomain: "ngldrx.firebaseapp.com",
    projectId: "ngldrx",
    storageBucket: "ngldrx.appspot.com",
    messagingSenderId: "1011251421809",
    appId: "1:1011251421809:web:89f1238ed265a12052b1d0",
    measurementId: "G-S54D629J4V"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  // Customize the notification as needed
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
