/*global require, module */
"use strict";

var _ = require("lodash");
var utils = require("../../lib/utils");


var RE_PARAM = /<([^:>]+):([^>]+)>/;

// Detect how many match group
function reGroupcount(r) {
    r = new RegExp(".*|(" + r.source + ")");
    return r.exec("").length - 2;
}

function parsepattern(path) {
    var matches = path.split(RE_PARAM);
    matches = utils.chunk(matches, 3);
    matches = _.transform(matches, function (r, v) {
        if (v[0] !== "") {
            r.push({type: "static", name: null, options: {"str": v[0]}});
        }
        if (v[2] !== undefined) {
            r.push({type: v[1], name: v[2]});
        }
    }, []);
    return matches;
}

function compilepattern(pattern, converters) {
    var idx = 1;
    var parsers = _.transform(parsepattern(pattern), function (res, v) {
        var converter = converters[v.type];
        utils.assert(converter, "Unknown converter {}", v.type);
        converter = converter(v.options);
        res.push({
            idx: idx,
            name: v.name,
            type: v.type,
            options: v.options,
            match: converter.match,
            parse: converter.parse,
            unparse: converter.unparse
        });
        idx += reGroupcount(converter.match) + 1;
    }, []);
    return parsers;
}

function Rule(pattern, converters) {
    var components = compilepattern(pattern, converters);
    var rePattern = _.map(components, function (component) {
        return "(" + component.match.source + ")";
    });
    rePattern = new RegExp("^" + rePattern.join("") + "$");

    var namedCompontents = _.filter(components, function (component) {
        return component.name !== null;
    });

    function matcher(s) {
        var m = s.match(rePattern);
        if (m === null) {
            return null;
        }
        return _.transform(namedCompontents, function (options, component) {
            var strval = m[component.idx];
            strval = decodeURIComponent(strval);
            options[component.name] = component.parse(strval);
        }, {});
    }
    var availableOptions = _.transform(components, function (result, v) {
        if (v.name !== null) {
            result.push(v.name);
        }
    });

    function builder(options) {
        options = _.assign({}, options);
        if (_.size(_.difference(availableOptions, _.keys(options))) !== 0) {
            return null;
        }

        var parts = _.map(components, function (component) {
            if (component.name === null) {
                return component.unparse();
            }
            var option = options[component.name];
            return component.unparse(option);
        });
        return parts.join("");
    }
    return {
        availableOptions: availableOptions,
        pattern: pattern,
        build: builder,
        match: matcher
    };
}

module.exports = Rule;
