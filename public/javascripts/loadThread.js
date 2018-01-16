let request = require('./request');

let threadId = document.getElementById('id').innerHTML;
let thread = request.get(`/api/thread?_id=${threadId}`);
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
let forumUrl = document.getElementById('forum');
forumUrl.href = `/forum/${thread.content.forum}/page1`;
forumUrl.innerHTML = thread.content.forum;
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
    html = 'Ответов нет'
} else {
    posts.content.forEach(post => {
        html += `<p id="${post._id}">${post.creationTime}<button class="button button-clear" onclick="reply('${post._id}');">${post._id}</button><br>${post.parent === '' ? '' : 'В ответ на <a class="button button-clear" href=#' + post.parent + '>' + post.parent + '</a><br>'}${post.user}:<br>${post.message}</p>\n`;
    });
}
if (posts.content.length < limit) {
    document.getElementById('nextpage').style = 'display: none';
}
document.getElementById('list').innerHTML = html;