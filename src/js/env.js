/*global module, require, console */
"use strict";

var _ = require("lodash");
var React = require("react");
var Marty = require("marty");

var Application = require("./dispatcher");
function createDispatcher(initialURL) {
    var dispatcher = new Application();
    dispatcher.action.setURL(initialURL);
    return dispatcher;
}

function createElement(options) {
    var mainComponent = require("./main_component");
    var urls = require("./urls");

    return React.createElement(Marty.ApplicationContainer,
        {app: options.app},
        React.createElement(mainComponent, {
            urls: urls,
            window: options.window
        })
    );
}

module.exports = {
    createElement: createElement,
    createDispatcher: createDispatcher,
};
