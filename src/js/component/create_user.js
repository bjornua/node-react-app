/*jslint sloppy: true */
/*global require, module */
"use strict";

var React = require("react");
var page = require("./wrappers/page");
var link = require("./widget/link");
var env = require("../env");

module.exports = React.createClass({
    displayName: "create_user",
    mixins: [env.mixin()],
    statics: {
        initialTitle: function () {
            return "Create User";
        },
        parent: page
    },
    createUser: function (e) {
        e.preventDefault();
    },
    emailChange: function (e) {
        this.setState({email: e.target.value});
    },
    passwordChange0: function (e) {
        this.setState({password0: e.target.value});
    },
    passwordChange1: function (e) {
        this.setState({password1: e.target.value});
    },
    getInitialState: function () {
        return {
            email: "", //this.store(UserStore).username,
            password: ""
        };
    },
    render: function () {
        return this.createElement("div", {},
            React.createElement("div", {className: "dh-maxw30"},
                React.createElement("form",
                    {onSubmit: this.createUser, className: "pure-form pure-form-stacked"},
                    React.createElement("h1", {}, "Create User"),
                    React.createElement("fieldset",
                        {className: "pure-group"},
                        React.createElement("input",
                            {
                                className: "pure-input-1",
                                type: "email",
                                onChange: this.emailChange,
                                value: this.state.email,
                                placeholder: "Your e-mail address",
                                required: true
                            }
                        ),
                        React.createElement("input",
                            {
                                className: "pure-input-1",
                                type: "password",
                                onChange: this.passwordChange0,
                                value: this.state.password0,
                                placeholder: "Choose a password",
                                required: true
                            }
                        ),
                        React.createElement("input",
                            {
                                className: "pure-input-1",
                                type: "password",
                                onChange: this.passwordChange1,
                                value: this.state.password1,
                                placeholder: "Repeat chosen password",
                                required: true
                            }
                        )
                    ),
                    React.createElement("button", {type: "submit", className: "pure-button pure-button-primary pure-input-1"}, "Create User"),
                    React.createElement("p",
                        {className: "dh-centertext"},
                        "Or if you already have an account you can ",
                        this.createElement(link, {dest: "user_signin"}, " sign in here")
                    )
                )
            )
        );
    }
});
