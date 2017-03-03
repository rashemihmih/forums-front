let request = require("./request.js");

window.requestLogin = function (form) {
  let data = {
    login: form.elements['login'].value,
    password: form.elements['password'].value
  };
  let response = request.post('/user', data);
  if (response === undefined) {
    alert('undefined');
    return;
  }
  if (response.code === 0) {
    alert('hello, ' + response.content);
  } else {
    alert(response.content);
  }
};
