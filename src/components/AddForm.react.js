var React = require('react');
var ReactDOM = require('react-dom');

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


module.exports = AddForm;