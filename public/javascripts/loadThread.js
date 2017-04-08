let request = require('./request');
let urls = require('./urls');
let threadId = parseInt(document.getElementById('title').innerHTML, 10);
let thread = request.get(`/api/thread?id=${threadId}`);
if (thread === undefined) {
  alert('Не удалось загрузить посты');
  return;
}
thread = JSON.parse(thread);
if (thread.code !== 0) {
  alert(thread.content);
  return;
}
document.getElementById('title').innerHTML = thread.content.title;
document.getElementById('user').innerHTML = thread.content.user;
document.getElementById('creation').innerHTML = thread.content.creationTime;
document.getElementById('update').innerHTML = thread.content.lastUpdate;
document.getElementById('message').innerHTML = thread.content.message;
let page = parseInt(document.getElementById('page').innerHTML, 10);
let limit = 50;
let offset = (page - 1) * limit;
let posts = request.get(`/api/post/list?thread=${threadId}&offset=${offset}&limit=${limit}`);
if (posts === undefined) {
  alert('Не удалось загрузить посты');
  return;
}
posts = JSON.parse(posts);
if (posts.code !== 0) {
  alert(posts.content);
  return;
}
let html = '';
if (posts.content.length === 0) {
  html = 'Пусто'
} else {
  posts.content.forEach(post => {
    html += `<p>${post.creationTime} &#35;${post.id}<br>${post.parent === 0 ? '' : '&gt; &#35;' + post.parent + '<br>'}${post.user}:<br>${post.message}</p>\n`;
  });
}
document.getElementById('list').innerHTML = html;
