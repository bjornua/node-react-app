/*global require, module */
/*jslint sloppy: true */

var _ = require('lodash');

function format(msg) {
    var args = _.toArray(arguments).slice(1);
    msg = msg.split('{}');
    msg = _.map(msg, function (m, i) {
        if (i + 1 === msg.length) {
            return [m];
        }
        return [m, JSON.stringify(args[i])];
    });
    msg = _.flatten(msg);
    return msg.join("");
}
function assert(condition) {
    var args = _.toArray(arguments).slice(1);
    if (condition === false || condition === undefined) {
        throw new Error(format.apply(null, args));
    }
}

function chunk(array, n) {
    return _.transform(array, function (r, v, k) {
        if (k % n === 0) {
            r.push([v]);
        } else {
            _.last(r).push(v);
        }
    });
}

module.exports = {
    'assert': assert,
    'format': format,
    'chunk': chunk
};