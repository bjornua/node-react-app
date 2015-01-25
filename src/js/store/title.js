/*global module, require */
module.exports = (function (require) {
    'use strict';
    var createStore = require('dispatchr/utils/createStore');

    return createStore({
        storeName: 'title',
        initialize: function () {
            this.title = null;
        },
        handlers: {
            // navigate: function () {
            //     this.title = null;
            //     this.emitChange();
            // },
            // navigateURL: function () {
            //     this.title = null;
            //     this.emitChange();
            // },
            'setTitle': function (payload) {
                this.title = payload;
                this.emitChange();
            }
        }
    });
}(require));