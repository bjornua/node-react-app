"use strict";

import React from "react";
import Base from "./base";

export default class Page extends React.Component {
    render() {
        return <Base title={this.props.title}>
            <div className="dh-mainpage">
                {this.props.children}
            </div>
        </Base>;
    }
}
