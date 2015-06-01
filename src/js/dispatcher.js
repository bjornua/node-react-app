"use strict";

var Marty = require("marty");

module.exports = Marty.createApplication(function () {
    this.register("navigation", require("./store/navigation"));
});
