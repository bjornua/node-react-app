/*global require, module */
"use strict";

var React = require("react");
var page = require("../component/wrappers/page");
var env = require("../env");
var userStore = require("../store/user");


module.exports = React.createClass({
    mixins: [env.mixin()],
    statics: {
        initialTitle: function () {
            return "Page";
        },
        parent: page,
        redirect: function (get) {
            if (get(userStore).get("isAuthed") === false) {
                return {key: "user_signin"};
            }
        }
    },
    render: function () {
        return this.createElement("div", {},
            React.createElement("h1", {}, ""),/*this.store(UserStore).username),*/
            React.createElement("p", {}, "Hello and welcome. This is your profile page.")
        );
    }
});
