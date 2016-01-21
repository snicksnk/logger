/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

 
var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoggerConstants = require('../constants/LoggerConstants');


var LoggerActions = {
  /**
   * @param  {string} text
   */
  save: function(data) {
    AppDispatcher.dispatch({
      actionType: LoggerConstants.LOGGER_SAVE,
      data: data
    });
  },
  setTag: function(tag) {
  	AppDispatcher.dispatch({
      actionType: LoggerConstants.LOGGER_TAG,
      tag: tag
    });
  }
};

module.exports  = LoggerActions;