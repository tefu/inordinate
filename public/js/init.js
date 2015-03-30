var Mousetrap = require('mousetrap');

window.onload = function() {
  require('./js/main.js');
};

Mousetrap.bind("ctrl+shift+i", function() {
  require('nw.gui').Window.get().showDevTools();
});
