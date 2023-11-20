const express = require('express');
const { ADMIN, SUPER_ADMIN, OFFICER } = require('../constant/types').USER;

const alertAreaController = require('./../controllers/alertAreaController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(alertAreaController.getAllAlertAreas)
    .post(authController.protect, authController.restrictTo(ADMIN, OFFICER, SUPER_ADMIN), alertAreaController.createAlertArea);

router
    .route('/:id')
    .get(alertAreaController.getAlertArea)
    .patch(authController.protect, authController.restrictTo(ADMIN, OFFICER, SUPER_ADMIN), alertAreaController.updateAlertArea)
    .delete(authController.protect, authController.restrictTo(ADMIN, OFFICER, SUPER_ADMIN), alertAreaController.deleteAlertArea);

module.exports = router;