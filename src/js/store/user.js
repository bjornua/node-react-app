/*global module, require, console */
'use strict';

var coldstorage = require('coldstorage');
var action = require('../action');

var store = coldstorage.createStore('user');

store = store.on([action.init], function () {
    return this.set('isAuthed', false);
});

store = store.on([action.signin], function (payload) {
    return this.merge({
        username: payload.get('username'),
        isAuthed: true
    });
});
store = store.on([action.signout], function () {
    return this.merge({
        isAuthed: false
    });
});

module.exports = store;