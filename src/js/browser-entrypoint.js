/*global require, window */
var React = require('react');
var env = require('./env');

var component = env.create(window.document.location.pathname, window);
React.render(component, window.document);

/*env.create(window.document.location.pathname).then(function (component) {
    'use strict';
    React.render(component, window.document);
});*/
