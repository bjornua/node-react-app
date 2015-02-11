/*global module, require, console */
'use strict';

var coldstorage = require('coldstorage');
var action = require('../action');
var storeNavigation = require('./navigation');

var store = coldstorage.createStore('sidemenu');

store = store.on([action.init, storeNavigation, action.sidemenuHide], function () {
    return this.set('show', false);
});
store = store.on([action.sidemenuShow], function () {
    return this.set('show', true);
});

module.exports = store;