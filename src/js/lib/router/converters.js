"use strict";

var _ = require("lodash");

function strtoregex(s) {
    s = s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    return new RegExp(s);
}
function encodeURIComponentExceptSlash(s) {
    s = String(s);
    s = s.split("/");
    s = _.map(s, encodeURIComponent);
    return s.join("/");
}

function converterInteger() {
    return {
        match: /[0-9]+/,
        parse: parseInt,
        unparse: function (n) {
            return encodeURIComponent(n.toString());
        }
    };
}
function converterString() {
    return {
        match: /[^\/]+/,
        parse: _.identity,
        unparse: encodeURIComponent
    };
}
function converterPath() {
    return {
        match: /.+/,
        parse: _.identity,
        unparse: encodeURIComponentExceptSlash
    };
}
function converterStatic(options) {
    return {
        match: strtoregex(options.str),
        unparse: _.constant(options.str)
    };
}

module.exports = {
    "builtin": {
        "static": converterStatic,
        "str": converterString,
        "path": converterPath,
        "int": converterInteger
    }
};
