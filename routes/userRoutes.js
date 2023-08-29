const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorizationMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get(
  "/all-users",
  authorizationMiddleware({ roles: ["admin"] }),
  userController.getAllUsers
);

router.get(
  "/all-students",
  authorizationMiddleware({ roles: ["admin", "coach"] }),
  userController.getAllStudents
);

module.exports = router;
