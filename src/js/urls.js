/*global require, module */
var router = require("./lib/router/router");
var r = router.createRouter();

r.add("/timer/", "timer", require("./component/timer"));
r.add("/user/signin/", "user_signin", require("./component/signin"));
r.add("/user/create/", "user_create", require("./component/create_user"));
r.add("/user/home/", "user_home", require("./component/user_home"));
r.add("/google_images/", "google_images", require("./component/images"));
r.add("<path:path>", "404", require("./component/notfound"));

module.exports.match = r.match;
module.exports.build = r.build;
