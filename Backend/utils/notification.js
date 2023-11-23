// const firebase = require('firebase-admin');

const catchAsync = require('./catchAsync');
const { admin, messaging } = require('./../controllers/firebaseAdminController');

// const { firebaseAdminConfig } = require('./../constant/configFireBase');

// firebase.initializeApp({
//     credential: firebase.credential.cert(firebaseAdminConfig),
//     databaseURL: 'https://rakshak-main-hackathon.firebaseio.com',
// });

// const messaging = firebase.messaging();

exports.sendNotificationOnApp = catchAsync(async (fcm_token, doc) => {
    console.log("fcm_tokens : ", fcm_token)
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    const message = {
        token: fcm_token,
        // priority: 'high',
        // webpush: {
        // },
        notification: {
            title: 'Emergency Alert',
            body: 'Emergency Alert'
        },

        //you can send only notification or only data(or include both)
        data: {
            operation: JSON.stringify({
                operationId: doc.id,
                location: doc.location.coordinates
            })
        }
    };

    return messaging.send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
        });

    // return admin.messaging().sendAll(message)
    //     .then((response) => {
    //         console.log('Successfully sent message:', response);
    //         if (response.failureCount > 0) {
    //             // Iterate through responses to get detailed error information
    //             response.responses.forEach((resp, index) => {
    //                 if (!resp.success) {
    //                     console.error(`Failed to send to device ${index + 1}:`, resp.error);
    //                 }
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error sending message:', error);
    //     });
});

exports.sendNotificationOnWeb = catchAsync(async (web_token, doc) => {
    console.log(web_token)
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    const message = {
        tokens: web_token,
        priority: 'high',
        webpush: {
            notification: {
                title: 'Emergency Alert',
                body: 'Emergency Alert',
                sound: "default"
            },
        },

        //you can send only notification or only data(or include both)
        data: {
            operation: JSON.stringify({
                operationId: doc.id,
                location: doc.location.coordinates
            })
        }
    };

    return messaging.send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        });
});
