const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key"; 

const generateToken = (userId, username, role) => {
  const payload = {
    userId,
    username,
    role,
  };
  const options = {
    expiresIn: "1h", // Token kedaluwarsa dalam 1 jam
  };
  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
