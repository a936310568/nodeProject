const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    res.status(200).json({
      success: true,
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}