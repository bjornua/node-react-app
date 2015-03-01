"use strict";

var React = require("react");
var Link = require("./link");
var env = require("../../env");
var action = require("../../action");
var MenuStore = require("../../store/menu");
var Immutable = require("immutable");

module.exports = React.createClass({
    mixins: [env.mixin()],
    render: function () {
        var self = this;

        var menu = this.get(MenuStore);
        menu = menu.unshift(Immutable.Map({
            callback: function () {
                self.dispatch(action.sidemenuHide);
            },
            title: "Close"
        }));

        menu = menu.map(function (item, key) {
            var isActive = false; //this.store(RouterStore).key === item[1].dest;
            var link;
            if (item.has("dest")) {
                link = this.createElement(Link, {dest: item.get("dest")}, item.get("title"));
            } else if (item.has("callback")) {
                link = this.createElement(Link, {callback: item.get("callback")}, item.get("title"));
            }

            return React.createElement("li", {
                    key: key,
                    className: isActive ? "pure-menu-selected" : ""
                },
                link
            );
        }, this);

        return React.createElement("ul", {className: "dh-sidemenu"},
            menu.toJS()
        );
    }
});
