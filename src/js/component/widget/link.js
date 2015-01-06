/*global require, module */

var React = require('react');
var urls = require('../../urls');
var env = require('../../env');
var RouterStore = require('../../store/router');

module.exports = React.createClass({
    mixins: [env.mixin([RouterStore])],
    render: function () {
        'use strict';
        var self = this;

        var link, url;
        if (self.props.callback !== undefined) {
            url = '';
            link = function (e) {
                e.preventDefault();
                self.props.callback();
            };
        } else {
            url = urls.build(self.props.dest, self.props.params).url;
            link = function (e) {
                e.preventDefault();
                self.dispatch('navigate', {key: self.props.dest, params: self.props.params});
            };
        }
        return (
            React.createElement('a', {href: url, onClick: link, className: this.props.className},
                this.props.children
            )
        );

    }
});