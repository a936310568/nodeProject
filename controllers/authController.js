const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({
    id,
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

exports.registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: '用户已存在' });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: '用户不存在' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: '密码错误'})
    }
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}