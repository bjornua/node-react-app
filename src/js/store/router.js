/*global module, require, console */
var createStore = require('dispatchr/utils/createStore');
var UserStore = require('./user');
var utils = require('../lib/utils');
var Q = require('q');
var env = require('../env.js');

var RouterStore = createStore({
    storeName: 'router',
    initialize: function () {
        'use strict';
        this.setMaxListeners(20);
    },
    navigate: function (payload) {
        'use strict';
        var self = this;
        var match = this.getContext().urls.build(payload.key, payload.params);
        var new_match = this.resolveMatch(match.value);

        new_match.catch(function () {
            return match;
        }).done(function (match) {
            self.putMatch(match);
            self.emitChange();
        });
    },
    navigateURL: function (payload) {
        'use strict';
        var self = this;
        var match = this.getContext().urls.match(payload.url);
        var new_match = this.resolveMatch(match.value);

        new_match.catch(function () {
            return match;
        }).done(function (match) {
            self.putMatch(match);
            self.emitChange();
        });
    },
    putMatch: function (match) {
        'use strict';
        this.handler = match.value;
        this.key = match.key;
        this.params = match.params;
        this.url = match.url;
        this.title = match.value.initialTitle();
        this.emitChange();
    },
    reResolve: function () {
        'use strict';

        this.resolveMatch.done(function (new_match) {
            this.putMatch(new_match);
            this.emitChange();
        }.bind(this));
    },
    setTitle: function (payload) {
        'use strict';
        this.title = payload;
        this.emitChange();
    },
    resolveMatch: function (handler) {
        'use strict';

        if (handler.redirect === undefined) {
            return Q.reject();
        }

        return handler.redirect(this.dispatcher).then(function (payload) {
            if (payload === undefined) {
                return Q.reject();
            }
            var match = this.getContext().urls.build(payload.key, payload.params);
            return this.resolveMatch(match.value).catch(function () {
                return match;
            }.bind(this));
        }.bind(this));
    },
    handlers: {
        navigate: 'navigate',
        navigateURL: 'navigateURL',
        setTitle: 'setTitle'
    }
});

module.exports = RouterStore;
