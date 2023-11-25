const catchAsync = require('./catchAsync');
const { messaging } = require('./../controllers/firebaseAdminController');

exports.sendNotificationOnApp = catchAsync(async (fcm_token, doc) => {
    console.log("fcm_tokens : ", fcm_token)

    const message = {
        token: fcm_token,
        notification: {
            title: 'Emergency Alert',
            body: 'Emergency Alert'
        },

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
});

exports.sendNotificationOnWeb = catchAsync(async (web_token, doc) => {
    console.log(web_token)
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    const message = {
        token: web_token,
        webpush: {
            notification: {
                title: 'Emergency Alert',
                body: 'Emergency Alert'
            },
        },

        //you can send only notification or only data(or include both)
        data: {
            operation: JSON.stringify({
                operationId: doc.id,
                location: doc.location.coordinates,
                active: true
            }),
            click_action: process.env.URL
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
