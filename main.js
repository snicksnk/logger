// tutorial1.js


class Varible {
	constructor(){
		this._rawData;
		this._flag;
		this._name;
		this._value;
	}
}

class Record {
    constructor() {
        this.id = -1;
        this._caption = "";
        this.vars = [];
    }

    set caption(caption) {
    	this._caption = caption;
    	this.parseVaribles(caption);
    }

    get caption() {
    	return this._caption;
    }

    parseVaribles(caption){
    	var re = /([#@_$])([a-zA-Z]+)(?:=?"([^\s"]+)"?)?/g,
    	m;

    	this.vars = [];

    	while ((m = re.exec(caption)) !== null) {
			if (m.index === re.lastIndex) {
			    re.lastIndex++;
			}
			// View your result using the m-variable.
			// eg m[0] etc.
			console.log(m);

			let flag = m[1];
			let name = m[2];
			let value = m[3];

			var variable = new Varible();
			variable.flag = flag;
			variable.name = name;
			variable.value = value;
			this.vars.push(variable);
		}
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}


class Logger {
	constructor() {
		this.records = [];
		this.load();
	}

	create(data){
		var record = new Record();
		console.log(data);
		this.populate(record, data);
		return record;
	}

	populate(record, data){
		_.forEach(data, function(val, key){
			console.log('set', key, val);
			record[key] = val;
		});
	}

	get(id) {
		return this.records[id-1];
	}

	save(record) {
		if (record.id !== -1){
			this.records[record.id-1] = record;
		} else {
			this.records.push(record);
			record.id = this.records.length;
		}
	}

	load() {
		var record = this.create({id:-1, caption:'Покупка слона #money $sum="23000" _date="23.01.2016"'});
		this.save(record);
		var record = this.create({id:-1, caption:'There #tag2 $val1="ne" $val="sdds23"'});
		this.save(record);
	}

}


var RecordVars = React.createClass({
	render() {
		var vars = this.props.vars.map(function(variable){
			console.log(variable);
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
  	/*componentDidMount: function() {
    	$.ajax({
      		url: this.props.url,
      		dataType: 'json',
      		cache: false,
      		success: function(data) {
        		this.setState({items: data.items});
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(this.props.url, status, err.toString());
      		}.bind(this)
    }
    );
  	},
    */
	render: function() {
		console.log(this.props.records);
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
		console.log(data);
		var record = this.props.logger.create(data);
		this.props.logger.save(record);
		this.setState({'records': this.props.logger.records});
		console.log(this.state.records);
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


ReactDOM.render(
  <LoggerBox logger = {new Logger()} />,
  document.getElementById('content')
);



// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).

var App = React.createClass({
  render() {
    return (
      <div>
        <h2>РHello</h2>
         <ul>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>

        {/* etc. */}

        !{this.props.children}!
      </div>
    )
  }
});


var NoMatch = React.createClass({
  render() {
    return (
      <div>
        <h2>NOT FOUND</h2>
      </div>
    )
  }
})


//import { render } from 'react-dom'
//import { Router, Route, Link, browserHistory } from 'react-router'

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var Link = ReactRouter.Link;

var render = ReactDOM.render;




let LogerWrapper = () => <LoggerBox logger = {new Logger()} />;

/*
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>x`
    	<Route path="tasks" component={LogerWrapper} />
      	<Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('cont'))
*/
/*
<Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
*/