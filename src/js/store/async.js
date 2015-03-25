"use strict";

var coldstorage = require("coldstorage");
var action = require("../action");
var Navigation = require("./navigation");
var Immutable = require("immutable");
var utils = require("../lib/utils");


var onNavigate = function (get) {

};

var store = coldstorage.createStore({
    id: "async",
    init: function () {
        return {
            queued: {},
            waiting: {},
            ready: {}
        };
    },
    asyncStart: function (old, get) {
    },
    _onNavigate: function(old, get) {
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
    },
    default: function (old, get) {
        var queued = old.get("queued");
        if (get(action.setURL) !== undefined || get(action.setView) !== undefined) {
            
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
