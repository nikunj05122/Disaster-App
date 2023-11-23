const admin = require('firebase-admin');

const { firebaseAdminConfig } = require('./../constant/configFireBase');

admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: 'https://rakshak-main-hackathon.firebaseio.com',
});

const messaging = admin.messaging();

module.exports = { admin, messaging };