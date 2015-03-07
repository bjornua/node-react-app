"use strict";

var coldstorage = require("coldstorage");

module.exports = coldstorage.createDispatcher([
    require("./store/navigation.js"),
    require("./store/sidemenu.js"),
    require("./store/async.js"),
    require("./store/user.js"),
    require("./store/menu.js")
]);
