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
        if (error) {
          reject(error);
        }
        else {
          resolve(body);
        }
      });
    });
  }
  
  function parseId (auth) {
    return auth.map(function(a) {
      return a.split('=')[3].replace(/(\r\n|\n|\r)/gm,"");
    });
  }
  
  auth_token = parseId(auth(username, password));

  function apiRequest (directory, params) {
    return auth_token.chain(function (token) {
      params.T = token;
      return new Future(function(reject, resolve) {
        request.post(url + directory, { form: params},
          function (error, response, body) {
            if (error)
              reject(error);
            else {
              resolve(body);
            }
        });
      }).map(function (body) {
        return JSON.parse(body);
      });
    });
  }
  
  function userInfo() {
    return apiRequest('/reader/api/0/user-info', {});
  }
  
  function addSubscription (feedId) {
    return apiRequest('/reader/api/0/subscription/quickadd', {quickadd: feedId});
  }
  
  function editSubscription(params) {
    return apiRequest('/reader/api/0/subscription/edit', params);
  }
  
  function renameSubscription(feedId, title) {
    return editSubscription({ ac: 'edit', s: feedId, t: title});
  }
  
  function unreadCount () {
    return apiRequest('/reader/api/0/unread-count', {});
  }

  return {
    userInfo: userInfo,
    addSubscription: addSubscription,
    editSubscription: editSubscription,
    renameSubscription: renameSubscription,
    unreadCount: unreadCount
  };
};

