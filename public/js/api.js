var fs = require('fs'),
    file = require('./js/file.js'),
    pass = require('./js/pass.js'),
    request = require('request');
var http = require('http');


request('curl https://www.inoreader.com/accounts/ClientLogin -d Email=' + pass.username + ' -d Passwd=' + pass.password + ' --verbose', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response);
  }
});



module.exports = {};