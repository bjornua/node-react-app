"use strict";

var coldstorage = require("coldstorage");

module.exports = coldstorage.createDispatcher([
    require("./store/navigation.js"),
    require("./store/sidemenu.js"),
    require("./store/user.js"),
    require("./store/menu.js")
]);


// Dispatchr.registerStore(require('./store/navigation.js'));
// Dispatchr.registerStore(require('./store/title.js'));
// Dispatchr.registerStore(require('./store/user.js'));
// Dispatchr.registerStore(require('./store/messages.js'));
// Dispatchr.registerStore(require('./store/sidemenu.js'));
// module.exports = Dispatchr;
