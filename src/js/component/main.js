"use strict";
var React = require("react");
var Router = require("react-router");

var MainComponent = React.createClass({
    displayName: "MainComponent",

    render: function () {
        var title = "Untitled";

        return React.createElement("html", {},
            React.createElement("head", {},
                React.createElement("title", {}, title),
                React.createElement("link", {rel: "stylesheet", type: "text/css", href: "/style.css"}),
                React.createElement("meta", {name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"})
            ),
            React.createElement("body", {},
                React.createElement(Router.RouteHandler),
                React.createElement("script", {async: true, src: "/script.js"}),
                React.createElement("script", {async: true, src: "http://localhost:35729/livereload.js"})
            )
        );
    }
});

module.exports = MainComponent;
