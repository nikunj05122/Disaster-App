const express = require('express');
const multer = require('multer');
// const admin = require('firebase-admin');
// const fcm = require('')

const authController = require('./../controllers/authController');
const operationController = require('./../controllers/operationController');
const addImage = require('./../controllers/firebaseController');
// const config = require('./../constant/configFireBase');



const storage = multer.memoryStorage();
const upload = multer({ storage }).array("file");

const router = express.Router();

router
    .route('/')
    .get(operationController.getAll)
    .post(upload, addImage, operationController.createOne)


module.exports = router;
