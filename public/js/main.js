// Tutorial application for now.
// Most of the code used was found here:
// http://code.tutsplus.com/tutorials/introduction-to-html5-desktop-apps-with-node-webkit--net-36296

var fs = require('fs'),
    file = require('./js/file.js'),
    pass = require('pass.js'),
    gui = require('nw.gui'),
    request = require('request'),
    React     = require('react'),
    component = require('omniscient'),
    Immutable = require('immutable'),
    immstruct = require('immstruct');

var d = React.DOM;

var data = immstruct({ numbers: {} });

var Bucket = component('Bucket', function (props, statics) {
  var numbers = props.number.toArray();
  return d.li({},
              d.b({}, 'Bucket #', statics.label, ' '),
              d.span({}, '(', numbers.reduce(function (acc, n) {
                return acc + 1;
              }, 0), ')'),
              ': ',
              numbers.map(function (number, key) {
                return number;
              }));
});

var Buckets = component('Buckets', function (props) {
  var labels = Object.keys(props.cursor.toJS());
  return d.ul({},
              props.cursor.toArray().map(function (number, i) {
                return Bucket('bucket-' + i, { number: number, statics: { label: labels[i] } });
              }));
});

function render () {
  React.render(
    Buckets(data.cursor('numbers')),
    document.getElementById('app'));
}

render();
data.on('swap', render);

setInterval(function () {
  var bucket = parseInt(Math.random() * 30);
  var number = parseInt(Math.random() * 10);

  data.cursor(['numbers', bucket]).update(function (state) {
    if (!state) {
      return Immutable.List.of(number);
    }
    return state.unshift(number);
  });
}, 30);