var model = require('../model/LoggerModel');
var DropBoxStorage = require('../lib/DropBoxStorage');

var LoggerConstants = require('../constants/LoggerConstants');
var EventEmitter = require('events').EventEmitter;
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var logger = new model.Logger;
logger.storage = new DropBoxStorage('g4xttwd1x1pydyr');

var store = $.extend(logger, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(LoggerConstants.LOGGER_UPDATE, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(LoggerConstants.LOGGER_UPDATE, callback);
  },
  emitChange(){
    this.emit(LoggerConstants.LOGGER_UPDATE);
  }
});

store.emit(LoggerConstants.LOGGER_UPDATE);

store.addChangeListener(()=>{
  store.prepareFilter();
});

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case LoggerConstants.LOGGER_SAVE:
      var record = store.create(action.data);
      store.save(record);
      store.emitChange();
      break;
    case LoggerConstants.LOGGER_TAG:
      console.log(action);

      store.setFilterTag(action.tag);
      break;  
    default:
      // no op
  }
});


module.exports = logger;