let request = require('./request');

let session = request.get('/api/session');
if (session !== undefined) {
  session = JSON.parse(session);
  if (session.code === 0) {
    location.href = '/forums';
  }
}
