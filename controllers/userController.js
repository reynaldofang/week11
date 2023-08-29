const db = require("../db");
const bcrypt = require("bcrypt");
const {
  validateRole,
  validateUsernamePassword,
  validatePasswordLength,
  validateAlphanumericPassword,
} = require("../utils/validation");

const createUser = (req, res) => {
  const { username, password, role } = req.body;

  const validationErrors = [];

  if (!validateRole(role)) {
    validationErrors.push(
      "Invalid role. Allowed roles are maker and approver."
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

      // Insert the user into the database
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
  getAllUsers,
};
