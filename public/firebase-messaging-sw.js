importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBTb6PAR7CyJzH6R1GkT0pZwgVI3Msv-2c",
  authDomain: "ngldrx.firebaseapp.com",
  projectId: "ngldrx",
  storageBucket: "ngldrx.appspot.com",
  messagingSenderId: "1011251421809",
  appId: "1:1011251421809:web:89f1238ed265a12052b1d0",
  measurementId: "G-S54D629J4V",
};

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "You have new Notification";
  const notificationOptions = {
    body: "Tap to view",
    icon: "https://ngl-drx.vercel.app/icon.jpg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
