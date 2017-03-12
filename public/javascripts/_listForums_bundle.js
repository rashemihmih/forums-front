(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./request":2,"./urls":3}],2:[function(require,module,exports){
let urls = require('./urls');

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
},{"./urls":3}],3:[function(require,module,exports){
exports.frontend = 'http://localhost:3000';
exports.backend = 'http://localhost:8080';

},{}]},{},[1]);
