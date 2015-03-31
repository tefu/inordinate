module.exports = function () {
  var Mousetrap = require('mousetrap');

  if (process.env.NW_DEV_INORDINATE == 1) {
    Mousetrap.bind("ctrl+shift+i", function () {
      window.require('nw.gui').Window.get().showDevTools();
    });

    Mousetrap.bind("ctrl+r", function () {
      window.require('nw.gui').Window.open('index.html');
    });
  }
};
