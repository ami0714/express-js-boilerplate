const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Bearer token is required' });
  }

  const token = authorization.slice('Bearer '.length).trim();
  if (!token) {
    return res.status(401).json({ message: 'Bearer token is required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
}

module.exports = authMiddleware;