const db = require("../db");
const {
  validateAttendanceFields,
  validateAttendanceStatus,
} = require("../utils/validation");
const moment = require("moment-timezone");

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

const updateAttendanceStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const coachId = req.decodedToken.userId;
  const formattedUpdateDate = moment()
    .tz("Asia/Jakarta")
    .format("YYYY-MM-DD HH:mm:ss");

  if (!validateAttendanceStatus(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  const updateQuery =
    "UPDATE attendance SET status = ?, coach_id = ?, updated_at = ? WHERE id = ?";
  db.query(
    updateQuery,
    [status, coachId, formattedUpdateDate, id],
    (err, result) => {
      if (err) {
        console.error("Error updating attendance status:", err);
        return res
          .status(500)
          .json({ error: "Error updating attendance status." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Attendance not found." });
      }

      return res.status(200).json({ message: "Attendance status updated." });
    }
  );
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
  updateAttendanceStatus,
};
