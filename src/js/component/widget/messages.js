
"use strict";

var React = require("react");
var classnames = require("classnames");
var MsgStore = require("../../store/messages");
var _ = require("lodash");

module.exports = React.createClass({
    // mixins: [env.mixin()],

    componentWillMount: function () {
        this.setState({
            hide: true
        });
    },
    // componentDidMount: function () {
    //     var self = this;
    //     self.nextMessage = function () {
    //         if (self.store(MsgStore).current !== null && self.state.hide === true) {
    //             self.setState({hide: false});
    //             self.timer_hide = window.setTimeout(function () {
    //                 self.setState({hide: true});
    //                 self.timer_hidden = window.setTimeout(function () {
    //                     self.dispatch("messages_next");
    //                 }, 400);
    //             }, 4000);
    //         } else {
    //             self.setState({hide: true});
    //         }
    //     };
    //     self.nextMessage();
    //     self.addStoreListener(MsgStore, self.nextMessage);
    // },
    componentWillUnmount: function () {
        window.clearTimeout(this.timer_hide);
        window.clearTimeout(this.timer_hidden);
        this.removeStoreListener(MsgStore, this.nextMessage);
    },
    render: function () {
        var current = {};// = this.store(MsgStore).current;
        var self = this;
        var msg = function (classname) {
            var classes = classnames(
                "dh-messages", {
                    "dh-messages-hidden": self.state.hide,
                    "dh-messages-icon": classname !== null
                }
            );
            if (classname !== null) {
                classes += " dh-messages-icon-" + classname;
            }

            var args = ["div", {key: 0, className: classes}].concat(_.toArray(arguments).slice(1));
            return React.createElement.apply(null, args);
        };

        if (current !== null) {
            switch (current.msg_id) {
            case "successful_signin":
                return msg("success", "Signed in as ", React.createElement("strong", {}, current.payload.username));
            case "signout":
                return msg("exit", React.createElement("strong", {}, "Signed out"));
            }
        }
        return React.createElement("div", {key: 0, className: "dh-messages dh-messages-hidden"});
    }
});
