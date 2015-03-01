/*global require, module */
"use strict";

var _ = require("lodash");
var utils = require("../../lib/utils");
var rule = require("./rule");
var convertersBuiltin = require("./converters");

function createRouter(options) {
    options = _.assign({
        converters: {},
        patterns: []
    }, options);
    var counvertersRouter = _.assign(convertersBuiltin.builtin, options.converters);
    var matchers = [];
    var keys = {};

    function add(pattern, key, value, convertersExtra) {
        var converters = _.assign(counvertersRouter, convertersExtra);
        var retval = [rule(pattern, converters), value];
        if (keys[key] === undefined) {
            keys[key] = [];
        }
        keys[key].push(retval);
        matchers.push([retval[0], retval[1], key]);

    }
    function match(url) {
        var res;
        _.forEach(matchers, function (matcher) {
            var args = matcher[0].match(url);
            if (args !== null) {
                res = {
                    url: url,
                    value: matcher[1],
                    key: matcher[2],
                    params: args
                };
                return false;
            }
        });
        utils.assert(res, "No match {}", url);
        return res;
    }
    function build(key, params) {
        var matches = keys[key];
        utils.assert(matches, "Could not find route with key {}", key);

        var res;
        _.forEach(matches, function (set) {
            var path = set[0].build(params);
            if (path !== null) {
                res = {
                    url: path,
                    value: set[1],
                    key: key,
                    params: params
                };
                return false;
            }
        });
        utils.assert(
            res,
            "Argument error {}, tried patterns: {}",
            _.keys(params),
            _.pluck(_.pluck(matches, 0), "pattern")

        );
        return res;
    }
    _.forEach(options.patterns, function (r) {
        add.apply(null, r);
    });

    return {
        add: add,
        match: match,
        build: build
    };
}

module.exports = {
    createRouter: createRouter
};
