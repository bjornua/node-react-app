/*global require, module */
/*jslint sloppy: true */
"use strict";

var React = require("react");
var sidemenuStore = require("../../store/sidemenu");
var classnames = require("classnames");

var link = require("../widget/link");
var topmenu = require("../widget/topmenu");
var sidemenu = require("../widget/sidemenu");
var messages = require("../widget/messages");
var env = require("../../env");
var SidemenuStore = require("../../store/sidemenu");

var base = React.createClass({
    mixins: [env.mixin([SidemenuStore])],
    displayName: "base",
    render: function () {
        var baseClasses = classnames("dh-base", {
            "dh-sidemenu-open": this.get(sidemenuStore, "show")
        });
        return React.createElement("div", {className: baseClasses},
            React.createElement("div", {className: "dh-header"},
                React.createElement("div", {className: "dh-homemenu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed"},
                    this.createElement(link,
                        {dest: "404", params: {path: "/"}, className: "dh-logo"},
                        React.createElement("img", {src: "/image/logo.png"})
                    ),
                    this.createElement(topmenu)
                )
            ),
            React.createElement("div", {className: "dh-content"},
                this.createElement(messages),
                this.getChildHandler(),
                this.createElement(sidemenu)
            )
        );
    }
});

module.exports = base;
