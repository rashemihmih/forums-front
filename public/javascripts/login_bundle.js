(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let backendUrl = 'http://localhost:8080/api';
exports.backendUrl = backendUrl;

exports.post = function (url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', backendUrl + url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  try {
    xhr.send(JSON.stringify(data));
  } catch (err) {
    return undefined;
  }
  return xhr.responseText;
};

exports.get = function (url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', backendUrl + url, false);
  try {
    xhr.send();
  } catch (err) {
    return undefined;
  }
  return xhr.responseText;
};
},{}],2:[function(require,module,exports){
let request = require("./request.js");

window.requestLogin = function (form) {
  let data = {
    login: form.elements['login'].value,
    password: form.elements['password'].value
  };
  let response = request.post('/user', data);
  if (response === undefined) {
    alert('undefined');
    return;
  }
  if (response.code === 0) {
    alert('hello, ' + response.content);
  } else {
    alert(response.content);
  }
};

},{"./request.js":1}]},{},[2]);
