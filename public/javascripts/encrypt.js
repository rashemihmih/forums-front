let sha512 = require("crypto-js/sha512");

module.exports = function (data) {
  return sha512(data);
};