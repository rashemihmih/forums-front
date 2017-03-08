let request = require("./request");
let encrypt = require('./encrypt');
let urls = require('./urls');

window.requestSignup = function (form) {
  let data = {
    login: form.elements['login'].value,
    password: encrypt(form.elements['password'].value).toString()
  };
  let response = request.post('/api/user', data);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.href = urls.frontend + '/forums';
  } else {
    alert(response.content);
  }
};
