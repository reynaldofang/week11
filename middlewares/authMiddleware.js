const { verifyToken } = require("../utils/jwtUtils");

const authorizationMiddleware = ({ roles }) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    try {
      const decodedToken = verifyToken(token.split(" ")[1]);
      const userRole = decodedToken.role;

      if (roles.includes(userRole)) {
        req.decodedToken = decodedToken;
        next();
      } else {
        return res.status(403).json({ error: "You can't access here!!." });
      }
    } catch (err) {
      return res.status(401).json({ error: "Invalid token." });
    }
  };
};

module.exports = {
  authorizationMiddleware,
};
