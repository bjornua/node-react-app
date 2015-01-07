/*global require, module */
/*jslint sloppy: true */

var React = require('react');
var page = require('./wrappers/page');
var link = require('./widget/link');
var env = require('../env');
var UserStore = require('../store/user');


module.exports = React.createClass({
    mixins: [env.mixin],
    statics: {
        initialTitle: function () {
            return 'Create User';
        },
        parent: page,
        redirect: function (dispatcher) {
            return env.waitFor(dispatcher, [UserStore]).then(function (userstore) {
                if (userstore.isAuthed === true) {
                    return {key: 'user_home'};
                }
            });
        }
    },
    signin: function (e) {
        e.preventDefault();
        this.dispatch('signin', {username: this.state.email});
    },
    emailChange: function (e) {
        this.setState({email: e.target.value});
    },
    passwordChange: function (e) {
        this.setState({password: e.target.value});
    },
    getInitialState: function () {
        return {
            email: 'lala@lala.com',
            password: '123'
        };
    },
    render: function () {
        return this.createElement('div', {},
                React.createElement('div', {className: "dh-maxw30"},
                React.createElement('form', {onSubmit: this.signin, className: "pure-form pure-form-stacked"},
                    React.createElement('h1', {}, "Sign In"),
                    React.createElement('fieldset', {className: "pure-group"},
                        React.createElement('input', {className: "pure-input-1", type: "email", onChange: this.emailChange, value: this.state.email, placeholder: "Your e-mail address", required: true}),
                        React.createElement('input', {className: "pure-input-1", type: "password", onChange: this.passwordChange, value: this.state.password, placeholder: "Your password", required: true})
                    ),
                    React.createElement('button', {type: "submit", className: "pure-button pure-button-primary pure-input-1"},
                        "Sign In"
                    )
                ),
                React.createElement('p', {className: "dh-centertext"},
                    "Or if you don't have an account you can ",
                    this.createElement(link, {dest: "user_create"}, " create one here")
                )
            )
        );
    }
});