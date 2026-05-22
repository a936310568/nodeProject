const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // 验证token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // 挂载用户信息
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token无效'
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: '请先登录后再进行访问'
    });
  }
}

module.exports = {
  protect
}