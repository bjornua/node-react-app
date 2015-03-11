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
    console.log(String(store));
};

render = function () {
    React.render(env.createElement({
        dispatcher: dispatcher,
        window: window,
        onDispatch: onDispatch
    }), window.document);
};

render();
