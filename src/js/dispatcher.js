/*global module, require */

var Dispatchr = require('dispatchr')();
var _ = require('lodash');

Dispatchr.registerStore(require('./store/router.js'));
Dispatchr.registerStore(require('./store/title.js'));
Dispatchr.registerStore(require('./store/user.js'));
Dispatchr.registerStore(require('./store/messages.js'));
Dispatchr.registerStore(require('./store/sidemenu.js'));

module.exports = Dispatchr;