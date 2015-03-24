"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");
var Navigation = require("./navigation");
var Immutable = require("immutable");
var utils = require("../lib/utils");


var init = Immutable.fromJS({
    queued: {},
    waiting: {},
    ready: {}
});

var onNavigate = function (get) {
    var handler = get(Navigation).get("handler");
    var queued = queued;
    var res = Immutable.fromJS(handler.async(get));
    if (handler.async !== undefined) {
        var id = res.get("id");
        utils.assert(id, "id must be defined in {}", res);
        res = res.remove("id");
        return queued.set(id, res);
    }
    return Immutable.List();
};

var store = coldstorage.createStore({
    id: "async",
    update: function (old, get) {
        if (get(action.init) !== undefined) {
            return init;
        }
        var queued = old.get("queued");
        if (get(action.setURL) !== undefined || get(action.setView) !== undefined) {

        }

        old = old.update("queued", function (oldwaiting) {
            return queued.concat(oldwaiting);
        });

        if (get(action.asyncStart) !== undefined) {
            var items = get(action.asyncStart).get("items");
            queued = old.get("queued");
            
        }

        return old;
    }
});


var spawner = function (dispatcher) {
    var queued = dispatcher.get([store, "queued"]);

    console.log(queued.toJS());

    dispatcher = dispatcher.dispatch(action.asyncStart, {
        items: [1, 2, 3]
    });

    return dispatcher;
};



module.exports.store = store;
module.exports.spawner = spawner;
