'use strict';

var coldstorage = require('coldstorage');

module.exports = coldstorage.createActions([
    'setView',
    'setURL',
    'sidemenuHide',
    'sidemenuShow',
    'signin',
    'signout'
]);
