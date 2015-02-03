/*global require, module, window */
module.exports = (function (require) {
    'use strict';
    var React = require('react');
    var env = require('./env');
    var Immutable = require('immutable');

    var  main_component = React.createClass({
        displayName: 'main_component',
        mixins: [env.mixin()],
        // componentWillMount: function () {
        //     this.update_view();
        // },
        // componentDidMount: function () {
        //     window.onpopstate = function () {
        //         this.dispatch('navigateURL', {url: window.document.location.pathname});
        //     }.bind(this);


        //     if (window.document.location.pathname !== nav.url) {
        //         window.history.pushState(null, null, nav.url);
        //     }
        // },

        // Props in get initial state. Trust me!
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
        render: function () {
            var title = 'Hello hrose' + ' - dotarally.com';
            var stores = this.state.dispatcher.stores;

            var current = stores.get('navigation').get('handler');
            var handlers = Immutable.Stack();
            while (current !== undefined) {
                handlers = handlers.unshift(current);
                current = current.parent;
            }
            console.log(handlers.toList().map(function (val) { return val; }));

            var handler = handlers.first();
            handlers = handlers.shift();

            return React.createElement('html', {},
                React.createElement('head', {},
                    React.createElement('title', {}, title),
                    React.createElement('link', {rel: "stylesheet", type: "text/css", href: "/style.css"}),
                    React.createElement('meta', {name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"})
                ),
                React.createElement('body', {},
                    this.createElement(handler, {handlers: handlers, stores: this.state.dispatcher.stores, onDispatch: this.onDispatch}),
                    React.createElement('script', {async: true, src: '/script.js'}),
                    React.createElement('script', {async: true, src: 'http://localhost:35729/livereload.js'})
                )
            );
        }
    });

    return main_component;
}(require));