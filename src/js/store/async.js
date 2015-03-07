"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");
var Navigation = require("./navigation");
var Immutable = require("immutable");


var store = coldstorage.createStore({
    id: "async",
    update: function (old, get) {
        if (get(action.init) !== undefined) {
            return Immutable.fromJS({
                waiting: {},
                ready: {}
            });
        }

        var waiting = Immutable.List();
        if (get(action.setURL) !== undefined || get(action.setView)) {
            var handler = get(Navigation).get("handler");
            if (handler.async !== undefined) {
                var res = Immutable.fromJS(handler.async(get));

                waiting = waiting.push(res);
            }
        }
        old = old.update("waiting", function (oldwaiting) {
            return waiting.concat(oldwaiting);
        });

        return old;
    }
});

module.exports = store;
