/*global require, module */
/*jslint sloppy: true */
"use strict";

import React from "react";
import classnames from "classnames";

import Link from "../widget/link";

const LogoURL = require("../../../image/logo.png");

export default class Base extends React.Component {
    render() {
        return <div>
            <Link dest="landing" className="dh-logo">
                <img src={LogoURL} />
            </Link>
            <ul>
                <li><Link dest="reddit">Reddit</Link></li>
                <li><Link dest="afasdfas">Not found</Link></li>
                <li><Link dest="landing">Landing page</Link></li>
            </ul>

            <div className="dh-content">
                {this.props.children}
            </div>
        </div>
    }
}
