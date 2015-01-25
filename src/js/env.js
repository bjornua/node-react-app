/*global module, require */

var React = require('react');
var Q = require('q');
var _ = require('lodash');
var NavigationStore = require('./store/navigation');


function create(initialURL) {
    'use strict';
    var Dispatcher = require('./dispatcher');
    var main_component = require('./main_component');
    var urls = require('./urls');

    var dispatcher = new Dispatcher();
    var store = dispatcher.getStore(NavigationStore);

    var deferred = Q.defer();
    store.addChangeListener(deferred.resolve);
    dispatcher.dispatch('navigateURL', {url: initialURL});

    return deferred.promise.then(function () {
        store.removeChangeListener(deferred.resolve);
        return Q.try(function () {
            return React.createElement(main_component, {urls: urls, dispatcher: dispatcher});
        });
    });
}

function mixin(stores) {
    'use strict';
    if (stores === undefined) {
        stores = [];
    }
    return {
        store: function (store) {
            return this.props.dispatcher.getStore(store);
        },
        redirect: function () {
            return React.createElement();
        },
        dispatch: function (eventname, payload) {
            return this.props.dispatcher.dispatch(eventname, payload);
        },
        listen: function (store, callback) {
            var f = function () {
                console.log('called');
                callback.apply(this, []);
            }.bind(this);
            this.listeners.push([store, f]);
            this.store(store).addChangeListener(f);
        },
        componentDidMount: function () {
            this.listeners = [];
            var update = function () {
                if (this.isMounted()) {
                    this.forceUpdate();
                }
            };
            _.forEach(stores, function (store) {
                this.listen(store, update);
            }, this);
        },
        componentWillUnmount: function () {
            _.forEach(this.listeners, function (listener) {
                var store = listener[0];
                var callback = listener[1];
                this.store(store).removeChangeListener(callback);
            }, this);

        },
        createElement: function () {
            var args = _.toArray(arguments);
            args[1] = _.assign({dispatcher: this.props.dispatcher}, args[1]);
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