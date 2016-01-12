var React = require('react');
var ReactDOM = require('react-dom');

var Logger = require('./model.js').Logger;
var LoggerBox = require('./LoggerBox');



ReactDOM.render(
  <LoggerBox logger = {new Logger} />,
  document.getElementById('content')
);