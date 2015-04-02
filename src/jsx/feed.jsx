var React = require('react');

var d = React.DOM;

var Item = React.createClass({

  addCSS: function (html) {
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
  },

  render: function () {
    return d.div({className: 'container'},
		 d.div({className: 'row'},
		       d.h2({},
			    d.a({href: this.props.canonical[0].href}, this.props.title)),
		       d.div({dangerouslySetInnerHTML:
			      {__html: this.addCSS(this.props.summary.content)}})));
  }
});

var Stream = React.createClass({
  render: function () {
    return d.ul({},
      this.props.items.map(function (item) {
	return new Item(item);
      }));
  }
});

module.exports = Stream;
