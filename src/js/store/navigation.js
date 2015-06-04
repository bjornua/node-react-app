"use strict";

var Marty = require("marty");

var constants = Marty.createConstants(["setURL", "setView", "setTitle"]);

var store = Marty.createStore({
    getInitialState: function () {
        return {
            match: null,
            title: null
        };
    },
    handlers: {
        setURL: constants.setURL,
        setView: constants.setView,
        setTitle: constants.setTitle
    },
    resetTitle: function () {
        this.setTitle(this.state.match.value.getInitialTitle());
    },
    setTitle: function (title) {
        this.setState({
            title: title
        });
    },
    setURL: function (url) {
        var urls = require("../urls");
        var match = urls.match(url);
        this.setMatch(match, true);
    },
    setView: function (key, params) {
        var urls = require("../urls");
        var match = urls.build(key, params || {});
        this.setMatch(match, true);
    },
    setMatch: function (match, force) {
        var urls = require("../urls");
        var redirect;
        var wasRedirected = false;
        while (match.value.redirect !== undefined) {
            redirect = match.value.redirect();
            if (redirect !== undefined) {
                wasRedirected = true;
                match = urls.build(redirect.key, redirect.params);
            } else {
                break;
            }
        }
        if (wasRedirected === true || force === true) {
            this.setState({
                title: match.value.getInitialTitle(),
                match: match
            });
        }
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