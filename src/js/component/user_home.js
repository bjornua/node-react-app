/*global require, module */
/*jslint sloppy: true */

var React = require('react');
var page = require('../component/wrappers/page');
var env = require('../env');
var UserStore = require('../store/user');
var Q = require('q');


module.exports = React.createClass({
    mixins: [env.mixin([UserStore])],
    statics: {
        initialTitle: function () {
            return 'Page';
        },
        parent: page,
        redirect: function (user) {
            if (user.get('isAuthed') === false) {
                return {key: 'user_signin'};
            }
        }
    },
    render: function () {
        return this.createElement('div', {},
            React.createElement('h1', {}, ''),/*this.store(UserStore).username),*/
            React.createElement('p', {}, 'Hello and welcome. This is your profile page.')
        );
    }
});
