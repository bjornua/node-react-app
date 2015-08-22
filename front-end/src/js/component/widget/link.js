/*global require, module */
import React from "react";
import * as actions from "../../action";
import {makePath} from "../../urls";
import { connect } from "react-redux";


class Link extends React.Component {
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
            link = (e) => {
                e.preventDefault();
                this.props.dispatch(actions.setURL(url));
            };
        }
        return <a href={url} onClick={link} className={this.props.className}>
            {this.props.children}
        </a>;
    }
}


export default connect(
    function(state) { 
        return {};
    }
)(Link);
