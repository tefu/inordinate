var request = require('request'),
    http = require('http'),
    Future = require('data.future');

module.exports = function(username, password) {
  var url = 'https://www.inoreader.com',
      auth_token = '';

  function auth (username, password) {
    return new Future(function(reject, resolve) {
      request.post(url + '/accounts/ClientLogin',
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
      return a.split('=')[3].replace(/(\r\n|\n|\r)/gm,"");
    });
  }
  
  auth_token = parseId(auth(username, password));

  function userInfo () {
    return auth_token.chain(function (token) {
      return new Future(function(reject, resolve) {
        request.post(url + '/reader/api/0/user-info', 
                     { form: { T: token}},
          function (error, response, body) {
            if (error)
              reject(error);
            else {
              resolve(body);
            }
        });
      });
    });
  }
  
  
  return {
    userInfo: userInfo
  };
};

