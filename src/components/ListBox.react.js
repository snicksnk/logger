var React = require('react');
var ReactDOM = require('react-dom');
var RecordVars = require('./RecordVars.react');

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


module.exports = ListBox;