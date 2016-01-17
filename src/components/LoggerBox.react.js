var React = require('react');
var ReactDOM = require('react-dom');
var LoggerStore = require('../stores/LoggerStore');
var LoggerActions = require('../actions/LoggerActions');



var RecordVars = React.createClass({
	render() {
		var vars = this.props.vars.map(function(variable){
			var flagClass = 'label-primary';
			switch(variable.flag){
				case('#'):
					flagClass = "label-success"
					break;
				case('_'):
					flagClass = "label-default"
					break;	
				case('$'):
					flagClass = "label-danger"
					break;		
			}
			return (
				<span>
					<span className={'label ' + flagClass}>
						<b>{variable.flag}{variable.name}</b>{variable.value?"="+variable.value:""}
					</span> &nbsp;
				</span>	
			);
		});
		return (
		  <div>
		    {vars}
		  </div>
		)
	}
})



var ListBox = React.createClass({
	render: function() { 
		var editClick = (item) => {
			this.props.onEdit(item);
		}
		var listItems = this.props.records.map(function(item) {
			return (
				<li key={item.id}> 
					<a href="#" onClick={editClick.bind(this, item)} >{item.caption}</a> <RecordVars vars = {item.vars}/> 
				</li> 
			); 
		}); 

		return (
			<ul className="listBox">
				{listItems}
			</ul>
		);
	}
});



var AddForm = React.createClass({
	getInitialState: function(){
		var record = {caption: "" , id:-1};
		return {record: record};
	},


	componentDidMount: function() {
		//LoggerStore.addChangeListener(this._onChange);
	},


  	handleCaptionChange: function(e){
  		var id = this.state.record.id,
  			caption = e.target.value;
  		this.setState({record: {caption: caption, id: id}})
  	},
  	handleSaveLog: function(e){
  		e.preventDefault();
  		this.props.onSave(this.state.record);
  		this.setState({record:{caption: "", id:-1}});
  	},

  	componentWillReceiveProps: function(newProps, oldPr){
  		console.log('add form receive props',this.props.record);
  		if (newProps.record){	
  			this.setState({record:newProps.record});
  			return true;
  		}
  	},

	render: function() {
	return (
		<div className="addForm">
			<form action="#" onSubmit={this.handleSaveLog}>
				<input className="form-control" type="text" placeholder="Enter your life log" value={this.state.record.caption} onChange={this.handleCaptionChange} />
				<input type="hidden" name="id" value={this.state.record.id} />
			</form>
		</div>
	);
	}
});
//LoggerBox
var LoggerBox = React.createClass({

	componentDidMount: function() {
		LoggerStore.addChangeListener(this._onChange);
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

	render: function() {
		console.log('rerender loggerBox',this.state);
		return (
			<div className="loggerBox">
				<AddForm onSave={this.handleSave} record={this.state.editRecord} />
				<ListBox onEdit={this.handleEdit} records={this.state.records}/>
			</div>
		);
		}
});

module.exports =  (() => (LoggerBox))();