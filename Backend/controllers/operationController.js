const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { giveResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');
const Operation = require('./../models/Operation');
const Organization = require('./../models/Organization');
const User = require('./../models/User');
const { sendNotificationOnApp, sendNotificationOnWeb } = require('./../utils/notification');

exports.createOne = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ number: req.body.number });

    req.body.user = user._id;
    req.body.facts = req.body.img;

    const doc = await Operation.create(req.body);

    const department = await Organization
        .find({ _id: { $in: req.body.department } })
        .populate({
            path: "head officers",
            select: "-__v -location -role"
        });

    const fcmToken = [];
    const webToken = [];
    department.map(dept => {
        if (dept.head.fcm_token) fcmToken.push(dept.head.fcm_token);
        if (dept.head.web_token) webToken.push(dept.head.web_token);
        dept.officers.map(officer => {
            if (officer.fcm_token) fcmToken.push(officer.fcm_token);
            if (officer.web_token) webToken.push(officer.web_token);
        })
    });

    // fcmToken.length > 0 && await Promise.all(fcmToken.map(async token => {
    //     await sendNotificationOnApp(token, doc.id);
    // }));

    webToken.length > 0 && await Promise.all(webToken.map(async token => {
        await sendNotificationOnWeb(token, doc.id);
    }));

    return giveResponse(res, 201, "Success", 'Operation was sented.', doc);
});

exports.getAll = catchAsync(async (req, res, next) => {

    let query = Operation.find().sort("-createdAt").populate({
        path: "user officers",
        select: "-__v -location -role"
    });

    if (req.query.limit) {
        query = query.limit(req.query.limit * 1);
    }

    const doc = await query;

    return giveResponse(res, 200, "Success", 'Operati0n list.', doc);
});

exports.getOne = catchAsync(async (req, res, next) => {

    const doc = await Operation.findById(req.params.id).populate({
        path: "user officers",
        select: "-__v -location -role"
    });

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 200, "Success", 'Operation list.', doc);
});

exports.updateOne = catchAsync(async (req, res, next) => {
    const doc = await Operation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 200, "Success", 'Operation was updated.', doc);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
    const doc = await Operation.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 204, "Success", 'Operation was deleted.');
});