/*global module, require, console */
"use strict";

var React = require("react");
var actions = require("./action");
// var Q = require("q");
var _ = require("lodash");

// var NavigationStore = require("./store/navigation");


function create(initialURL, window) {
    var dispatcher = require("./dispatcher");
    var mainComponent = require("./main_component");
    var urls = require("./urls");

    dispatcher = dispatcher.dispatch(actions.init);
    dispatcher = dispatcher.dispatch(actions.setURL, {url: initialURL});

    return React.createElement(mainComponent, {urls: urls, dispatcher: dispatcher, window: window});
}

function mixinTop() {
    return {
        dispatch: function (eventname, payload) {
            return this.onDispatch(eventname, payload);
        },
        get: function () {
            return this.state.dispatcher.get(_.toArray(arguments));
        },
        getInitialState: function () {
            return {
                dispatcher: this.props.dispatcher
            };
        },
        onDispatch: function (action, payload) {
            this.setState({
                dispatcher: this.state.dispatcher.dispatch(action, payload)
            });
        },
        createElement: function () {
            var args = _.toArray(arguments);
            args[1] = _.assign({
                onDispatch: this.onDispatch,
                dispatcher: this.state.dispatcher
            }, args[1]);
            return React.createElement.apply(null, args);
        }
    };
}


function mixin() {
    return {
        dispatch: function (eventname, payload) {
            return this.props.onDispatch(eventname, payload);
        },
        get: function () {
            return this.props.dispatcher.get(_.toArray(arguments));
        },
        createElement: function () {
            var args = _.toArray(arguments);
            args[1] = _.assign({
                onDispatch: this.props.onDispatch,
                dispatcher: this.props.dispatcher
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
    mixin: mixin,
    mixinTop: mixinTop
};
