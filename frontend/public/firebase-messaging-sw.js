/* eslint-disable import/first */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAsc-evj8TURSFFWpFV9lDXlsKi4s_Zw9I",
    authDomain: "rakshak-main-hackathon.firebaseapp.com",
    projectId: "rakshak-main-hackathon",
    storageBucket: "rakshak-main-hackathon.appspot.com",
    messagingSenderId: "151755384366",
    appId: "1:151755384366:web:8c8aa3a29637c0349f21bf",
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body, icon: payload.notification.image, };

    const clickAction = payload.data.click_action || "http://localhost:3000"; // The default action is to navigate to the home page

    const notificationData = JSON.parse(localStorage.getItem("notificationData") || '[]')
    notificationData.push(JSON.parse(payload.data.operation));
    return self.registration.showNotification(notificationTitle, notificationOptions).then(() => {
        // Event listener for when the notification is clicked
        self.addEventListener("notificationclick", (event) => {
            event.notification.close(); // Close the notification when clicked
            localStorage.setItem("notificationData", JSON.stringify(notificationData))
            event.waitUntil(
                clients.openWindow(`${clickAction}?notification=true`)
            );
        });
    });
});