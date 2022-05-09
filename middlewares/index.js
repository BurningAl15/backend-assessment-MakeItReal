const validateFields = require("./validate-fields");
const isAuthenticated = require("./validate-jwt");

module.exports = {
  ...validateFields,
  ...isAuthenticated,
};
