/*global module, require, console */
"use strict"

var React = require('react');
var action = require('./action');
var Q = require('q');
var _ = require('lodash');
var NavigationStore = require('./store/navigation');


function create(initialURL, window) {
    var dispatcher = require('./dispatcher');
    var main_component = require('./main_component');
    var urls = require('./urls');

    dispatcher = dispatcher.dispatch(action.init);
    dispatcher = dispatcher.dispatch(action.setURL, {url: initialURL});

    return React.createElement(main_component, {urls: urls, dispatcher: dispatcher, window: window});
}

function top_mixin() {
    return {
        dispatch: function (eventname, payload) {
            return this.onDispatch(eventname, payload);
        },
        get: function () {
            return this.state.dispatcher.stores.getIn(arguments);
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
                stores: this.state.dispatcher.stores
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
            return this.props.stores.getIn(arguments);
        },
        createElement: function () {
            var args = _.toArray(arguments);
            args[1] = _.assign({
                onDispatch: this.props.onDispatch,
                stores: this.props.stores
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
    top_mixin: top_mixin
};
