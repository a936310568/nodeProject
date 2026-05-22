const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected successfully!')
}).catch((err) => {
  console.log('connected failed:',err);
});

// 引入路由
const userRouters = require('./routes/userRoutes');
const authRouters = require('./routes/authRoutes');
app.use('/users', userRouters);
app.use('/auth', authRouters);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);
});