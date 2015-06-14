"use strict";

var React = require("react");
var Router = require("react-router");

var page = React.createClass({
    displayName: "page",
    render: function () {
        return (
            React.createElement("div", {className: "dh-mainpage"},
                React.createElement(Router.RouteHandler)
            )
        );
    }
});


module.exports = page;
