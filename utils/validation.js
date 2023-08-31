const validateRole = (role) => {
  const validRoles = ["student", "coach", "admin"];
  return validRoles.includes(role);
};

const validateUsernamePassword = (username, password) => {
  return username && password;
};

const validatePasswordLength = (password) => {
  return password.length >= 8;
};

const validateAlphanumericPassword = (password) => {
  return /^[a-zA-Z0-9]+$/.test(password);
};

const validateLoginFields = (username, password) => {
  return username && password;
};

const validateAttendanceFields = (description) => {
  if (!description || description.trim() === "") {
    return false;
  }
  return true;
};

const validateAttendanceStatus = (status) => {
  const allowedStatuses = ["present", "pending", "absent", "sick"];
  return allowedStatuses.includes(status);
};

const validateDeleteUser = (adminUserId, userRole) => {
  if (userRole === "student" || userRole === "coach") {
    if (adminUserId !== adminUserId) {
      return false;
    }
  }
  return true;
};

module.exports = {
  validateRole,
  validateUsernamePassword,
  validatePasswordLength,
  validateAlphanumericPassword,
  validateLoginFields,
  validateAttendanceFields,
  validateAttendanceStatus,
  validateDeleteUser,
};
