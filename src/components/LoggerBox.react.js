var React = require('react');
var ReactDOM = require('react-dom');
var LoggerStore = require('../stores/LoggerStore');
var LoggerActions = require('../actions/LoggerActions');
var $ = require('jquery');

var ListBox = require('./ListBox.react');
var AddForm = require('./AddForm.react');

var LoggerBox = React.createClass({

	componentDidMount: function() {
		LoggerStore.addChangeListener(this._onChange);
		LoggerActions.setTag(this.props.params.tag);
	},

	componentWillUnmount: function() {
		LoggerStore.removeChangeListener(this._onChange);
	},

	getInitialState: function(){
		return $.extend(this._getLoggerState(), {record: {}});
	},

	_onChange: function(){
		this.setState(this._getLoggerState());
	},

	_getLoggerState: function(){
		return {records: LoggerStore.records};
	},

	handleSave: function(data){
		console.log('save data', data);
		LoggerActions.save(data);
		this.setState({'editRecord':false});
	},

	handleEdit: function(data){
		console.log('handle edir', data)
		this.setState({'editRecord':data});
	},

	componentWillReceiveProps: function(newProps){

	},

	render: function() {
		console.log('rerender loggerBox',this.state);
		console.log(this.props.children);
		return (
			<div className="loggerBox">
				! {this.props.children} !
				<AddForm onSave={this.handleSave} record={this.state.editRecord} />
				<ListBox onEdit={this.handleEdit} records={this.state.records}/>
			</div>
		);
		}
});

module.exports =  (() => (LoggerBox))();