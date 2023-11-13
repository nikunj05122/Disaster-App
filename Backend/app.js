const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const UserRoutes = require('./routes/UserRoutes');
const OrganizationRoutes = require('./routes/OrganizationRoutes');
const OperationRoutes = require('./routes/OperationRoutes');
const VehicleRoutes = require('./routes/VehicleRoutes');
const DesignationRoutes = require('./routes/DesignationRoutes');

const app = express();

// Set security HTTP headers
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));

// Limit requests from same API
// const limiter = rateLimit({
//     max: 100, // Max IP is send reqest on perticular time
//     windowMs: 60 * 60 * 1000, // That perticular time is windowMs (means windowsmiliseconds)
//     message: 'Too many requests from this IP, please try again in an hour!' // ERROR message rech the req max / windowsMs.
// });

// app.use('/api', limiter); // Apply on that routes start with '/api' (Means all routes)

// Development logging  
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser, reding data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross - site scripting attacks)
app.use(xss());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/organization', OrganizationRoutes);
app.use('/api/v1/operation', OperationRoutes);
app.use('/api/v1/vehicle', VehicleRoutes);
app.use('/api/v1/designation', DesignationRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

global.XMLHttpRequest = require("xhr2");

module.exports = app;