(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    location.href = `/thread/${response.content._id}/page1`;
  } else {
    alert(response.content);
  }
};
window.deleteT = function (id) {
            let payload =  {_id: id };
            let response = request.delete('/admin/thread', payload);
            if (response === undefined) {
                alert('Не удалось получить ответ от сервера');
                return;
            }
            response = JSON.parse(response);
            location.reload();
            if (response.code === 0) {
                document.getElementById('deleteThreadStatus').innerHTML = `Тема удалена: №${response.content}`;
            } else {
                document.getElementById('deleteThreadStatus').innerHTML = response.content;
            }
};
},{"./request":2}],2:[function(require,module,exports){
let backend = 'https://mzforums-backend-js.herokuapp.com';

exports.get = function (url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', backend + url, false);
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
  xhr.open('POST', backend + url, false);
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
  xhr.open('DELETE', backend + url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.withCredentials = true;
  try {
    xhr.send(JSON.stringify(data));
  } catch (err) {
    return undefined;
  }
  return xhr.responseText;
};
},{}]},{},[1]);
