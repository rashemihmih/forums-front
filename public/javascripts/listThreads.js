let request = require('./request');

let forum = document.getElementById('title').innerHTML;
let page = parseInt(document.getElementById('page').innerHTML, 10);
let limit = 50;
let offset = (page - 1) * limit;
let threads = request.get(`/api/thread/list?forum=${forum}&offset=${offset}&limit=${limit}`);
if (threads === undefined) {
  alert('Не удалось загрузить темы');
  return;
}
threads = JSON.parse(threads);
if (threads.code !== 0) {
  alert(threads.content);
  return;
}
let html = '';
if (threads.content.length === 0) {
  html = 'Пусто'
} else {
  threads.content.forEach(thread => {
    let title = thread.title;
    html += `<p><a href="${'/thread/' + thread.id + '/page1'}">${thread.title}</a></p>\n`;
  });
}
if (threads.content.length < limit) {
  document.getElementById('nextpage').style = 'display: none';
}
document.getElementById('list').innerHTML = html;
