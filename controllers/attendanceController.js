const db = require("../db");
const {
  validateAttendanceFields,
  validateAttendanceStatus,
} = require("../utils/validation");
const moment = require("moment-timezone");

const markAttendance = (req, res) => {
  const userId = req.decodedToken.userId;
  const description = req.body.description;
  const currentDate = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");

  if (!validateAttendanceFields(description)) {
    return res
      .status(400)
      .json({ error: "Attendance description cannot be empty." });
  }
  const checkAttendanceQuery =
    "SELECT * FROM attendance WHERE user_id = ? AND DATE(created_at) = ?";
  db.query(checkAttendanceQuery, [userId, currentDate], (err, result) => {
    if (err) {
      console.error("Error checking attendance:", err);
      return res.status(500).json({ error: "Error checking attendance." });
    }

    if (result.length > 0) {
      return res
        .status(200)
        .json({ status: "You have already attended today." });
    }

    const insertAttendanceQuery =
      "INSERT INTO attendance (user_id, description, created_at) VALUES (?, ?, ?)";
    db.query(
      insertAttendanceQuery,
      [
        userId,
        description,
        moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
      ],
      (err, result) => {
        if (err) {
          console.error("Error marking attendance:", err);
          return res.status(500).json({ error: "Error marking attendance." });
        }
        return res
          .status(200)
          .json({ message: "Attendance marked successfully." });
      }
    );
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

  const getAttendanceStatusQuery = "SELECT status FROM attendance WHERE id = ?";
  db.query(getAttendanceStatusQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching attendance status:", err);
      return res
        .status(500)
        .json({ error: "Error fetching attendance status." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Attendance not found." });
    }

    const currentStatus = result[0].status;
    if (currentStatus !== "pending") {
      return res
        .status(200)
        .json({ message: "Only pending attendance can be updated." });
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
  });
};

const getAttendanceStatus = (req, res) => {
  const userId = req.decodedToken.userId;
  const query = "SELECT * FROM attendance WHERE user_id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching attendance status:", err);
      return res
        .status(500)
        .json({ error: "Error fetching attendance status." });
    }

    if (result.length === 0) {
      return res.status(s404).json({ error: "Attendance status not found." });
    }

    const attendanceStatus = result[0].status;
    return res.status(200).json({ status: attendanceStatus });
  });
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
  updateAttendanceStatus,
  getAttendanceStatus,
};
