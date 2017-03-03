let sha256 = require("crypto-js/sha256");

module.exports = function (data) {
  return sha256(data);
};