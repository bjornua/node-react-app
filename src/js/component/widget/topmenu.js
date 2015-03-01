"use strict";

var React = require("react");
var link = require("./link");
var env = require("../../env");
var MenuStore = require("../../store/menu");
var action = require("../../action");

module.exports = React.createClass({
    mixins: [env.mixin()],
    render: function () {
        var self = this;


        var menu = this.get(MenuStore).map(function (item, key) {
            var isActive = false; //this.store(RouterStore).key === item[1].dest;
            return React.createElement("li", {
                    key: key,
                    className: isActive ? "pure-menu-selected" : ""
                },
                this.createElement(link, {dest: item.get("dest")}, item.get("title"))
            );
        }, this);
        return React.createElement("ul", {},
            menu.toJS(),
            React.createElement("li", {className: "dh-menu-icon"},
                this.createElement(link, {callback: function () { self.dispatch(action.sidemenuShow); }},
                    React.createElement("img", {src: "/image/menu.png"})
                )
            )
        );
    }
});
