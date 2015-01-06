/*global require, module, window */
var React = require('react');
var env = require('./env');

var RouterStore = require('./store/router');
var TitleStore = require('./store/title');

var  main_component = React.createClass({
    displayName: 'main_component',
    mixins: [env.mixin([TitleStore])],
    componentDidMount: function () {
        'use strict';
        var self = this;
        self.update_url = function () {
            var store = self.store(RouterStore);

            if (window.document.location.pathname !== store.url) {
                window.history.pushState(null, null, store.url);
            }
        };
        self.addStoreListener(RouterStore, self.update_url);
        window.onpopstate = function () {
            self.dispatch('navigateURL', {url: window.document.location.pathname});
        };
    },
    componentWillUnmount: function () {
        'use strict';
        this.removeStoreListener(RouterStore, this.update_url);
    },
    render: function () {
        'use strict';
        var main_handler = this.store(RouterStore).handler;
        var handler = main_handler;
        while (handler.parent !== undefined) {
            handler = handler.parent;
        }

        var title = this.store(TitleStore).title + ' - dotarally.com';
        return React.createElement('html', {},
            React.createElement('head', {},
                React.createElement('title', {}, title),
                React.createElement('link', {rel: "stylesheet", type: "text/css", href: "/style.css"}),
                React.createElement('meta', {name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"})
            ),
            React.createElement('body', {},
                this.createElement(handler, {handler: main_handler}),
                React.createElement('script', {async: true, src: '/script.js'}),
                React.createElement('script', {async: true, src: 'http://localhost:35729/livereload.js'})
            )
        );
    }
});


module.exports = main_component;