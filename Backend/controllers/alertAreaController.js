const factory = require('./handlerFactory');
const AlertArea = require('./../models/AlertArea');

exports.getAllAlertAreas = factory.getAll(AlertArea);
exports.getAlertArea = factory.getOne(AlertArea);
exports.createAlertArea = factory.createOne(AlertArea);
exports.updateAlertArea = factory.updateOne(AlertArea);
exports.deleteAlertArea = factory.deleteOne(AlertArea);