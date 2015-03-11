var React = require('react'),
  component = require('omniscient'),
  immstruct = require('immstruct');

var d = React.DOM;

var Item = component('Item', function (item) {
  return d.div({
      className: 'container'
    },
    d.div({
        className: 'row'
      },
        d.h2({}, item.title),
        d.p({
          dangerouslySetInnerHTML: {
            __html: item.summary.content
          }
        })
    ));
});

var Stream = component('Stream', function (props) {
  var items = props.cursor.deref().toJS().items;
  return d.ul({},
    items.map(function (item) {
      return Item(item);
    }));
});

module.exports = Stream;
