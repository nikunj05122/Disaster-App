const express = require('express');
const multer = require('multer');
const { ADMIN } = require('../constant/types').USER;

const reliefCampController = require('./../controllers/reliefCampController');
const authController = require('../controllers/authController');
const addImage = require('./../controllers/firebaseController');

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("file");

const router = express.Router();

router
    .route('/')
    .get(reliefCampController.getAllReliefCamps)
    .post(authController.protect, upload, addImage, reliefCampController.createReliefCamp);

router
    .route('/:id')
    .get(reliefCampController.getReliefCamp)
    .patch(authController.protect, reliefCampController.updateReliefCamp)
    .delete(authController.protect, authController.restrictTo(ADMIN), reliefCampController.deleteReliefCamp);

module.exports = router;
