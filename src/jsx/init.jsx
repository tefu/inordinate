module.exports = function () {
  var Mousetrap = require('mousetrap');

  Mousetrap.bind("ctrl+shift+i", function () {
    window.require('nw.gui').Window.get().showDevTools();
  });

  Mousetrap.bind("ctrl+r", function () {
    window.require('nw.gui').Window.open('index.html');
  });
};
