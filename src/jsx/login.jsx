var React = require('react');

var Login = React.createClass({
  render: function () {
    return <form>
             <div classname='row'>
               <div classname='six columns'>
                 <label>Your username</label>
                 <input/>
               </div>
             </div>
             <input className='button-primary' type='submit' value='Submit'/>
           </form>;
  }
});

module.exports = Login;
