const express = require('express');
const multer = require('multer');

const authController = require('./../controllers/authController');
const operationController = require('./../controllers/operationController');
const addImage = require('./../controllers/firebaseController');
const { ADMIN, SUPER_ADMIN, OFFICER } = require('../constant/types').USER;

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("file");

const router = express.Router();



router
    .route('/')
    .get(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER), operationController.getAll)
    .post(upload, addImage, operationController.createOne)

router.use(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER));
router
    .route('/:id')
    .get(operationController.getOne)
    .patch(operationController.updateOne)
    .delete(operationController.deleteOne);

module.exports = router;
