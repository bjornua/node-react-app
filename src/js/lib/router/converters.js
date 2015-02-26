"use strict";

var _ = require("lodash");

function strtoregex(s) {
    s = s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    return new RegExp(s);
}
function encodeURIComponent_exceptslash(s) {
    s = String(s);
    s = s.split("/");
    s = _.map(s, encodeURIComponent);
    return s.join("/");
}

function converter_integer() {
    return {
        match: /[0-9]+/,
        parse: parseInt,
        unparse: function (n) {
            return encodeURIComponent(n.toString());
        }
    };
}
function converter_string() {
    return {
        match: /[^\/]+/,
        parse: _.identity,
        unparse: encodeURIComponent
    };
}
function converter_path() {
    return {
        match: /.+/,
        parse: _.identity,
        unparse: encodeURIComponent_exceptslash
    };
}
function converter_static(options) {
    return {
        match: strtoregex(options.str),
        unparse: _.constant(options.str)
    };
}

module.exports = {
    "builtin": {
        "static": converter_static,
        "str": converter_string,
        "path": converter_path,
        "int": converter_integer
    }
};