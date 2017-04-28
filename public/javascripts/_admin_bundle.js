(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let request = require("./request");

window.logout = function () {
  let response = request.delete('/admin/session', {});
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.href = '/admin/login';
  } else {
    alert(response.content);
  }
};

window.deleteUser = function (form) {
  let payload = {
    login: form.elements['login'].value.trim()
  };
  let response = request.delete('/admin/user', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('deleteUserStatus').innerHTML = `Пользователь удален: ${response.content}`;
  } else {
    document.getElementById('deleteUserStatus').innerHTML = response.content;
  }
};

window.createForum = function (form) {
  let payload = {
    title: form.elements['title'].value.trim()
  };
  let response = request.post('/admin/forum', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('createForumStatus').innerHTML = `Раздел создан: ${response.content}`;
  } else {
    document.getElementById('createForumStatus').innerHTML = response.content;
  }
};

window.deleteForum = function (form) {
  let payload = {
    title: form.elements['title'].value.trim()
  };
  let response = request.delete('/admin/forum', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('deleteForumStatus').innerHTML = `Раздел удален: ${response.content}`;
  } else {
    document.getElementById('deleteForumStatus').innerHTML = response.content;
  }
};

window.renameForum = function (form) {
  let payload = {
    oldTitle: form.elements['oldTitle'].value.trim(),
    newTitle: form.elements['newTitle'].value.trim()
  };
  let response = request.post('/admin/forum/rename', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('renameForumStatus').innerHTML = `Раздел переименован: ${response.content}`;
  } else {
    document.getElementById('renameForumStatus').innerHTML = response.content;
  }
};

window.deleteThread = function (form) {
  let payload = {
    id: form.elements['id'].value.trim(),
  };
  let response = request.delete('/admin/thread', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('deleteThreadStatus').innerHTML = `Тема удалена: №${response.content}`;
  } else {
    document.getElementById('deleteThreadStatus').innerHTML = response.content;
  }
};

window.deletePost = function (form) {
  let payload = {
    id: form.elements['id'].value.trim(),
  };
  let response = request.delete('/admin/post', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('deletePostStatus').innerHTML = `Пост удален: №${response.content}`;
  } else {
    document.getElementById('deletePostStatus').innerHTML = response.content;
  }
};
},{"./request":2}],2:[function(require,module,exports){
let backend = 'https://mzforums-backend.herokuapp.com';

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
