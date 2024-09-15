const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretKey = process.env.JWT_SECRET
// Middleware to verify JWT

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Verify the token

    req.user = decoded; // Attach decoded payload (user data) to the request
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

const generateToken = async (user) => {
  const payload = {
    id: user.userid, // Use userid from the user object
    email: user.email,
  };

  const options = { expiresIn: '1h' }; // Token expiration

  // Generate the token
  const token = await jwt.sign(payload, secretKey, options);

  return token;
};

// Export the functions
module.exports = {
  authenticate,
  generateToken,
};
