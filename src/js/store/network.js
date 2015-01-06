/*global module, require, console */
var createStore = require('dispatchr/utils/createStore');

module.exports = createStore({
    storeName: 'user',
    initialize: function () {
        'use strict';
        this.isAuthed = false;
    },
    handlers: {
        signin: function (payload) {
            'use strict';
            var self = this;
            setTimeout(function () {
                self.username = payload.username;
                self.isAuthed = true;
                self.emitChange();
            }, 1000);
        },
        signout: function () {
            'use strict';
            this.isAuthed = false;
            this.emitChange();
        }
    }
});