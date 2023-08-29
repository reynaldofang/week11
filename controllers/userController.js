const db = require("../db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const {
  validateRole,
  validateUsernamePassword,
  validatePasswordLength,
  validateAlphanumericPassword,
  validateLoginFields,
} = require("../utils/validation");

const createUser = (req, res) => {
  const { username, password, role } = req.body;

  const validationErrors = [];

  if (!validateRole(role)) {
    validationErrors.push(
      "Invalid role. Allowed roles are student, coach, and admin."
    );
  }

  if (!validateUsernamePassword(username, password)) {
    validationErrors.push("Username and password cannot be blank.");
  }

  if (!validatePasswordLength(password)) {
    validationErrors.push("Password should be at least 8 characters long.");
  }

  if (!validateAlphanumericPassword(password)) {
    validationErrors.push(
      "Password should contain only alphanumeric characters."
    );
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const usernameQuery = "SELECT * FROM users WHERE username = ?";
  db.query(usernameQuery, [username], (err, results) => {
    if (err) {
      console.error("Error checking username:", err);
      return res.status(500).json({ error: "Error creating user." });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Username already exists." });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password." });
      }

      const insertQuery =
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
      db.query(insertQuery, [username, hashedPassword, role], (err, result) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json({ error: "Error creating user." });
        }

        console.log("User created with ID:", result.insertId);
        return res.status(200).json({ message: "User created successfully." });
      });
    });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const validationErrors = [];

  if (!validateLoginFields(username, password)) {
    validationErrors.push("Username and password are required.");
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const getUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(getUserQuery, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Error fetching user." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const token = generateToken(user.id, user.username, user.role); // Use the generateToken function

      return res.status(200).json({
        message: "Login successful.",
        token: token,
      });
    });
  });
};

const getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Error fetching users." });
    }
    return res.status(200).json({ users: result });
  });
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
};
