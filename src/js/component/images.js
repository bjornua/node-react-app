"use strict";

var React = require("react");
var page = require("./wrappers/page");
var Immutable = require("immutable");
var env = require("../env");

module.exports = React.createClass({
    displayName: "images",
    mixins: [env.mixin()],
    statics: {
        initialTitle: function () {
            return "Google Images";
        },
        async: function () {
            return {
                url: "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=fuzzy%20monkey"
            };
        },
        parent: page
    },
    render: function () {
        var images = Immutable.Range(0, 10).map(function (val) {
            return React.createElement("img", {
                key: val,
                height: 200,
                width: 200,
                src: "http://lorempixel.com/200/200/?" + String(val)}
            );
        });

        return React.createElement("div", null,
            React.createElement("h1", {},
                "Google Images"
            ),
            React.createElement("p", null,
                "Here are some google images:"
            ),
            images.toJS()
        );

    }
});
