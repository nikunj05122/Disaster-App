const express = require('express');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const { SUPER_ADMIN } = require('./../constant/types').USER;

const router = express.Router();

router.post('/signUp', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router.patch('/updateMyPaswword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo(SUPER_ADMIN));

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
