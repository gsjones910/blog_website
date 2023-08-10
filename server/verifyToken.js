const jwt = require('jsonwebtoken');

// token validation middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization'); // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'There are no tokens.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // token validation
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token is not valid.' });
  }
};

module.exports = verifyToken;
