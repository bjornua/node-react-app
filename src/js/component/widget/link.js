/*global require, module */
import React from "react";
import action from "../../action";


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
            // url = urls.build(self.props.dest, self.props.params).url;
            url = "/";
            link = function (e) {
                e.preventDefault();
                self.dispatch(action.setView, {key: self.props.dest, params: self.props.params});
            };
        }
        return <a href={url} onClick={link} className={this.props.className}>
            {this.props.children}
        </a>;
    }
}

