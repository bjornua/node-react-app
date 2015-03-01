"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");
var UserStore = require("./user");
var Immutable = require("immutable");

var List = Immutable.List;
var Map = Immutable.Map;


var store = coldstorage.createStore({
    id: "menu",
    update: function (old, get) {
        var list = List();

        if (get(UserStore).get("isAuthed") !== true) {
            list = list.push(Map({dest: "user_create", title: "Create user"}));
            list = list.push(Map({dest: "user_signin", title: "Sign in"}));
        } else {
            list = list.push(Map({dest: "user_home", title: "Dashboard"}));
            list = list.push(Map({dest: "timer", title: "Timer Test App"}));
            // menu.push(Map({dest: "signout", title: "Signout"});
        }
        return list;
    }
});

module.exports = store;
