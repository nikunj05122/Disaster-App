const firebase = require('firebase');

const config = require('./../constant/configFireBase');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

// Initialize our firebase app
firebase.initializeApp(config.firebaseConfig);

require("firebase/storage");

// create reference to storage
const storage = firebase.storage().ref();

// Add image to storage and return file path
const addImg = catchAsync(async (req, res, next) => {

    if (req.files.length <= 0)
        return next(new AppError('Please provide Picture of organization.', 400));

    req.body = JSON.parse(req.body.data);

    req.body.img = await Promise.all(req.files.map(async file => {

        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}.${type}`;

        // Create reference for file name in cloud storage
        const imgRef = storage.child(fileName);

        // Create file metadata including the content type
        const metadata = {
            contentType: file.mimetype
        };

        // Upload the file in the bucket storage
        const uploafFile = await imgRef.put(file.buffer, metadata);

        // Get the public URL
        const getURL = await uploafFile.ref.getDownloadURL();

        console.log("File successfully uploaded");

        return {
            type: file.mimetype,
            URL: getURL
        }
    }));

    next();
});

module.exports = addImg;