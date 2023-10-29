const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const catchAsync = require('catchAsync');

exports.sendSMS = catchAsync(async (number, message) => {
    const message = await client.messages
        .create({
            body: message,
            from: process.env.TWILIO_NUMBER,
            to: number
        })
    return message;
});