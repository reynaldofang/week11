const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");
const { authorizationMiddleware } = require("../middlewares/authMiddleware");

router.post(
  "/checkin",
  authorizationMiddleware({ roles: ["student"] }),
  markAttendance
);

router.get(
  "/my-attendance",
  authorizationMiddleware({ roles: ["student"] }),
  getStudentAttendance
);

router.get(
  "/all-attendance",
  authorizationMiddleware({ roles: ["coach", "admin"] }),
  getAllAttendance
);

module.exports = router;
