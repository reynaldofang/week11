const db = require("../db");
const { checkMakerOrApprover } = require("../middlewares/authMiddleware");
const { validateAttendanceFields } = require("../utils/validation");

const markAttendance = (req, res) => {
  const { description } = req.body;

  const validationErrors = [];

  if (!validateAttendanceFields(description)) {
    validationErrors.push("Description is required.");
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const userId = req.decodedToken.userId;

  const query =
    "INSERT INTO attendance (user_id, status, description) VALUES (?, ?, ?)";
  db.query(query, [userId, "pending", description], (err, result) => {
    if (err) {
      console.error("Error marking attendance:", err);
      return res.status(500).json({ error: "Error marking attendance." });
    }
    console.log();
    return res.status(200).json({ message: "Attendance marked as pending." });
  });
};

const getStudentAttendance = (req, res) => {
  const studentId = req.decodedToken.userId;

  const query = "SELECT * FROM attendance WHERE user_id = ?";
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).json({ error: "Error fetching  attendance." });
    }

    return res.status(200).json({
      attedance: results,
    });
  });
};

const getAllAttendance = (req, res) => {
  const query = "SELECT * FROM attendance";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).json({ error: "Error fetching attendance." });
    }
    return res.status(200).json({ attendance: result });
  });
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
};
