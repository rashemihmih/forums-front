exports.backendUrl = 'http://localhost:8080/api';

exports.post = function (url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', exports.backendUrl + url, false);
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
  xhr.open('GET', exports.backendUrl + url, false);
  try {
    xhr.send();
  } catch (err) {
    return undefined;
  }
  return xhr.responseText;
};