// Tutorial application for now.
// Most of the code used was found here:
// http://code.tutsplus.com/tutorials/introduction-to-html5-desktop-apps-with-node-webkit--net-36296

var file = require('file.js')
var pass = require('pass.js')
var gui = require('nw.gui')
var request = require('request');
var menu = new gui.Menu({ type: 'menubar' })
var win = gui.Window.get()

function clickInput(id) {
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click');
	document.getElementById(id).dispatchEvent(event);
}

document.addEventListener('keyup', function (e) {
  if (e.ctrlKey) {
    switch (e.keyCode) {
      case 'O'.charCodeAt(0): clickInput('open'); break;
      case 'S'.charCodeAt(0): clickInput('save'); break;
      case 'N'.charCodeAt(0): gui.Window.open('index.html'); break;
      case 'F'.charCodeAt(0): win.toggleFullscreen(); break;
      case 'M'.charCodeAt(0): win.toggleFullscreen(); break;
    }
  }
});

document.getElementById('open').addEventListener('change', function (e) {
	file.open(this.value, document);
});

document.getElementById('save').addEventListener('change', function (e) {
	file.save(this.value, document);
});

// Menu ------------------------------------------------------------------------
menu.append(new gui.MenuItem({
  label: 'File',
  submenu: new gui.Menu()
}));

menu.items[0].submenu.append(new gui.MenuItem({
	label: 'New',
	click: function () {
		gui.Window.open('index.html');
	}
}));

menu.items[0].submenu.append(new gui.MenuItem({
	type: 'separator'
}));

menu.items[0].submenu.append(new gui.MenuItem({
	label: 'Close',
	click: function () {
		gui.Window.get().close();
	}
}));

gui.Window.get().menu = menu;

request('https://www.inoreader.com/accounts/ClientLogin -d Email=' +
        pass.username + ' -d Passwd=' + pass.password + ' --verbose',
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(response)
          }
        })