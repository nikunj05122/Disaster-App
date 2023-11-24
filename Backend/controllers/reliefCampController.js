const factory = require('./handlerFactory');
const ReliefCamp = require('./../models/ReliefCamp');
const catchAsync = require('../utils/catchAsync');
const { giveResponse } = require('../utils/response');

exports.getAllReliefCamps = factory.getAll(ReliefCamp);
exports.getReliefCamp = factory.getOne(ReliefCamp);

exports.createReliefCamp = catchAsync(async (req, res, next) => {
    req.body.head = req.user._id;
    req.body.document = req.body.img[0];

    console.log("req.body ", req.body)
    const doc = await ReliefCamp.create(req.body);

    return giveResponse(res, 201, "Success", 'Organization was created.', doc);
});

exports.updateReliefCamp = factory.updateOne(ReliefCamp);
exports.deleteReliefCamp = factory.deleteOne(ReliefCamp);