let request = require("./request");

window.requestSignup = function (form) {
  let data = {
    login: form.elements['login'].value.trim(),
    password: form.elements['password'].value.trim()
  };
  let response = request.post('/api/user', data);
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
