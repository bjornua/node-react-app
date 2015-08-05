/*global require, module */
import React from "react";
import action from "../../action";
import {makePath} from "../../urls";

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const self = this;


        let link, url;

        if (self.props.callback !== undefined) {
            url = "";
            link = function (e) {
                e.preventDefault();
                self.props.callback();
            };
        } else {
            url = makePath(self.props.dest, self.props.params);
            link = function (e) {
                e.preventDefault();
            };
        }

        return <a href={url} onClick={link} className={this.props.className}>
            {this.props.children}
        </a>;
    }
}

