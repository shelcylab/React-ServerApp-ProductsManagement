const express = require('express');
const productRoutesDB = require('./routes/api/productRoutesDB');
const userRoute = require('./routes/api/userRoute');
const authRoute = require('./routes/api/authRoute');

const connectDB = require('./config/connectDB');

let bookList = require('./data/product')

const app = express();

//coneect to db
connectDB();

//set a middleware to parse dat
app.use(express.json());

app.use('/api/products', productRoutesDB);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(5000, () => {
    console.log('Server started');
  });