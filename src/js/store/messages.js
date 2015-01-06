/*global module, require, console */
var createStore = require('dispatchr/utils/createStore');
var UserStore = require('./user');

module.exports = createStore({
    storeName: 'messages',
    getStore: function (store) {
        'use strict';
        return this.dispatcher.getStore(store);
    },
    initialize: function () {
        'use strict';
        this.current = null;
        this.queue = [];


        var user = this.getStore(UserStore);
        user.addChangeListener(function () {
            if (user.isAuthed) {
                this.putMessage('successful_signin', {username: user.username});
            } else {
                this.putMessage('signout');
            }
        }.bind(this));
    },
    putMessage: function (msg_id, payload) {
        'use strict';
        if (this.current === null) {
            this.current = {
                msg_id: msg_id,
                payload: payload
            };
            this.emitChange();
        } else {
            this.queue.push({
                msg_id: msg_id,
                payload: payload
            });
        }
    },
    handlers: {
        messages_next: function () {
            'use strict';
            var next = this.queue.shift();
            if (next === undefined) {
                this.current = null;
            } else {
                this.current = next;
            }
            this.emitChange();

        }
    }
});