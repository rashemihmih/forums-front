let request = require("./request");

window.createPost = function (form) {
  if (form.noValidate) {
    form.noValidate = false;
    form.elements['post'].style = 'display: block';
    form.elements['send'].innerHTML = 'Отправить';
    return;
  }
  let post = {
    message: form.elements['post'].value,
    threadId: parseInt(document.getElementById('id').innerHTML, 10),
    parent: 0
  };
  let response = request.post('/api/post', post);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.reload();
  } else {
    alert(response.content);
  }
};