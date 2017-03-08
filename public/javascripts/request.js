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