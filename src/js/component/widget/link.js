/*global require, module */
"use strict";

var React = require("react");
var urls = require("../../urls");
var env = require("../../env");
var action = require("../../action");

module.exports = React.createClass({
    mixins: [env.mixin()],
    render: function () {
        var self = this;

        var link, url;
        if (self.props.callback !== undefined) {
            url = "";
            link = function (e) {
                e.preventDefault();
                self.props.callback();
            };
        } else {
            url = urls.build(self.props.dest, self.props.params).url;
            link = function (e) {
                e.preventDefault();
                self.dispatch(action.setView, {key: self.props.dest, params: self.props.params});
            };
        }
        return (
            React.createElement("a", {href: url, onClick: link, className: this.props.className},
                this.props.children
            )
        );

    }
});
