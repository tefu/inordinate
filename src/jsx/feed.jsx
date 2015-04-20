var React = require('react'),
    query = require('./domquery');

var Stream = React.createClass({

  getInitialState: function () {
    return {activeId: 0};
  },

  isActive: function (postId) {
    return this.state.activeId == postId;
  },

  render: function () {
    var self = this;
    return (
      <ul>
        {self.props.items.map(function (item, index) {
          if (self.isActive(item.id)) {
            return (
            <div key={item.id} className='container'>
              <div className='row'>
                <div className='col-md-9'>
                  <h2 className='page-header'>
                    <a href={item.canonical[0].href}>{item.title}</a>
                  </h2>
                  <div dangerouslySetInnerHTML={{__html:
                    query.addCSSToFeed(query.removeAds(item.summary.content))}}>
                  </div>
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
