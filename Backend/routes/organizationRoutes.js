const express = require('express');
const multer = require('multer');

const organizationController = require('../controllers/organisationController');
const authController = require('../controllers/authController');
const { ADMIN } = require('../constant/types').USER;
const addImage = require('../controllers/firebaseController');

const storage = multer.memoryStorage();
const upload = multer({ storage }).array('file');

const router = express.Router();

router
    .route('/')
    .get(organizationController.getAll)
    .post(authController.protect, authController.restrictTo(ADMIN), upload, addImage, organizationController.createOne);

router
    .route('/:id')
    .get(organizationController.getOne)
    .patch(authController.protect, authController.restrictTo(ADMIN), organizationController.updateOne)
    .delete(authController.protect, authController.restrictTo(ADMIN), organizationController.deleteOne);

router
    .route('/nearest-organization/:lnglat')
    .get(organizationController.getNearestOrganization)

module.exports = router;
