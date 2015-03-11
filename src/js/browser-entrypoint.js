"use strict";

var React = require("react");
var env = require("./env");


var dispatcher = env.createDispatcher(
    window.document.location.pathname
);


var render, async, onDispatch;

onDispatch = function (action, payload) {
    dispatcher = dispatcher.dispatch(action, payload);
    async();
    render();
};

async = function () {
    var StoreAsync = require("./store/async");
    var queued = dispatcher.get([StoreAsync, "queued"]);

    queued.map(function (val) {
        console.log("Queueing");
    })
    console.log(String(store));

    dispatcher = dispatcher.dispatch
};

render = function () {
    React.render(env.createElement({
        dispatcher: dispatcher,
        window: window,
        onDispatch: onDispatch
    }), window.document);
};

render();
