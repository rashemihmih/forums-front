let request = require('./request');
let urls = require('./urls');

let forum = document.getElementById('title').innerHTML;
let page = parseInt(document.getElementById('page').innerHTML, 10);
let limit = 50;
let offset = (page - 1) * limit;
let response = request.get(`/api/thread/list?forum=${forum}&offset=${offset}&limit=${limit}`);
if (response === undefined) {
  alert('Не удалось загрузить темы');
  return;
}
response = JSON.parse(response);
if (response.code !== 0) {
  alert(response.content);
  return;
}
let html = '';
if (response.content.length === 0) {
  html = 'Пусто'
} else {
  response.content.forEach(thread => {
    let title = thread.title;
    html += `<p><a href="${urls.frontend + '/thread/' + thread.id + '/page1'}">${thread.title}</a></p>\n`;
  });
}
document.getElementById('list').innerHTML = html;
