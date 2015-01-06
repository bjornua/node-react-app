/*global require, window */
var React = require('react');
var env = require('./env');

env.create(window.document.location.pathname).then(function (component) {
    'use strict';
    React.render(component, window.document);
});
