"use strict";

import React from "react";
import Base from "./base";

export default class Page extends React.Component {
    render() {
        let className = "dh-mainpage";

        if (this.props.className !== undefined) {
            className += " " + this.props.className;
        }

        return <Base title={this.props.title}>
            <div className={className}>
                {this.props.children}
            </div>
        </Base>;
    }
}
