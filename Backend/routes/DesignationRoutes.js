const express = require('express');
const { ADMIN, SUPER_ADMIN, OFFICER } = require('../constant/types').USER;

const designationController = require('../controllers/designationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER));

router
    .route('/')
    .get(designationController.getAllDesignations)
    .post(designationController.createDesignation);

router
    .route('/:id')
    .get(designationController.getDesignation)
    .patch(designationController.updateDesignation)
    .delete(designationController.deleteDesignation);

module.exports = router;
