"use strict";

var coldstorage = require("coldstorage");
var UserStore = require("./user");
var Immutable = require("immutable");

var IList = Immutable.List;
var IMap = Immutable.Map;


var store = coldstorage.createStore({
    id: "menu",
    update: function (old, get) {
        var list = IList();

        list = list.push(IMap({dest: "google_images", title: "Google Images"}));

        if (get(UserStore).get("isAuthed") !== true) {
            list = list.push(IMap({dest: "user_create", title: "Create user"}));
            list = list.push(IMap({dest: "user_signin", title: "Sign in"}));
        } else {
            list = list.push(IMap({dest: "user_home", title: "Dashboard"}));
            list = list.push(IMap({dest: "timer", title: "Timer Test App"}));
            // menu.push(Map({dest: "signout", title: "Signout"});
        }
        return list;
    }
});

module.exports = store;
