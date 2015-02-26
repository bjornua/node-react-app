/*global module, require, console */
"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");

var store = coldstorage.createStore({
    id: "user",
    update: function (old, get) {
        if (get(action.init) !== undefined) {
            return old.set("isAuthed", false);
        }
        if (get(action.signin) !== undefined) {
            var payload = get(action.signin);
            return old.merge({
                username: payload.get("username"),
                isAuthed: true
            });
        }
        if (get(action.signout) !== undefined) {
            return old.merge({
                isAuthed: false
            });
        }

        return old;
    }
});

module.exports = store;
