/*global require, module, window */
"use strict";
var React = require('react');
var env = require('./env');
var Immutable = require('immutable');
var action = require('./action');
var navigationStore = require('./store/navigation')

var main_component = React.createClass({
    displayName: 'main_component',
    mixins: [env.top_mixin()],

    componentDidMount: function () {
        window.onpopstate = function () {
            this.dispatch(action.setURL, {url: window.document.location.pathname});
        }.bind(this);

    },
    render: function () {
        var window = this.props.window;
        if (window !== undefined) {
            if (window.document.location.pathname !== this.get(navigationStore, 'url')) {
                window.history.pushState(null, null, this.get(navigationStore, 'url'));
            }
        }
        var title = this.get(navigationStore, 'title');

        var current = this.get(navigationStore, 'handler');
        var handlers = Immutable.Stack();
        while (current !== undefined) {
            handlers = handlers.unshift(current);
            current = current.parent;
        }
        var handler = handlers.first();
        handlers = handlers.shift();

        return React.createElement('html', {},
            React.createElement('head', {},
                React.createElement('title', {}, title),
                React.createElement('link', {rel: "stylesheet", type: "text/css", href: "/style.css"}),
                React.createElement('meta', {name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"})
            ),
            React.createElement('body', {},
                this.createElement(handler, {handlers: handlers}),
                React.createElement('script', {async: true, src: '/script.js'}),
                React.createElement('script', {async: true, src: 'http://localhost:35729/livereload.js'})
            )
        );
    }
});

module.exports = main_component;
