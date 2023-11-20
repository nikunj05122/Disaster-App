const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { giveResponse } = require('./../utils/response');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/User');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        MPIN: req.body.MPIN,
        MPINConfirm: req.body.MPINConfirm,
        location: req.body.location,
        designation: req.body.designation,
        role: req.body.role ? req.body.role : undefined,
        number: req.body.number
    });

    const token = signToken(newUser._id);
    newUser.MPIN = undefined;

    return giveResponse(res, 201, "Success", 'User was created.', { token, newUser });
});

exports.login = catchAsync(async (req, res, next) => {
    const { number, MPIN } = req.body;

    //  1) Check number and MPIN exist
    if (!number || !MPIN)
        return next(new AppError('Please provide number and MPIN!', 400));

    //  2) Check user existd && MPIN is correct
    let user = await User.findOne({ number }).select('+MPIN +active');

    if (!user || !user.active) {
        return next(new AppError('Unauthorized user.', 401));
    }

    if (!(await user.correctMPIN(MPIN, user.MPIN))) {
        return next(new AppError('Incorrect number or MPIN', 401));
    }

    if (req.body.isWeb === true) {
        user.web_token = req.body.fcmToken;
        user = await user.save();
    }
    if (req.body.fcm_token) {
        user.fcm_token = req.body.fcm_token;
        user = await user.save();
    }

    //  3) If everything is ok, send the token client
    const token = signToken(user._id);
    user.MPIN = undefined;
    user.active = undefined;
    user.web_token = undefined;

    return giveResponse(res, 200, "Success", 'User was logedIn.', { token, user });
});

exports.protect = catchAsync(async (req, res, next) => {
    //  1) Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    //  2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //  3) Check if user still exists  
    const currentUser = await User.findById(decoded.id).select("+active");

    if (!currentUser)
        return next(new AppError('Unauthorized user.', 401));

    if (!currentUser.active) {
        return next(new AppError('Unauthorized user.', 401));
    }
    //  4) Check if user changed password after the token was issued
    if (currentUser.MPINChangedAfter(decoded.iat)) {
        return next(new AppError('User recently changed MPIN! Please log in again.', 401));
    }

    currentUser.active = undefined;
    //  GRAND ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    }
}

exports.updatePassword = catchAsync(async (req, res, next) => {
    //  1) Get user from collection.
    const user = await User.findById(req.user._id).select('+MPIN');

    //  2) Check if POSTed currret MPIN is correct
    // if (!(await user.correctMPIN(req.body.MPINCurrent, user.MPIN))) {
    //     return next(new AppError('Your current passsword is wrong.', 401));
    // }

    //  3) If so, update MPIN
    user.MPIN = req.body.MPIN;
    user.MPINConfirm = req.body.MPINConfirm;
    await user.save();
    // user.findByIdAndUpdate() will NOT work as intended!

    // 4) If everything is ok, send the token client
    const token = signToken(user._id);
    user.MPIN = undefined;

    return giveResponse(res, 200, "Success", 'User was updated.', { token, user });
});