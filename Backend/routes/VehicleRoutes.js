const express = require('express');
const { ADMIN, SUPER_ADMIN, OFFICER } = require('../constant/types').USER;

const vehicleController = require('./../controllers/vehicleController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER));

router
    .route('/')
    .get(vehicleController.getAllVehicles)
    .post(vehicleController.createVehicle);

router
    .route('/:id')
    .get(vehicleController.getVehicle)
    .patch(vehicleController.updateVehicle)
    .delete(vehicleController.deleteVehicle);

module.exports = router;
