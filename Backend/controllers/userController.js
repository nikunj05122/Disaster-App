const User = require('./../models/User');
const { giveResponse } = require('./../utils/response');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Organization = require('../models/Organization');
const { ADMIN } = require('./../constant/types').USER;

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.updateMe = catchAsync(async (req, res, next) => {
    //  1) Create error if user POSTed password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
    }

    //  2) Filtered out unwanted fields name that are not allowed to be updated.
    const filterBody = filterObj(req.body, 'name', 'number', 'designation', 'location');

    //  3) Update user document
    const updateUser = await User.findByIdAndUpdate(req.user._id, filterBody, {
        new: true,              // Return new updated document.
        runValidators: true     // Validators is on to check updated fields is valid or not.
    });

    return giveResponse(res, 200, "Success", 'User was updated.', { user: updateUser });
});

exports.getMe = (req, res, next) => {
    req.params.id = req.user._id;
    next();
}

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });

    return giveResponse(res, 204, "Success", 'User was deleted.');

});

exports.createUser = (req, res, next) => {
    return next(new AppError('This router is not yet defined. Please use /signup instead.', 500));
}

exports.getAllUsers = factory.getAll(User);
exports.getUser = catchAsync(async (req, res, next) => {
    const userQuery = User.findById(req.params.id);
    const departmentQuery = Organization.findOne({ head: req.params.id });

    const [user, department] = await Promise.all([userQuery, departmentQuery]);

    if (!user) {
        return next(new AppError('No document found with that ID.', 404));
    }

    const data = department ? { user, department } : { user };

    return giveResponse(res, 200, "Success", 'Document list.', data);
});
// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.getUserReq = catchAsync(async (req, res, next) => {
    const data = await User.find({
        headId: req.user._id
    }).select("+active -location");

    return giveResponse(res, 200, "Success", 'Document list.', data);
})