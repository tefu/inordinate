var NwBuilder = require('node-webkit-builder');
var nw = new NwBuilder({
  files: './public/**/**', // use the glob format 
  platforms: ['win', 'linux32', 'linux64', 'osx'],
  version: '0.11.3',
  buildDir: 'target'
});

nw.on('log', console.log);

nw.build().then(function () {
  console.log('all done!');
}).catch(function (error) {
  console.error(error);
});
