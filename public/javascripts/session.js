(function () {
  let request = require('./request');

  exports.getLogin = function () {
    console.log('getting session...');
    let session = request.get('/session');
    console.log('result: ' + session);
    if (session !== undefined && session.code === 0) {
      return session.content;
    } else {
      return undefined;
    }
  }
})();