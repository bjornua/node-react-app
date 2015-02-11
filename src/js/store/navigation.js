'use strict';

var coldstorage = require('coldstorage');
var action = require('../action');
var Immutable = require('immutable');
var storeUser = require('./user');

var store = coldstorage.createStore('navigation');

store = store.on([action.setURL, action.setView, storeUser], function (setURL, setView, user) {
    var urls = require('../urls');
    var match;
    if (setURL !== undefined) {
        match = urls.match(setURL.get('url'));
    } else if (setView !== undefined) {
        var params = setView.get('params');
        if (params === undefined) {
            params = Immutable.Map();
        }
        match = urls.build(setView.get('key'), params.toJS());
    } else if (this.size !== 0) {
        match = {
            value: this.get('handler'),
            key: this.get('key'),
            params: this.get('params'),
            url: this.get('url')
        };
    }

    if (match !== undefined) {
        var redirect;
        while (match.value.redirect !== undefined) {
            redirect = match.value.redirect(user);
            if (redirect !== undefined) {
                match = urls.build(redirect.key, redirect.params);
            } else {
                break;
            }
        }
        var handler = match.value;
        var title;
        if (handler.initialTitle !== undefined) {
            title = handler.initialTitle();
        }
        var nextState = this.merge({
            handler: handler,
            key: match.key,
            params: match.params,
            url: match.url,
            title: title
        });
        return nextState;
    }
    return this;
});

store = store.on([action.setTitle], function (setTitle) {
    return this.set('title', setTitle.get('title'));
});

module.exports = store;