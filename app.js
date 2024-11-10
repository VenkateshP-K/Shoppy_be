const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173','https://shoppy-be-gb08.onrender.com/api'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  };

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/api', (req, res) => {
    res.send('Hello!');
});

module.exports = app;