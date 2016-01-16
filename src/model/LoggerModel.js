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
		this.records = [];
		this.storage = null;
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
		return this.records[id-1];
	}

	save(record, noStore) {
		if (record.id !== -1){
			this.records[record.id-1] = record;
		} else {
			this.records.push(record);
			record.id = this.records.length;
		}

		if (!noStore){
			this.store();
		}
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
		var data = JSON.stringify(this.records);
		this.storage.store(data);
	}
} 


module.exports = {
	Varible: Varible,
	Record: Record,
	Logger: Logger
}