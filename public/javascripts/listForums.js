let request = require('./request');
let urls = require('./urls');

let html = '';

let addForumToHtml = function (forum) {
  let title = forum.title;
  html += `<p><a href='${urls.frontend + '/forum/' + title}'>${title}</a></p>\n`;
};

let response = request.get('/api/forum/list');
if (response === undefined) {
  alert('Не удалось загрузить список форумов');
  return;
}
response = JSON.parse(response);
if (response.code !== 0) {
  alert(response.content);
  return;
}
response.content.forEach(addForumToHtml);
document.getElementById('forums-list').innerHTML = html;
