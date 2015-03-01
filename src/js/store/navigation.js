"use strict";

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
