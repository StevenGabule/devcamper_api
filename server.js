const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// load env vars
dotenv.config({path: './config/config.env'});

// established connection
connectDB();

// routes module
const bootcamps = require('./routes/bootcamps');

const app = express();

// body parser
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// mount the routes
app.use('/api/v1/bootcamps', bootcamps)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
    console.log(`Server running in  ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // close the server & exit the process
    server.close(() => process.exit(1));
})
