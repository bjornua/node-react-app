/*global module, require, console */
// var createStore = require('dispatchr/utils/createStore');

// module.exports = createStore({
//     storeName: 'sidemenu',
//     getStore: function (store) {
//         'use strict';
//         return this.dispatcher.getStore(store);
//     },
//     initialize: function () {
//         'use strict';
//         this.show = false;
//     },
//     showmenu: function () {
//         'use strict';
//         if (this.show !== true) {
//             this.show = true;
//             this.emitChange();
//         }
//     },
//     hidemenu: function () {
//         'use strict';
//         if (this.show !== false) {
//             this.show = false;
//             this.emitChange();
//         }
//     },
//     handlers: {
//         sidemenu_show: 'showmenu',
//         sidemenu_hide: 'hidemenu',
//     }
// });