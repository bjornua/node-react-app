"use strict";

var coldstorage = require("coldstorage");

module.exports = coldstorage.createActions(
    "init",
    "setView",
    "setURL",
    "sidemenuHide",
    "sidemenuShow",
    "signin",
    "signout",
    "setTitle"
);
