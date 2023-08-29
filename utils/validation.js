const validateRole = (role) => {
  const validRoles = ["maker", "approver"];
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

module.exports = {
  validateRole,
  validateUsernamePassword,
  validatePasswordLength,
  validateAlphanumericPassword,
  validateLoginFields
};
