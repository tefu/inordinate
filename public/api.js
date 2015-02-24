var request = require('request'),
    http = require('http'),
    Future = require('data.future');

exports = module.exports;

exports.auth = function (username, password) {
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
};
