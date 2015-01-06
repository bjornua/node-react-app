/*global require, module */
/*jslint sloppy: true */

var _ = require('lodash');
var utils = require('../../lib/utils');


var RE_PARAM = /<([^:>]+):([^>]+)>/;

// Detect how many match group
function re_groupcount(r) {
    r = new RegExp('.*|(' + r.source + ')');
    return r.exec('').length - 2;
}

function parsepattern(path) {
    var matches = path.split(RE_PARAM);
    matches = utils.chunk(matches, 3);
    matches = _.transform(matches, function (r, v) {
        if (v[0] !== '') {
            r.push({type: 'static', name: null, options: {'str': v[0]}});
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
        utils.assert(converter, 'Unknown converter {}', v.type);
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
        idx += re_groupcount(converter.match) + 1;
    }, []);
    return parsers;
}

function Rule(pattern, converters) {
    var components = compilepattern(pattern, converters);
    var re_pattern = _.map(components, function (component) {
        return '(' + component.match.source + ')';
    });
    re_pattern = new RegExp('^' + re_pattern.join('') + '$');

    var named_components = _.filter(components, function (component) {
        return component.name !== null;
    });

    function matcher(s) {
        var m = s.match(re_pattern);
        if (m === null) {
            return null;
        }
        return _.transform(named_components, function (options, component) {
            var strval = m[component.idx];
            strval = decodeURIComponent(strval);
            options[component.name] = component.parse(strval);
        }, {});
    }
    var available_options = _.transform(components, function (result, v) {
        if (v.name !== null) {
            result.push(v.name);
        }
    });

    function builder(options) {
        options = _.assign({}, options);
        if (_.size(_.difference(available_options, _.keys(options))) !== 0) {
            return null;
        }

        var parts = _.map(components, function (component) {
            if (component.name === null) {
                return component.unparse();
            }
            var option = options[component.name];
            return component.unparse(option);
        });
        return parts.join('');
    }
    return {
        available_options: available_options,
        pattern: pattern,
        build: builder,
        match: matcher
    };
}

module.exports = Rule;
