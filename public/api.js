var fs = require('fs'),
    file = require('./file.js'),
    pass = require('./pass.js'),
    csp = require('js-csp'),
    request = require('request');

var ch = csp.go(function*(x) {
  yield csp.timeout(5000);

  x = request('curl https://www.inoreader.com/accounts/ClientLogin -d Email=' + pass.username + ' -d Passwd=' + pass.password + ' --verbose', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return response;
    }
    else {
      return "Oh no, it didn't work.";
    }
  });

  return x;
});



module.exports = ch;