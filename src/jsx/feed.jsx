var React = require('react');

var Stream = React.createClass({

  getInitialState: function () {
    return {activeId: 0};
  },

  isActive: function (postId) {
    return this.state.activeId == postId;
  },
  
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
        {self.props.items.map(function (item, index) {
          if (self.isActive(item.id)) {
            // FIXME: calculate the width of a collapsed post.
            window.scrollTo(0, index*20); 
            return (
            <div key={item.id} className='container'>
              <div className='row'>
                <div className='col-md-9'>
                  <h2 className='page-header'>
                    <a href={item.canonical[0].href}>{item.title}</a>
                  </h2>
                  <div dangerouslySetInnerHTML={{__html: 
                  self.addCSS(item.summary.content)}}></div>
                </div>
              </div>
            </div>);
          }
          else {
            return (
              <li className="inactive-post"
                  key={item.id}
                  onClick={function () {
                    self.setState({activeId: item.id});
                  }}>{item.title}</li>
            );
          }
        })}
      </ul>);
  }
});

module.exports = Stream;


