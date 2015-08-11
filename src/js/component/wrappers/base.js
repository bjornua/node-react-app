/*global require, module */
/*jslint sloppy: true */
"use strict";

import React from "react";
import classnames from "classnames";

import Link from "../widget/link";

const LogoURL = require("../../../image/logo.png");

export default class Base extends React.Component {
     constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <Link dest="landing" className="dh-logo">
                <img src={LogoURL} />
            </Link>
            <div className="dh-content">
                {this.props.children}
            </div>
        </div>
    }
}
