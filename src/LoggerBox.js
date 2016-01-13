var React = require('react');
var ReactDOM = require('react-dom');


var RecordVars = React.createClass({
	render() {
		var vars = this.props.vars.map(function(variable){
			return (
				<div>
				<b>{variable.flag}{variable.name}</b>{variable.value?"="+variable.value:""}<br/>
				</div>
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
		var listItems = this.props.records.map(function(item) {
			return (
				<li key={item.id}> 
					<a href={item.id}>{item.caption}</a> <RecordVars vars = {item.vars}/> 
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
		return {caption: "", id:-1};
	},
  	handleCaptionChange: function(e){
  		this.setState({caption: e.target.value})
  	},
  	handleSaveLog: function(e){
  		e.preventDefault();
  		this.setState({caption: "", id:-1});
  		this.props.onSave({caption: this.state.caption, id: this.state.id});
  	},

	render: function() {
	return (
		<div className="addForm">
			<form action="#" onSubmit={this.handleSaveLog}>
				<input type="text" placeholder="Enter your life log" value={this.state.caption} onChange={this.handleCaptionChange} />
				<input type="hidden" name="id" value={this.state.id} />
				<input type="submit" value="save"/>
			</form>
		</div>
	);
	}
});

var LoggerBox = React.createClass({
	getInitialState: function(){
		return {records: this.props.logger.records};
	},
	handleSave: function(data){
		var record = this.props.logger.create(data);
		this.props.logger.save(record);
		this.setState({'records': this.props.logger.records});
	},
	render: function() {
		return (
			<div className="loggerBox">
				Hello, world! I am a CommentBox.
				<AddForm onSave={this.handleSave}/>
				<ListBox records={this.state.records}/>
			</div>
		);
		}
});

module.exports =  (() => (LoggerBox))();