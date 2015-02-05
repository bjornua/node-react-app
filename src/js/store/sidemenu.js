/*global module, require, console */
'use strict';

var coldstorage = require('coldstorage');
var action = require('../action');

var store = coldstorage.createStore('sidemenu');

store = store.on([action.init], function () {
    return this.set('show', true);
});
store = store.on([action.sidemenuShow], function () {
    return this.set('show', true);
});
store = store.on([action.sidemenuHide], function () {
    return this.set('show', false);
});

module.exports = store;