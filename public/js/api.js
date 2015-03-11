var request = require('request'),
  http = require('http'),
  urlencode = require('urlencode'),
  Q = require('q');

module.exports = function (username, password) {
  var url = 'https://www.inoreader.com',
    api_dir = '/reader/api/0',
    auth_token = null;

  function auth(username, password) {
    var defer = Q.defer();
    request.post(url + '/accounts/ClientLogin', {
        form: {
          Email: username,
          Passwd: password
        }
      },
      function (error, response, body) {
        if (error) {
          defer.reject(error);
        } else {
          defer.resolve(body);
        }
      });

    return defer.promise;
  }

  function parseId(auth) {
    return auth.split('=')[3].replace(/(\r\n|\n|\r)/gm, "");
  }

  auth_token = auth(username, password).then(parseId);

  function apiRequest(directory, params) {
    return auth_token.then(function (token) {
      var defer = Q.defer();
      params.T = token;
      request.post(url + api_dir + directory, {
          form: params
        },
        function (error, response, body) {
          if (error)
            defer.reject(error);
          else {
            defer.resolve(body);
          }
        });
      return defer.promise;
    });
  }

  function JSONRequest(directory, params) {
    return apiRequest(directory, params).then(JSON.parse);
  }

  function userInfo() {
    return JSONRequest('/user-info', {});
  }

  function addSubscription(feedId) {
    return JSONRequest('/subscription/quickadd', {
      quickadd: feedId
    });
  }

  function editSubscription(params) {
    return apiRequest('/subscription/edit', params);
  }

  function renameSubscription(feedId, title) {
    return editSubscription({
      ac: 'edit',
      s: feedId,
      t: title
    });
  }

  function unreadCount() {
    return JSONRequest('/unread-count', {});
  }

  function token() {
    return auth_token;
  }

  function subscriptionList() {
    return JSONRequest('/subscription/list', {});
  }

  function foldersAndTags() {
    return JSONRequest('/tag/list', {});
  }

  function streamContents(streamId) {
    return JSONRequest('/stream/contents/' + urlencode(streamId), {});
  }

  return {
    userInfo: userInfo,
    addSubscription: addSubscription,
    editSubscription: editSubscription,
    renameSubscription: renameSubscription,
    unreadCount: unreadCount,
    token: token,
    subscriptionList: subscriptionList,
    foldersAndTags: foldersAndTags,
    streamContents: streamContents
  };
};
