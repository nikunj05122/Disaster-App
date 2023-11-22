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

    // const clickAction = payload.data.click_action || "http://localhost:3000"; // The default action is to navigate to the home page

    const notificationData = JSON.parse(localStorage.getItem("notificationData")) || [];
    notificationData.push(JSON.parse(payload.data.operation));
    return self.registration.showNotification(notificationTitle, notificationOptions).then(() => {
        // Event listener for when the notification is clicked
        self.addEventListener("notificationclick", (event) => {
            event.notification.close(); // Close the notification when clicked
            event.waitUntil(
                localStorage.setItem("notificationData", JSON.stringify(notificationData))
                // clients.openWindow(`${clickAction}?notificationData=${JSON.stringify(payload.data)}`)
            );
        });
    });
});