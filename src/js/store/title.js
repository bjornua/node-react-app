/*global module, require, console */
var createStore = require('dispatchr/utils/createStore');
var RouterStore = require('./router');

module.exports = createStore({
    storeName: 'title',
    getStore: function (store) {
        'use strict';
        return this.dispatcher.getStore(store);
    },
    initialize: function () {
        'use strict';
        var self = this;
        this.update();
        this.getStore(RouterStore).addChangeListener(function () {
            self.update();
        });
    },
    update: function () {
        'use strict';
        this.title = this.getStore(RouterStore).handler.initialTitle();
        this.emitChange();
    },
    handlers: {
        'setTitle': function (payload) {
            'use strict';
            this.title = payload;
            this.emitChange();
        }
    }
});