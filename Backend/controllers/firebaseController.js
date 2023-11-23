const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

const catchAsync = require('../utils/catchAsync');
const { firebaseConfig } = require('./../constant/configFireBase')

initializeApp(firebaseConfig);

const storage = getStorage();

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

const addImg = catchAsync(async (req, res, next) => {

    req.body = JSON.parse(req.body.data);

    if (req.files && req.files.length > 0) {

        req.body.img = await Promise.all(req.files.map(async file => {
            const dateTime = giveCurrentDateTime();

            const storageRef = ref(storage, `${req.baseUrl.split('/')[3]}/${file.originalname + "--" + dateTime}`);

            const metadata = {
                contentType: file.mimetype,
            };

            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

            const imageURL = await getDownloadURL(snapshot.ref);

            console.log("File successfully uploaded");

            return {
                type: file.mimetype,
                URL: imageURL
            }
        }));
    }

    next();
});

module.exports = addImg;