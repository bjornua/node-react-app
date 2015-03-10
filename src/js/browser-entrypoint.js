/*global require, window */
"use strict";

var React = require("react");
var env = require("./env");


var component;
var onStore = function (newStore) {
    component.setProps({store: newStore});
};

component = React.render(env.create(
    window.document.location.pathname, window, onStore
), window.document);




/*env.create(window.document.location.pathname).then(function (component) {
    "use strict";
    React.render(component, window.document);
});*/
