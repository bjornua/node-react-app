"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");
var Immutable = require("immutable");

var store = coldstorage.createStore({
    id: "network",
    update: function (old, get) {
        if (get(action.init) !== undefined) {
            return Immutable.fromJS({
                waiting: {},
                ready: {}
            });
        }
        return old;
    }
});

module.exports = store;
