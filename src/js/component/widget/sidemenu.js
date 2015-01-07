/*global require, module */
/*jslint sloppy: true */

var React = require('react');
var link = require('./link');
var env = require('../../env');
var UserStore = require('../../store/user');
var RouterStore = require('../../store/router');
var _ = require('lodash');

module.exports = React.createClass({
    mixins: [env.mixin],
    statics: {
        stores: [UserStore, RouterStore]
    },
    render: function () {
        var menu = [];
        var self = this;
        menu.push(['wqe', {callback: function () {
            self.dispatch('sidemenu_hide');
        }}, 'Close']);
        if (!this.store(UserStore).isAuthed) {
            menu.push([0, {dest: 'user_create'}, 'Create user']);
            menu.push([1, {dest: 'user_signin'}, 'Sign in']);
        } else {
            menu.push([2, {dest: 'user_home'}, 'Dashboard']);
            menu.push([3, {dest: 'timer'}, 'Timer Test App']);
            menu.push([4, {callback: function () {
                self.dispatch('signout');
            }}, 'Sign out']);
        }

        menu = _.map(menu, function (item) {
            var isActive = this.store(RouterStore).key === item[1].dest;
            return React.createElement('li', {
                    key: item[0]
                },
                this.createElement(link, item[1], item[2])
            );
        }, this);
        return React.createElement('ul', {className: 'dh-sidemenu'},
            menu
        );
    }
});