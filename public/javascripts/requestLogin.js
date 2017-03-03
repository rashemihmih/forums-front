let request = require("./request");
let encrypt = require('./encrypt');

window.requestLogin = function (form) {
  let data = {
    login: form.elements['login'].value,
    password: encrypt(form.elements['password'].value).toString()
  };
  let response = request.post('/session', data);
  alert(response);
};
