/*global require, module */
/*jslint sloppy: true */
"use strict";

var React = require("react");
// var sidemenuStore = require("../../store/sidemenu");
var classnames = require("classnames");

var Link = require("../widget/link");
var Topmenu = require("../widget/topmenu");
var Sidemenu = require("../widget/sidemenu");
var Messages = require("../widget/messages");
// var SidemenuStore = require("../../store/sidemenu");
var Router = require("react-router");


var base = React.createClass({
    displayName: "base",
    render: function () {
        var baseClasses = classnames("dh-base", {
            "dh-sidemenu-open": true // this.get(sidemenuStore, "show")
        });

        return <div className={baseClasses}>
            <div className="dh-header">
                <div className="dh-homemenu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed">
                    <Link dest="404" params={{path: "/"}} className="dh-logo">
                        <img src="/image/logo.png" />
                    </Link>
                    <Topmenu />
                </div>
            </div>
            <div className="dh-content">
                <Messages />
                <Router.RouteHandler />
                <Sidemenu />
            </div>
        </div>;
    }
});

module.exports = base;
