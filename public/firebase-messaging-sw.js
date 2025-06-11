// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAg2TQSvIn46yUV2p5zoHs_x3vCP5q82HI",
  authDomain: "palgoosam-893.firebaseapp.com",
  projectId: "palgoosam-893",
  storageBucket: "palgoosam-893.firebasestorage.app",
  messagingSenderId: "839541858708",
  appId: "1:839541858708:web:585c99a1a35782a7466f81",
  measurementId: "G-B6DXV8WHEM",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png", // 알림 아이콘 (선택)
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
