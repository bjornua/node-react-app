/*global module, require, console */
"use strict";

var _ = require("lodash");
var React = require("react");
var Marty = require("marty");

var Application = require("./dispatcher");
function createDispatcher() {
    var dispatcher = new Application();
    return dispatcher;
}

function createElement(options) {

    return React.createElement(Marty.ApplicationContainer,
        {app: options.app},
        React.createElement(mainComponent, {
            window: options.window
        })
    );
}

module.exports = {
    createElement: createElement,
    createDispatcher: createDispatcher,
};
