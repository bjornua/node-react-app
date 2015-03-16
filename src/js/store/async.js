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
                queued: {},
                waiting: {},
                ready: {}
            });
        }

        var queued = Immutable.List();
        if (get(action.setURL) !== undefined || get(action.setView)) {
            var handler = get(Navigation).get("handler");
            if (handler.async !== undefined) {
                var res = Immutable.fromJS(handler.async(get));

                queued = queued.push(res);
            }
        }
        old = old.update("queued", function (oldwaiting) {
            return queued.concat(oldwaiting);
        });


        if (get(action.asyncStart) !== undefined) {
            var id = get(action.asyncStart).get("id");
            var item = old.get("");

            console.log(id);
        }

        return old;
    }
});

module.exports = store;
