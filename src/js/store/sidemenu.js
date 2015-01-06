/*global module, require, console */
var createStore = require('dispatchr/utils/createStore');
var RouterStore = require('./router');
var UserStore = require('./user');

module.exports = createStore({
    storeName: 'sidemenu',
    getStore: function (store) {
        'use strict';
        return this.dispatcher.getStore(store);
    },
    initialize: function () {
        'use strict';
        this.show = false;

        this.getStore(RouterStore).addChangeListener(this.hidemenu.bind(this));
        this.getStore(UserStore).addChangeListener(this.hidemenu.bind(this));
    },
    showmenu: function () {
        'use strict';
        if (this.show !== true) {
            this.show = true;
            this.emitChange();
        }
    },
    hidemenu: function () {
        'use strict';
        if (this.show !== false) {
            this.show = false;
            this.emitChange();
        }
    },
    handlers: {
        sidemenu_show: 'showmenu',
        sidemenu_hide: 'hidemenu',
    }
});