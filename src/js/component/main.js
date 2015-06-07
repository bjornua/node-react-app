"use strict";
var React = require("react");
var Immutable = require("immutable");


var MainComponent = React.createClass({
    displayName: "MainComponent",

    render: function () {
        var window = this.props.window;
        if (window !== undefined) {
            if (window.document.location.pathname !== this.get(NavigationStore, "url")) {
                window.history.pushState(null, null, this.get(NavigationStore, "url"));
            }
        }
        var title = this.get(NavigationStore, "title");

        var current = this.get(NavigationStore, "handler");
        var handlers = Immutable.Stack();
        while (current !== undefined) {
            handlers = handlers.unshift(current);
            current = current.parent;
        }
        var handler = handlers.first();
        handlers = handlers.shift();

        return React.createElement("html", {},
            React.createElement("head", {},
                React.createElement("title", {}, title),
                React.createElement("link", {rel: "stylesheet", type: "text/css", href: "/style.css"}),
                React.createElement("meta", {name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"})
            ),
            React.createElement("body", {},
                this.createElement(handler, {handlers: handlers}),
                React.createElement("script", {async: true, src: "/script.js"}),
                React.createElement("script", {async: true, src: "http://localhost:35729/livereload.js"})
            )
        );
    }
});

module.exports = MainComponent;
