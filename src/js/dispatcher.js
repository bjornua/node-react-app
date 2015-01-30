/*global module, require */


var Dispatcher = require('./lib/dispatcher');
var _ = require('lodash');


var stores = [
    require('./store/navigation.js')
];

module.exports = Dispatcher.create(stores);

// Dispatchr.registerStore(require('./store/navigation.js'));
// Dispatchr.registerStore(require('./store/title.js'));
// Dispatchr.registerStore(require('./store/user.js'));
// Dispatchr.registerStore(require('./store/messages.js'));
// Dispatchr.registerStore(require('./store/sidemenu.js'));
// module.exports = Dispatchr;