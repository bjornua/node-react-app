'use strict';

module.exports = function () {
    var urls = require('../urls');
    var coldstorage = require('coldstorage');
    var action = require('../action');

    var store = coldstorage.createStore('navigation');

    store = store.on([action.setURL, action.setView], function (setURL, setView) {
        var match;
        if (setURL !== undefined) {
            match = urls.match(setURL.get('url'));
        }
        if (setView !== undefined) {
            match = urls.build(setView.get('key'), setView.get('params'));
        }

        var redirect;
        while (match.redirect !== undefined) {
            redirect = match.value.redirect();
            if (redirect !== undefined) {
                match = urls.build(redirect.key, redirect.params);
            } else {
                break;
            }
        }

        var nextState = this.merge({
            handler: match.value,
            key: match.key,
            params: match.params,
            url: match.url
        });
        return nextState;
    });

    return store;
};

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