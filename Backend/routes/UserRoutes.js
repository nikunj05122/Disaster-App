const express = require('express');
const multer = require('multer');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const addImage = require('./../controllers/firebaseController');

const { SUPER_ADMIN, ADMIN } = require('../constant/types').USER;

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("file");

const router = express.Router();

router.post('/signUp', authController.signup);
router.post('/login', authController.login);
router.post('/officer-signUp', upload, addImage, authController.officerReq);

router.use(authController.protect);

router.patch('/updateMyPaswword', authController.updatePassword);
router
    .get('/me', userController.getMe, userController.getUser)
    .get('/officer-req', userController.getUserReq);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo(SUPER_ADMIN, ADMIN));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
