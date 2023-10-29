const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const { giveResponse } = require('../utils/response');
const { USER } = require('./../constant/types').USER;

const Organization = require('../models/Organization');

exports.createOne = catchAsync(async (req, res, next) => {
    req.body.head = req.user._id;
    const doc = await Organization.create(req.body);

    return giveResponse(res, 201, true, 'Organization was created.', doc);
});

exports.getAll = catchAsync(async (req, res, next) => {
    const doc = await Organization.find();

    return giveResponse(res, 200, true, 'Organization list.', doc);
});

exports.getOne = catchAsync(async (req, res, next) => {
    const doc = await Organization.findById(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 200, true, 'Organization list.', doc);
});

exports.updateOne = catchAsync(async (req, res, next) => {
    const doc = await Organization.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 200, true, 'Organization was updated.', doc);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
    const doc = await Organization.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 204, true, 'Organization was deleted.');
});