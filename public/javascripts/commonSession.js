let request = require('./request');
let urls = require('./urls');

let session = request.get('/api/session');
if (session !== undefined) {
  session = JSON.parse(session);
  if (session.code === 0) {
    return;
  }
}
location.href = urls.frontend;