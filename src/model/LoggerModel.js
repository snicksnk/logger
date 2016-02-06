"use strict";

var _ = require('underscore');
var constants = require('../constants/LoggerConstants');



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

    hasVar(varName){
    	console.log(varName);
    	var result = _.find(this.vars, (variable)=>{
    		console.log(varName, variable.name); 
    		return (variable.name === varName || variable.flag + variable.name === varName); 
    	});

    	if (result){
    		console.log('capt', this._caption);
    		return true;
    	} else {
    		return false;
    	}
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
		this._records = [];
		this.storage = null;
		this._set = [];
		this._filter = () => {
			this._set = this._records;
		};
	}

	create(data){
		var record = new Record();
		this.populate(record, data);
		return record;
	}

	populate(record, data){
		_.forEach(data, function(val, key){
			record[key] = val;
		});
	}

	get(id) {
		return this._records[id-1];
	}

	save(record, noStore) {
		if (record.id !== -1){
			this._records[record.id-1] = record;
		} else {
			this._records.push(record);
			record.id = this._records.length;
		}

		if (!noStore){
			this.store();
		}
	}

	prepareFilter(){
		this._filter();
	}

	setFilterTag(tag){


		console.log(tag, this._records);
		if (tag){
			this._filter = () => {

				console.log('full list', this._records);
				this._set = _.filter(this._records, (record)=>{
					if(record){
						return record.hasVar(tag);
					}
				});
			}
		}

	}

	get records(){
		return this._set.reverse();
	}

	load(compleateCallback) {
		/*
		var record = this.create({id:-1, caption:'Покупка слона #money $sum="23000" _date="23.01.2016"'});
		this.save(record);
		var record = this.create({id:-1, caption:'There #tag2 $val1="ne" $val="sdds23"'});
		this.save(record);
		*/
		this.storage.load((error, data) => {
			_.forEach(JSON.parse(data), (dump) => {
				var record = this.create(dump)

				this.save(record, true);
			});

			//this.store();

			compleateCallback();
		})

	}

	store() {
		var data = JSON.stringify(this._records);
		this.storage.store(data);
	}
} 


module.exports = {
	Varible: Varible,
	Record: Record,
	Logger: Logger
}