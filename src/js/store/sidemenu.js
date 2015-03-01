/*global module, require, console */
"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");
// var storeNavigation = require("./navigation");

var store = coldstorage.createStore({
    id: "sidemenu",
    update: function (old, get) {
        if (get(action.init) !== undefined || get(action.sidemenuHide) !== undefined) {
            return old.set("show", false);
        }
        if (get(action.sidemenuShow) !== undefined) {
            return old.set("show", true);
        }
        return old;
    }
});

module.exports = store;
