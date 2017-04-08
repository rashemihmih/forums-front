(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./request":2,"./urls":3}],2:[function(require,module,exports){
let urls = require('./urls');

exports.get = function (url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', urls.backend + url, false);
  xhr.withCredentials = true;
  try {
    xhr.send();
  } catch (err) {
    return undefined;
  }
  return xhr.responseText;
};

exports.post = function (url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', urls.backend + url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.withCredentials = true;
  try {
    xhr.send(JSON.stringify(data));
  } catch (err) {
    return undefined;
  }
  return xhr.responseText;
};

exports.delete = function (url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', urls.backend + url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.withCredentials = true;
  try {
    xhr.send(JSON.stringify(data));
  } catch (err) {
    return undefined;
  }
  return xhr.responseText;
};
},{"./urls":3}],3:[function(require,module,exports){
exports.frontend = 'http://localhost:3000';
exports.backend = 'http://localhost:8080';

},{}]},{},[1]);
