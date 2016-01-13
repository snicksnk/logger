"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

var Logger = require('./model.js').Logger;
var LoggerBox = require('./LoggerBox');
var DropBoxStorage = require('./DropBoxStorage');

var Alert = require('react-bootstrap/lib/Alert');


window.$ = window.jQuery = require('jquery');




var logger = new Logger();
logger.storage = new DropBoxStorage('g4xttwd1x1pydyr');


logger.load(()=>{
	ReactDOM.render(
	  <LoggerBox logger = {logger} />,
	  document.getElementById('content')
	);	
});