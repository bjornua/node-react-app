/*global module, require */


module.exports = (function () {
    'use strict';
    var actions = '';

    var urls = require('../urls');
    var createEmitter = require('../lib/dispatcher').createEmitter;

    var triggerMatch = function (match) {
        return {
            handler: match.value,
            key: match.key,
            params: match.params,
            url: match.url
        };
    };

    return createEmitter('navigation')
        .on([actions.setURL], function (stores) {
            var match = urls.match(stores.getIn([actions.setURL, 'url']));
            return triggerMatch(match);
        }).on([actions.setView], function (stores) {
            var key = stores.get([actions.setURL, 'key']);
            var params = stores.get([actions.setURL, 'params']);
            var match = urls.build(key, params);
            return triggerMatch(match);
        });
}());
/*
var createStore = require('dispatchr/utils/createStore');
var UserStore = require('./user');
var utils = require('../lib/utils');
var Q = require('q');

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
        this.emitChange();
    },
    reResolve: function () {
        'use strict';
        var self = this;
        self.resolveMatch(self.handler).done(function (new_match) {
            self.putMatch(new_match);
            self.emitChange();
        });
    },
    resolveMatch: function (handler) {
        'use strict';
        var self = this;

        if (handler.redirect === undefined) {
            return Q.reject();
        }

        return handler.redirect(self.dispatcher).then(function (payload) {
            if (payload === undefined) {
                return Q.reject();
            }
            var match = self.getContext().urls.build(payload.key, payload.params);
            return self.resolveMatch(match.value).catch(function () {
                return match;
            });
        });
    },
    handlers: {
        navigate: 'navigate',
        navigateURL: 'navigateURL'
    }
});

module.exports = RouterStore;

*/