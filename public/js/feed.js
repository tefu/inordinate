var React = require('react'),
  component = require('omniscient'),
  immstruct = require('immstruct');

var d = React.DOM;

var Item = component('Item', function (item) {
  var addCSS = function (html) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    var images = wrapper.querySelectorAll('img');
    for(var i = 0; i < images.length; i++)
    {
      images[i].className = 'u-max-full-width';
    }

    var ads = wrapper.querySelectorAll('center');

    for (var i = 0; i < ads.length; i++) {
      if (ads[i].innerHTML.match(/www.inoreader.com\/adv\/www/)) {
        ads[i].innerHTML = '';
      }
    }

    return wrapper.innerHTML;
  };

  return d.div({className: 'container'},
	       d.div({className: 'row'},
		     d.h2({},
			  d.a({href: item.canonical[0].href}, item.title)),
		     d.div({dangerouslySetInnerHTML:
			  {__html: addCSS(item.summary.content)}})));
});

var Stream = component('Stream', function (props) {
  var items = props.items;
  return d.ul({},
    items.map(function (item) {
      return Item(item);
    }));
});

module.exports = Stream;
