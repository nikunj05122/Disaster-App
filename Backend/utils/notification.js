const FCM = require('fcm-node');

const serverkey = require('./../constant/configFireBase.js');
const catchAsync = require('./catchAsync');
const fcm = new FCM(serverkey.firebaseMessagingConfig.serverKey);
const admin = require('./../controllers/firebaseAdminController');


exports.sendNotificationOnApp = catchAsync(async (fcm_tokens, operationId) => {

    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    const message = {
        registration_ids: fcm_tokens,
        collapse_key: operationId,

        notification: {
            title: 'Emergency Alert',
            body: 'Emergency Alert'
        },

        //you can send only notification or only data(or include both)
        data: {
            operationId
        }
    };

    return new Promise(async (resolve, reject) => {
        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!", err);
                reject(err)
            } else {
                console.log("Successfully sent with response App: ", response);
                resolve(response)
            }
        });

    })
});

exports.sendNotificationOnWeb = catchAsync(async (web_tokens, doc) => {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    const message = {
        tokens: web_tokens,
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
            operationId: doc._id,
            location: location.coordinates
        }
    };

    return new Promise(async (resolve, reject) => {
        admin.messaging().sendMulticast(message)
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
