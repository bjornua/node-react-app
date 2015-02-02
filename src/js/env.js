/*global module, require */

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

    dispatcher = dispatcher.dispatch(action.setURL, {url: initialURL});

    return React.createElement(main_component, {urls: urls, dispatcher: dispatcher});
}

function mixin(stores) {
    'use strict';
    return {
        redirect: function () {
            return React.createElement();
        },
        dispatch: function (eventname, payload) {
            return this.props.onDispatch(eventname, payload);
        },
        listen: function (store, callback) {
            var f = function () {
                console.log('called');
                callback.apply(this, []);
            }.bind(this);
            this.listeners.push([store, f]);
            this.store(store).addChangeListener(f);
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
            var handler = this.props.handler;

            while (handler !== undefined && handler.parent !== undefined) {
                if (handler.parent.displayName === this.constructor.displayName) {
                    return this.createElement(handler, {handler: this.props.handler});
                }
                handler = handler.parent;
            }
            return;
        }

    };
}

module.exports = {
    create: create,
    mixin: mixin
};