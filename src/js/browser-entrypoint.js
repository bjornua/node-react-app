"use strict";

var React = require("react");
var env = require("./env");
var action = require("./action");

var dispatcher = env.createDispatcher(
    window.document.location.pathname
);


var async = function () {
    var StoreAsync = require("./store/async");
    var queued = dispatcher.get([StoreAsync, "queued"]);

    queued.map(function (val) {
        console.log("Queueing");
    });
    console.log(String(queued));
    dispatcher = dispatcher.dispatch(action.asyncStart, {});
};

var render;
var update = function () {
    async();
    render();
};

render = function () {
    React.render(env.createElement({
        dispatcher: dispatcher,
        window: window,
        onDispatch: function (action, payload) {
            dispatcher = dispatcher.dispatch(action, payload);
            update();
        }
    }), window.document);
};

update();
