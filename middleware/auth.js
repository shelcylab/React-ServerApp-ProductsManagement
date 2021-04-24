const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get the token from header
  const token = req.header('x-auth-token');
  //check if token is there
  if (!token) {
    return res.status(400).json({ msg: 'no token authorization denied' });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
