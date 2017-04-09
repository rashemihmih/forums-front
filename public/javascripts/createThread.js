let request = require("./request");

window.createThread = function (form) {
  let thread = {
    forum: document.getElementById('forum').innerHTML,
    title: form.elements['title'].value.trim(),
    message: form.elements['message'].value.trim()
  };
  let response = request.post('/api/thread', thread);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.href = `/thread/${response.content.id}/page1`;
  } else {
    alert(response.content);
  }
};
