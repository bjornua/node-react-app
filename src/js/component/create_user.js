/*jslint sloppy: true */
/*global require, module */
"use strict";


import React from "react";
import page from "./wrappers/page";
import Link from "./widget/link";
import env from "../env";

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "", //this.store(UserStore).username,
            password: ""
        }; 
    }
    static initialTitle() {
        return "Create User";
    }
    createUser(e) {
        e.preventDefault();
    }
    emailChange(e) {
        this.setState({email: e.target.value});
    }
    passwordChange0(e) {
        this.setState({password0: e.target.value});
    }
    passwordChange1(e) {
        this.setState({password1: e.target.value});
    }
    render() {
        return <div>
            <div className="dh-maxw30">,
                <form onSubmit={this.createUser} className="pure-form pure-form-stacked" />
                    <h1>Create User</h1>
                    <fieldset className="pure-group">
                        <input
                            className="pure-input-1"
                            type="email"
                            onChange={this.emailChange}
                            value={this.state.email}
                            placeholder="Your e-mail address"
                            required="true"
                        />
                        <input
                            className="pure-input-1"
                            type="password"
                            onChange={this.passwordChange0}
                            value={this.state.password0}
                            placeholder="Choose a password"
                            required="true"
                        />
                        <input
                            className="pure-input-1"
                            type="password"
                            onChange={this.passwordChange1}
                            value={this.state.password1}
                            placeholder="Repeat chosen password"
                            required="true"
                        />
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
