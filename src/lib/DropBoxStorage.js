"use strict";
class DropBoxStorage {
	constructor(appKey){
		this.appKey = appKey;
		this._client = new Dropbox.Client({key: this.appKey});

	}

	load(callback){
		this.getClient((client) => {
			client.readFile('pragma-logger/save.json', {}, callback);
		});
	}

	store(data){
		this.getClient((client)=>{
			client.writeFile('pragma-logger/save.json', data);
		});
	}

	getClient(callback){
		if (this._client.isAuthenticated()) { 
			callback(this._client); 
		} else {
			this._client.authenticate({}, ()=>{	
				callback(this._client); 
			});
		}
	}

}

module.exports = (() => (DropBoxStorage))();