/*global module, require, console */
"use strict";

var _ = require("lodash");
var React = require("react");
var actions = require("./action");

function create(initialURL, window, onStore) {
    var dispatcher = require("./dispatcher");
    var mainComponent = require("./main_component");
    var urls = require("./urls");

    dispatcher = dispatcher.dispatch(actions.init);
    dispatcher = dispatcher.dispatch(actions.setURL, {url: initialURL});
    var onDispatch = function (action, payload) {
        dispatcher = dispatcher.dispatch(action, payload);
        onStore(dispatcher.get);
    };
    return React.createElement(mainComponent, {
        urls: urls,
        store: dispatcher.get,
        onDispatch: onDispatch,
        window: window
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
    create: create,
    mixin: mixin
};
