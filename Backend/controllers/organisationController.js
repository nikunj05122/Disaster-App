const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const { giveResponse } = require('../utils/response');

const Organization = require('../models/Organization');

exports.createOne = catchAsync(async (req, res, next) => {
    req.body.head = req.user._id;
    const doc = await Organization.create(req.body);

    return giveResponse(res, 201, "Success", 'Organization was created.', doc);
});

exports.getAll = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Organization.find(), req.query)
        .filter()
        .officerDetailsIncludes();
    const doc = await features.query;

    return giveResponse(res, 200, "Success", 'Organization list.', doc);
});

exports.getOne = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Organization.findById(req.params.id), req.query)
        .filter()
        .officerDetailsIncludes();
    const doc = await features.query;

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 200, "Success", 'Organization list.', doc);
});

exports.updateOne = catchAsync(async (req, res, next) => {
    const doc = await Organization.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 200, "Success", 'Organization was updated.', doc);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
    const doc = await Organization.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID.', 404));
    }

    return giveResponse(res, 204, "Success", 'Organization was deleted.');
});

exports.getNearestOrganization = catchAsync(async (req, res, next) => {
    const { lnglat } = req.params;
    const [lng, lat] = lnglat.split(',');

    if (!lat || !lng) {
        next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400));
    }

    const departmentDoc = Organization.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                spherical: true
            }
        },
        {
            $project: {
                officers: 0,
                head: 0
            }
        },
        {
            $sort: {
                distance: 1 // Sort by distance in ascending order (nearest to farthest)
            }
        },
        {
            $group: {
                _id: '$type',
                departments: { $push: '$$ROOT' } // `$$ROOT` is a system variable that represents the current document being processed within the pipeline.
            }
        },
        {
            $project: {
                type: '$_id',
                departments: {
                    $slice: ['$departments', 5] // Limit to the top 5 nearest departments for each type
                }
            }
        }
    ]);

    const organizationLocationDoc = Organization.find().select("location type name slug address");

    const [department, departmentLocation] = await Promise.all([departmentDoc, organizationLocationDoc]);

    return giveResponse(res, 200, "Success", 'Organization list.', { department, departmentLocation });
});