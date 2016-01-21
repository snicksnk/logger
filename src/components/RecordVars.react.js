var React = require('react');
var ReactDOM = require('react-dom');

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
});

module.exports = RecordVars;