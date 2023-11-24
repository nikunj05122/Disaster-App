const factory = require('./handlerFactory');
const AlertArea = require('./../models/AlertArea');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { giveResponse } = require('../utils/response');
const ReliefCamp = require('./../models/ReliefCamp');

exports.getAllAlertAreas = factory.getAll(AlertArea);
exports.getAlertArea = factory.getOne(AlertArea);
exports.createAlertArea = factory.createOne(AlertArea);
exports.updateAlertArea = factory.updateOne(AlertArea);

exports.deleteAlertArea = catchAsync(async (req, res, next) => {
    const doc = await AlertArea.findByIdAndDelete(req.params.id);
    await ReliefCamp.deleteMany({ alert: req.params.id });

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 204, "Success", 'Organization was deleted.');
});