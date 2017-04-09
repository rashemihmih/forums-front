let request = require("./request");

window.requestLogin = function (form) {
  let data = {
    login: form.elements['login'].value,
    password: form.elements['password'].value
  };
  let response = request.post('/api/session', data);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.href = '/forums';
  } else {
    alert(response.content);
  }
};
