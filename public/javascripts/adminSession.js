let request = require('./request');

let session = request.get('/admin/session');
if (session !== undefined) {
  session = JSON.parse(session);
  if (session.code === 0) {
    window.onload = () => {
      document.getElementById('username').innerHTML = session.content;
    };
    return;
  }
}
location.href = '/admin/login';