/*global require, module, window */
var hrhrmhandler = require('./component/notfound.js');

module.exports = (function (require) {
    'use strict';
    var React = require('react');
    var env = require('./env');

    var  main_component = React.createClass({
        displayName: 'main_component',
        mixins: [env.mixin()],
        // componentWillMount: function () {
        //     this.update_view();
        // },
        // componentDidMount: function () {
        //     window.onpopstate = function () {
        //         this.dispatch('navigateURL', {url: window.document.location.pathname});
        //     }.bind(this);


        //     if (window.document.location.pathname !== nav.url) {
        //         window.history.pushState(null, null, nav.url);
        //     }
        // },
        // update_view: function () {
        //     var nav = this.store(NavigationStore);
        //     var urls = this.props.urls;
        //     var match;
        //     if (nav.url !== null) {
        //         match = urls.match(nav.url);
        //     } else {
        //         match = urls.build(nav.view.key, nav.view.params);
        //     }

        //     var redirect;
        //     while (match.redirect !== undefined) {
        //         redirect = match.value.redirect(match);
        //         if (redirect !== undefined) {
        //             match = urls.build(redirect.key, redirect.params);
        //         } else {
        //             break;
        //         }
        //     }
        //     this.setState({
        //         title: match.value.initialTitle(),
        //         match: match
        //     });
        //     return;
        // },
        render: function () {

            var main_handler = hrhrmhandler;

            var handler = main_handler;
            while (handler.parent !== undefined) {
                handler = handler.parent;
            }

            var title = 'Hello hrose' + ' - dotarally.com';

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

    return main_component;
}(require));