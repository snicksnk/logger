var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory;
var ReactDOM = require('react-dom');
var React = require('react');
var LoggerBox = require('./components/LoggerBox.react');


var Users = React.createClass({
	render(){
		return (
			<div>ss</div>
		)
	}
});

var NoMatch = React.createClass({
	render(){
		return (
			<div>Not found</div>
		)
	}
});




ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={LoggerBox}>
      <Route path="tag/:tag" >
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('content'));