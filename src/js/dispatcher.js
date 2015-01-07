/*global module, require */

var Dispatchr = require('dispatchr')();
var _ = require('lodash');

Dispatchr.registerStore(require('./store/router.js'));
Dispatchr.registerStore(require('./store/user.js'));
Dispatchr.registerStore(require('./store/messages.js'));
Dispatchr.registerStore(require('./store/sidemenu.js'));
Dispatchr.registerStore(require('./store/network.js'));

module.exports = Dispatchr;