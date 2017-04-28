let request = require('./request');

let response = request.get('/api/forum/list');
if (response === undefined) {
  alert('Не удалось загрузить список разделов');
  return;
}
response = JSON.parse(response);
if (response.code !== 0) {
  alert(response.content);
  return;
}
let html = '';
response.content.forEach(forum => {
  let title = forum.title;
  html += `<p><a href='${'/forum/' + forum.title + '/page1'}'>${forum.title}</a></p>\n`;
});
document.getElementById('list').innerHTML = html;
