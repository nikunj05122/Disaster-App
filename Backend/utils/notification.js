const FCM = require('fcm-node');

const serverkey = require('./../constant/configFireBase.js');
const catchAsync = require('./catchAsync');
const fcm = new FCM(serverkey.firebaseMessagingConfig);
const admin = require('./../controllers/firebaseAdminController');


exports.sendNotificationOnApp = catchAsync(async (fcm_token, reportId) => {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    const message = {
        to: fcm_token,
        // collapse_key: 'your_collapse_key',

        notification: {
            title: 'Emergency Alert',
            body: 'Emergency Alert'
        },

        //you can send only notification or only data(or include both)
        data: {
            reportId
        }
    };

    return new Promise(async (resolve, reject) => {
        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!");
                reject(err)
            } else {
                console.log("Successfully sent with response: ", response);
                resolve(response)
            }
        });

    })
});

exports.sendNotificationOnWeb = catchAsync(async (web_token, reportId) => {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    const message = {
        token: web_token,

        notification: {
            title: 'Emergency Alert',
            body: 'Emergency Alert'
        },

        //you can send only notification or only data(or include both)
        data: {
            reportId
        }
    };

    return new Promise(async (resolve, reject) => {
        admin.messaging().send(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
                resolve(response)
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                reject(error)
            });
    })
});