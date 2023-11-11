const admin = require('firebase-admin');

const config = require('./../constant/configFireBase');

admin.initializeApp({
    credential: admin.credential.cert(config.firebaseAdminConfig)
});

module.exports = admin;