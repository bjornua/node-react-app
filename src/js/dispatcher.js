/*global module, require */


var Dispatchr = require('dispatchr')();
var _ = require('lodash');


var stores = [
    require('./store/navigation.js')
];

var createApp = function () {

};



// Dispatchr.registerStore(require('./store/navigation.js'));
// Dispatchr.registerStore(require('./store/title.js'));
// Dispatchr.registerStore(require('./store/user.js'));
// Dispatchr.registerStore(require('./store/messages.js'));
// Dispatchr.registerStore(require('./store/sidemenu.js'));
// module.exports = Dispatchr;