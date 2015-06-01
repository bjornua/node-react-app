"use strict";

var Marty = require("marty");

var constants = {
    setURL: "setURL",
    setView: "setView",
    setTitle: "setTitle"
};
Marty.createConstants(["setURL", "setView", "setTitle"]);

var store = Marty.createStore({
    getInitialState: function () {
        return {
            match: null,
            title: null
        };
    },
    handlers: {
        onSetURL: constants.setURL,
        onSetView: constants.setView,
        onSetTitle: constants.setTitle
    },
    resetTitle: function () {
        this.title = this.handler.getInitialTitle();
    },
    resolveRedirects: function (match, cb) {
        var urls = require("../urls");
        var redirect;
        while (match.value.redirect !== undefined) {
            redirect = match.value.redirect();
            if (redirect !== undefined) {
                match = urls.build(redirect.key, redirect.params);
            } else {
                break;
            }
        }
        return match;
    },
    onSetURL: function (payload) {
        var urls = require("../urls");
        this.match = urls.match(payload.url);
        this.resolveRedirects();
        this.resetTitle();
    },
    onSetView: function (payload) {
        var urls = require("../urls");
        this.match = urls.build(payload.key, this.params || {});
        this.resolveRedirects();
        this.resetTitle();
    },
    onSetTitle: function (payload) {

    }
});
/*
module.exports = coldstorage.createModule({
    id: "navigation",
    getInitialState: function () {
        return {
            title: undefined,
            handler: undefined,
            params: undefined,
            url: undefined,
            key: undefined
        };
    },
    setMatch: function (match) {
        var handler = match.value;
        var title;
        if (handler.initialTitle !== undefined) {
            title = handler.initialTitle();
        }
        this.state = {
            handler: handler,
            key: match.key,
            params: match.params,
            url: match.url,
            title: title
        };
    },
    checkRedirects: function (handler) {

    },
    handlers: {
        setTitle: function (payload) {
            this.state.title = payload.title;
        },

        setView: function (payload) {
            var urls = require("../urls");
            var params = {};
            if (payload.params !== undefined) {
                params = payload.params;
            }
            match = urls.build(payload.key, params);
            var newMatch = this.checkRedirects(match.value);
            newMatch = this
        },
        default: function () {
            var match = this.checkRedirects(this.handler);
            if (match !== undefined) {
                this.setMatch(match);
            };
        }
    }
});





var actions = {
    setURL: function (url) {
        this.dispatch(constants.setURL, {url: url});
    },
    setView: function (key, params) {
        this.dispatch(constants.setView, {key: key, params: params});
    },
    setTitle: function (title) {
        this.dispatch(constants.setTitle, {title: title});
    }
};

module.exports = {
    actions: actions,
    constants: constants,
    store: store
};
/*
var coldstorage = require("coldstorage");
var action = require("../action");

var Immutable = require("immutable");

var store = coldstorage.createStore({
    id: "navigation",
    update: function (old, get) {
        var urls = require("../urls");
        var match;
        if (get(action.setTitle) !== undefined) {
            return old.set("title", get(action.setTitle).get("title"));
        }
        if (get(action.setURL) !== undefined) {
            match = urls.match(get(action.setURL).get("url"));
        } else if (get(action.setView) !== undefined) {
            var params = get(action.setView).get("params");
            if (params === undefined) {
                params = Immutable.Map();
            }
            match = urls.build(get(action.setView).get("key"), params.toJS());
        } else if (old.size !== 0) {
            match = {
                value: old.get("handler"),
                key: old.get("key"),
                params: old.get("params"),
                url: old.get("url")
            };
        }
        if (match !== undefined) {
            var redirect;
            while (match.value.redirect !== undefined) {
                redirect = match.value.redirect(get);
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
            return old.merge({
                handler: handler,
                key: match.key,
                params: match.params,
                url: match.url,
                title: title
            });
        }
        return old;
    }
});

module.exports = store;
*/