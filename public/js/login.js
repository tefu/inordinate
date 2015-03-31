var React = require('react');

var d = React.DOM;

var Login = React.createClass({
  render: function () {
    return d.form({},
		  d.div({className: 'row'},
			d.div({className: 'six columns'},
			      d.label({}, 'Your username'),
			      d.input({className: ''}))),
		  d.input({className: 'button-primary', 
			   type: 'submit', 
			   value: 'Submit'}));
  }
});

module.exports = Login;
