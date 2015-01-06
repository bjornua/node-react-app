/*global require, module, process */
/*jslint sloppy: true */

var path = require('path');

var project_dir = [path.dirname(module.uri), '..', '..', '..', '..'];
function relpath(path_str) {
    path_str = path.relative(process.cwd(), path_str);
    path_str = path.normalize(path_str);
    return path_str;
}
function ppath(path_list) {
    path_list = project_dir.concat(path_list);
    var res = path.join.apply(null, path_list);
    res = relpath(res);
    return res;
}

module.exports = ppath;
