const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/api', (req, res) => {
    res.send('Hello!');
});

module.exports = app;