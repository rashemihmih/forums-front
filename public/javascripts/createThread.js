let request = require("./request");
let urls = require('./urls');

window.createThread = function (form) {
  let data = {
    forum: document.getElementById('forum').innerHTML,
    title: form.elements['title'].value,
    message: form.elements['message'].value
  };
  let response = request.post('/api/thread', data);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.href = `${urls.frontend}/thread/${response.content.id}/page1`;
  } else {
    alert(response.content);
  }
};
