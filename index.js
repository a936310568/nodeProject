const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected successfully!')
}).catch((err) => {
  console.log('connected failed:',err);
});

app.use(cors());

// 引入路由
const userRouters = require('./routes/userRoutes');
const authRouters = require('./routes/authRoutes');
const chatRouters = require('./routes/chatRoutes');
app.use('/users', userRouters);
app.use('/auth', authRouters);
app.use('/chat', chatRouters);

app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);
});