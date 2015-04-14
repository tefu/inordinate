var React = require('react');

var Stream = React.createClass({
  
  addCSS: function (html) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    var addClass = function (query, name) {
      var elements = wrapper.querySelectorAll(query);
      
      for(var i = 0; i < elements.length; i++) {
        elements[i].className = name;
      }
    }

    addClass('img','img-responsive');
    addClass('iframe','embed-responsive-item');

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
                      <div className='col-md-9'>
                        <h2 className='page-header'>
                          <a href={item.canonical[0].href}>{item.title}</a>
                        </h2>
                        <div dangerouslySetInnerHTML={{__html: self.addCSS(item.summary.content)}}></div>
                      </div>
                    </div>
                  </div>);
        })}
      </ul>);
  }
});

module.exports = Stream;
