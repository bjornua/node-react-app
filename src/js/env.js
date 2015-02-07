/*global module, require, console */

var React = require('react');
var action = require('./action');
var Q = require('q');
var _ = require('lodash');
var NavigationStore = require('./store/navigation');


function create(initialURL) {
    'use strict';
    var dispatcher = require('./dispatcher');
    var main_component = require('./main_component');
    var urls = require('./urls');

    dispatcher = dispatcher.dispatch(action.init);
    dispatcher = dispatcher.dispatch(action.setURL, {url: initialURL});

    return React.createElement(main_component, {urls: urls, dispatcher: dispatcher});
}

function mixin() {
    'use strict';
    return {
        dispatch: function (eventname, payload) {
            return this.props.onDispatch(eventname, payload);
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
    mixin: mixin
};
