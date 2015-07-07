/*global require, module */
import * as React from "react";
import * as action from "../../action";

// var urls = require("../../urls");

module.exports = React.createClass({
    // mixins: [env.mixin()],
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
            // url = urls.build(self.props.dest, self.props.params).url;
            url = "/";
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
