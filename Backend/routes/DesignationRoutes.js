const express = require('express');
const { ADMIN, SUPER_ADMIN, OFFICER } = require('../constant/types').USER;

const designationController = require('../controllers/designationController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(designationController.getAllDesignations)
    .post(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER), designationController.createDesignation);

router
    .route('/:id')
    .get(designationController.getDesignation)
    .patch(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER), designationController.updateDesignation)
    .delete(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER), designationController.deleteDesignation);

module.exports = router;
