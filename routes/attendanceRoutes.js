const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { authorizationMiddleware } = require("../middlewares/authMiddleware");

const coachAdminAuth = authorizationMiddleware({ roles: ["coach", "admin"] });

router.post(
  "/checkin",
  authorizationMiddleware({ roles: ["student"] }),
  attendanceController.markAttendance
);

router.get(
  "/my-attendance",
  authorizationMiddleware({ roles: ["student"] }),
  attendanceController.getStudentAttendance
);

router.get(
  "/all-attendance",
  authorizationMiddleware({ roles: ["coach", "admin"] }),
  attendanceController.getAllAttendance
);

router.put(
  "/update-attendance-status/:id",
  coachAdminAuth,
  attendanceController.updateAttendanceStatus
);

module.exports = router;
