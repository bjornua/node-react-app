/*global require, module */
/*jslint sloppy: true */

var React = require('react');
var base = require('./base');
var env = require('../../env');


var page = React.createClass({
    displayName: 'page',
    mixins: [env.mixin()],
    statics: {
        parent: require('./base')
    },
    render: function () {
        return (
            React.createElement('div', {className: "dh-mainpage"},
                this.getChildHandler()
            )
        );
    }
});


module.exports = page;