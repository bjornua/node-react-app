/*global require, module */
/*jslint sloppy: true */
"use strict";

import React from "react";
import Main from "./main";
import classnames from "classnames";

import Link from "../../widget/link";
import Topmenu from "../../widget/topmenu";
import Sidemenu from "../../widget/sidemenu";
import Messages from "../../widget/messages";

export default class Base extends React.Component {
     constructor(props) {
        super(props);
    }
    render() {
        const baseClasses = classnames("dh-base", {
            "dh-sidemenu-open": true // this.get(sidemenuStore, "show")
        });

        return <Main title={this.props.title}>
            <div className={baseClasses}>
                <div className="dh-header">
                    <div className="dh-homemenu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed">
                        <Link dest="404" params={{path: "/"}} className="dh-logo">
                            <img src="/image/logo.png" />
                        </Link>
                        <Topmenu />
                    </div>
                </div>
                <div className="dh-content">
                    <Messages />
                    {this.props.children}
                    <Sidemenu />
                </div>
            </div>
        </Main>;
    }
}
