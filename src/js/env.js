/*global module, require, console */
"use strict";

var _ = require("lodash");
var React = require("react");
var actions = require("./action");


function createDispatcher(initialURL) {
    var dispatcher = require("./dispatcher");
    dispatcher = dispatcher.dispatch(actions.init);
    dispatcher = dispatcher.dispatch(actions.setURL, {url: initialURL});

    return dispatcher;
}

function createElement(options) {
    var mainComponent = require("./main_component");
    var urls = require("./urls");

    return React.createElement(mainComponent, {
        urls: urls,
        store: options.dispatcher.get,
        onDispatch: options.onDispatch,
        window: options.window
    });
}



function mixin() {
    return {
        dispatch: function (eventname, payload) {
            return this.props.onDispatch(eventname, payload);
        },
        get: function () {
            return this.props.store(_.toArray(arguments));
        },
        createElement: function () {
            var args = _.toArray(arguments);
            args[1] = _.assign({
                onDispatch: this.props.onDispatch,
                store: this.props.store
            }, args[1]);
            return React.createElement.apply(null, args);
        },
        getChildHandler: function () {
            var next = this.props.handlers.first();
            var handlers = this.props.handlers.shift();
            return this.createElement(next, {handlers: handlers});

        }
    };
}

module.exports = {
    createElement: createElement,
    createDispatcher: createDispatcher,
    mixin: mixin
};
