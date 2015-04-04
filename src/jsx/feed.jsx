var React = require('react');

var Stream = React.createClass({
  
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
    var self = this;
    return (
      <ul>
        {self.props.items.map(function (item) {
          return (<div className='container'>
                <div className='row'>
                  <h2>
                    <a href={item.canonical[0].href}>{item.title}</a>
                  </h2>
                  <div dangerouslySetInnerHTML={{__html: self.addCSS(item.summary.content)}}></div>
                </div>
              </div>);
        })}
      </ul>);
  }
});

module.exports = Stream;
