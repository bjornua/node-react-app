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
        if (get(action.setView) !== undefined) {
            return old.set("show", false);
        }
        if (get(action.setURL) !== undefined) {
            return old.set("show", false);
        }
        return old;
    }
});

module.exports = store;
