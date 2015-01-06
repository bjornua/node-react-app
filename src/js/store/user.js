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
            setTimeout(function () {
                this.username = payload.username;
                this.isAuthed = true;
                this.emitChange();
            }.bind(this), 1000);
        },
        signout: function () {
            'use strict';
            this.isAuthed = false;
            this.emitChange();
        }
    }
});