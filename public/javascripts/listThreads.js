let request = require('./request');
let adses = request.get('/admin/session');
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
    adses = JSON.parse(adses);
    if (adses.code === 0) {
        threads.content.forEach(thread => {
            html += `<p id="${thread._id}"><a href="${'/thread/' + thread._id + '/page1'}">${thread.title}${thread.title}</a><button class="button button-outline forums__button-inline" onclick="deleteT('${thread._id}');">Удалить</button></p>\n`;
        });
    } else {
        threads.content.forEach(thread => {
            html += `<p><a href="${'/thread/' + thread._id + '/page1'}">${thread.title}</a></p>\n`;
        });
    }
}
if (threads.content.length < limit) {
    document.getElementById('nextpage').style = 'display: none';
}
document.getElementById('list').innerHTML = html;
