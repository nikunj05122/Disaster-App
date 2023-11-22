const express = require('express');
const multer = require('multer');

const authController = require('./../controllers/authController');
const operationController = require('./../controllers/operationController');
const addImage = require('./../controllers/firebaseController');

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("file");

const router = express.Router();

router.use(authController.protect, authController.restrictTo(ADMIN, SUPER_ADMIN, OFFICER));

router
    .route('/')
    .get(operationController.getAll)
    .post(upload, addImage, operationController.createOne)

router
    .route('/:id')
    .get(operationController.getOne)
    .patch(operationController.updateOne)
    .delete(operationController.deleteOne);

module.exports = router;
