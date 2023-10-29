const express = require('express');

const organizationController = require('./../controllers/organisationController');
const authController = require('./../controllers/authController');
const { ADMIN } = require('./../constant/types').USER;

const router = express.Router();

router
    .route('/')
    .get(organizationController.getAll)
    .post(authController.protect, authController.restrictTo(ADMIN), organizationController.createOne);

router
    .route('/:id')
    .get(organizationController.getOne)
    .patch(authController.protect, authController.restrictTo(ADMIN), organizationController.updateOne)
    .delete(authController.protect, authController.restrictTo(ADMIN), organizationController.deleteOne);

module.exports = router;
