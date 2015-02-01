/*global require, module */
/*jslint sloppy: true */

var React = require('react');
var link = require('./link');
var env = require('../../env');
var UserStore = require('../../store/user');
var _ = require('lodash');

module.exports = React.createClass({
    mixins: [env.mixin([UserStore])],
    render: function () {
        var menu = [];
        var self = this;
        //if (!this.store(UserStore).isAuthed) {
        if (false) {
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
            var isActive = false; //this.store(RouterStore).key === item[1].dest;
            return React.createElement('li', {
                    key: item[0],
                    className: isActive ? "pure-menu-selected" : ''
                },
                this.createElement(link, item[1], item[2])
            );
        }, this);
        return React.createElement('ul', {},
            menu,
            React.createElement('li', {className: 'dh-menu-icon'},
                this.createElement(link, {callback: function () { self.dispatch('sidemenu_show'); }},
                    React.createElement('img', {src: '/image/menu.png'})
                )
            )
        );
    }
});