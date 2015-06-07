"use strict";

var Marty = require("marty");

module.exports = Marty.createApplication(function () {
    this.register({
        store: require("./store"),
        action: require("./action")
    });
});
