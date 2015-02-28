var request = require('request'),
    http = require('http'),
    Future = require('data.future');

module.exports = function(username, password) {

  function auth (username, password) {
    return new Future(function(reject, resolve) {
      request.post('https://www.inoreader.com/accounts/ClientLogin',
                   { form: { Email: username, Passwd: password } },
      function (error, response, body) {
        if (error)
          reject(error);
        else
          resolve(body);
      });
    });
  }
  
  function parseId (auth) {
    return auth.map(function(a) {
      return a.split('=')[3];
    });
  }
  
  return parseId(auth(username, password));
};

