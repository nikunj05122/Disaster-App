const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    console.log(err);
    // process.exit(1); -> code 1 stands for unCatch Exception.
    // process.exit(0); -> code 0 stands for Success.
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server start on ${port}....`));

process.on('uncaughtException', err => {
    console.log('UNCAUGHT REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    console.log(err);
    // server.close() use for first close the all running and panding requestes in server after crash sever.
    server.close(() => {
        // process.exit(1); -> code 1 stands for unCatch Exception.
        // process.exit(0); -> code 0 stands for Success.
        process.exit(1);
    });
});