/* eslint-disable import/first */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyA6Ptlfwvy1kJu1hBsoxKy3ZonUuCZZB3k",
    authDomain: "rakshak-dev.firebaseapp.com",
    projectId: "rakshak-dev",
    storageBucket: "rakshak-dev.appspot.com",
    messagingSenderId: "898528200025",
    appId: "1:898528200025:web:ad624531de7bbcdf1fb848"
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body, icon: payload.notification.image, };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});