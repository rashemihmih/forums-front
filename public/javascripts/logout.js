let request = require("./request");
let urls = require('./urls');

window.logout = function () {
  let response = request.delete('/api/session', {});
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.href = urls.frontend;
  } else {
    alert(response.content);
  }
};
