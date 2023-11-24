/* eslint-disable */
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

self.addEventListener('message', event => {
    console.log("event ", event)
    if (event.data && event.data.type === 'storeNotificationData') {
        const notificationData = JSON.parse(localStorage.getItem("notificationData") || '[]')
        notificationData.push(event.data.payload);
        localStorage.setItem("notificationData", JSON.stringify(notificationData));
    }
});

messaging.onBackgroundMessage((payload) => {

    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body, icon: payload.notification.image, };

    // const clickAction = payload.data.click_action || "http://localhost:3000";
    const clickAction = "http://localhost:3000";

    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'storeNotificationData',
                payload: JSON.parse(payload.data.operation),
            });
        });
    });

    // Show the notification
    return self.registration.showNotification(notificationTitle, notificationOptions).then(() => {
        // Event listener for when the notification is clicked
        self.addEventListener("notificationclick", (event) => {
            event.notification.close(); // Close the notification when clicked
            event.waitUntil(
                clients.openWindow(`${clickAction}?notificationData=${payload.data.operation}`)
            );
        });
    });
});