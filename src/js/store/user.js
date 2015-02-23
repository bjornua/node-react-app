/*global module, require, console */
"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");

var store = coldstorage.createStore({
    id: "user",
    update: function (old, has, get) {
        if (has(action.init)) {
            return old.set("isAuthed", false);
        }
        if (has(action.signin)) {
            var payload = get(action.signin);
            return old.merge({
                username: payload.get("username"),
                isAuthed: true
            });
        }
        if (has(action.signout)) {
            return old.merge({
                isAuthed: false
            });
        }

        return old;
    }
});

module.exports = store;
