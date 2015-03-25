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

var funcs = [
    function (state, get) {
        if (get(action.init) !== undefined) {
            return init;
        }
        return state;
    },
    function (state, get) {
        var queued = state.get("queued");
        if (get(action.setURL) !== undefined || get(action.setView) !== undefined) {
            var handler = get(Navigation).get("handler");
            var res = Immutable.fromJS(handler.async(get));
            if (handler.async !== undefined) {
                var id = res.get("id");
                utils.assert(id, "id must be defined in {}", res);
                res = res.remove("id");
                queued.set(id, res);
            }
        }
        return state;
    },
    function (state, get) {
        if (get(action.asyncStart) !== undefined) {
            var items = get(action.asyncStart).get("items");
            queued = state.get("queued");
        }
        return state;
    }
];

var store = coldstorage.createStore({
    id: "async",
    update: function (state, get) {


        return state;
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
