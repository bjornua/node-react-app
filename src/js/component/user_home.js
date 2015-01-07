/*global require, module */
/*jslint sloppy: true */

var React = require('react');
var page = require('../component/wrappers/page');
var env = require('../env');
var UserStore = require('../store/user');
var Q = require('q');


module.exports = React.createClass({
    mixins: [env.mixin],
    statics: {
        stores: [UserStore],
        initialTitle: function () {
            return 'Page';
        },
        parent: page,
        redirect: function (dispatcher) {
            return Q(function (resolve) {
                dispatcher.waitFor([UserStore], resolve);
            }).then(function () {
                if (dispatcher.getStore(UserStore).isAuthed === false) {
                    return {key: 'user_signin'};
                }
            });
        }
    },
    render: function () {
        return this.createElement('div', {},
            React.createElement('h1', {}, this.store(UserStore).username),
            React.createElement('p', {}, 'Hello and welcome. This is your profile page.')
        );
    }
});
