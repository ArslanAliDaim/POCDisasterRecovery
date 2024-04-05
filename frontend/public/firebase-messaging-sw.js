// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCCCwnuMCMNCQwksaEDRj5XwypwtqoiiKo",
  authDomain: "hello-notification-a9d9e.firebaseapp.com",
  projectId: "hello-notification-a9d9e",
  storageBucket: "hello-notification-a9d9e.appspot.com",
  messagingSenderId: "522548358585",
  appId: "1:522548358585:web:9d17aeba9b141dfe4cda68",
  measurementId: "G-SC38JJZM2Y",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const data = JSON.parse(payload.data.default);
  const gcm = JSON.parse(data.GCM);
  const notificationTitle = gcm.notification.title;
  const notificationOptions = {
    body: gcm.notification.body,
    icon: "/favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
