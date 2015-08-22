"use strict";

import React from "react";
import {getRoute} from "./urls";
import { connect } from "react-redux";
import { setURL } from "./action";
import MainApp from "./main-component";


export function getWindowPath() {
    const { pathname, search } = window.location;
    return pathname + search;
}

function pushURL(path) {
    if (getWindowPath() !== path) {
        window.history.pushState(null, null, path);
    }
}

export default class BrowserView extends React.Component {
    componentDidMount() {
        window.addEventListener("popstate", (e) => {
            const { dispatch } = this.props;

            dispatch(setURL(getWindowPath()));

        });
    }
    render() {
        pushURL(this.props.url);
        const route = getRoute(this.props.url);

        function setTitle (title) {
            window.document.title = title;
        }

        return <MainApp url={this.props.url} setTitle={setTitle} />

    }
}

export default connect(function(state) {
    return {
        url: state.getIn(["route", "url"])
    };
})(BrowserView);
