/*global module, require, console */
"use strict";

// var Immutable = require("immutable");
// var coldstorage = require("coldstorage");
// var storeUser = require("./user");
// var action = require("../action");
// var store = coldstorage.createStore('messages');

// var putMessage = function (store, key, payload) {
//     payload = Immutable.fromJS(payload);
//     var queue = store.get('queue');
//     var active = store.get('active', null);
//     var message = Immutable.Map({key: key, payload: payload});
//
//     if (active === null) {
//         return store.set('active', message);
//     }
//     queue = queue.unshift(message);
//     return store.set('queue', queue);
// };
//
// store = store.on([action.init], function () {
//     return Immutable.Map({
//         active: null,
//         queue: new Immutable.Stack()
//     });
// });
//
// store = store.on([action.signin, storeUser], function (signin, storeUser) {
//     if (signin !== undefined && storeUser.get('isAuthed') === true) {
//         putMessage(this, 'successful_signin', {username: storeUser.username});
//     }
// });
//
// store = store.on([action.signin]);
//
// module.exports = store;

// module.exports = createStore({
//     initialize: function () {
//         'use strict';
//         this.current = null;
//         this.queue = [];

//         var user = this.getStore(UserStore);
//         user.addChangeListener(function () {
//             if (user.isAuthed) {
//                 this.putMessage('successful_signin', {username: user.username});
//             } else {
//                 this.putMessage('signout');
//             }
//         }.bind(this));
//     },
//     putMessage: function (msg_id, payload) {
//         'use strict';
//         if (this.current === null) {
//             this.current = {
//                 msg_id: msg_id,
//                 payload: payload
//             };
//             this.emitChange();
//         } else {
//             this.queue.push({
//                 msg_id: msg_id,
//                 payload: payload
//             });
//         }
//     },
//     handlers: {
//         messages_next: function () {
//             'use strict';
//             var next = this.queue.shift();
//             if (next === undefined) {
//                 this.current = null;
//             } else {
//                 this.current = next;
//             }
//             this.emitChange();
//         }
//     }
// });
