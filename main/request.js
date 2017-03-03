let backendUrl = require('../public/javascripts/request').backendUrl;
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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