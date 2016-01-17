"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

var $ = require('jquery');
var LoggerStore = require('./stores/LoggerStore');
var LoggerBox = require('./components/LoggerBox.react');


var Alert = require('react-bootstrap/lib/Alert');




/*
setInterval(() => {
AppDispatcher.dispatch({
        eventName: 'new-item',
        newItem: { name: 'Marco' } // example data
    });
}, 1000);
*/

window.$ = window.jQuery = require('jquery');




LoggerStore.load(()=>{
    console.log('asa');
	ReactDOM.render(
	  <LoggerBox />,
	  document.getElementById('content')
	);	
});