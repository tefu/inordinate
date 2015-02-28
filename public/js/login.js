var React     = require('react'),
    component = require('omniscient'),
    immstruct = require('immstruct');

var d = React.DOM;

var Login = component('Login', function (props) {
  return d.form({},
                d.div({className: 'row'},
		      d.div({className: 'six columns'},
                            d.label({}, 'Your username'),
                            d.input({className: ''}))),
                d.input({className: 'button-primary', 
                         type: 'submit', 
                         value: 'Submit'}));
});

module.exports = Login;
