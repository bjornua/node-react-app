/*global require, module, process */
"use strict";

var path = require("path");

var projectDir = [path.dirname(module.uri), "..", "..", "..", ".."];
function relpath(pathStr) {
    pathStr = path.relative(process.cwd(), pathStr);
    pathStr = path.normalize(pathStr);
    return pathStr;
}
function ppath(pathList) {
    pathList = projectDir.concat(pathList);
    var res = path.join.apply(null, pathList);
    res = relpath(res);
    return res;
}

module.exports = ppath;
