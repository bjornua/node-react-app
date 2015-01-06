/*global require, module */
/*jslint sloppy: true */

var _ = require('lodash');
var utils = require('../../lib/utils');
var rule = require('./rule');
var m_converters = require('./converters');

function createRouter(options) {
    options = _.assign({
        converters: {},
        patterns: []
    }, options);
    var router_converters = _.assign(m_converters.builtin, options.converters);
    var matchers = [];
    var keys = {};

    function add(pattern, key, value, extra_converters) {
        var rule_converters = _.assign(router_converters, extra_converters);
        var retval = [rule(pattern, rule_converters), value];
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
        utils.assert(res, 'No match {}', url);
        return res;
    }
    function build(key, options) {
        var matches = keys[key];
        utils.assert(matches, 'Could not find route with key {}', key);

        var res;
        _.forEach(matches, function (set) {
            var path = set[0].build(options);
            if (path !== null) {
                res = {
                    url: path,
                    value: set[1],
                    key: key,
                    params: options
                };
                return false;
            }
        });
        utils.assert(
            res,
            'Argument error {}, tried patterns: {}',
            _.keys(options),
            _.pluck(_.pluck(matches, 0), 'pattern')

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