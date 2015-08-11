"use strict";

import React from "react";
import {getRoute} from "./urls";
import { connect } from "react-redux";
import { setURL } from "./action";

const stylesheetStr = String(require("../less/main.less"));


function getWindowPath() {
    if (HAS_WINDOW) { 
        const { pathname, search } = window.location;
        return pathname + search;
    } else {
        throw "There is no window";
    }
}

function pushURL(path) {
    if (HAS_WINDOW === true) {
        if (getWindowPath() !== path) {
            window.history.pushState(null, null, path);
        }
    }
}

export default class URLView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.addEventListener("popstate", (e) => {
            const { dispatch } = this.props;

            dispatch(setURL(getWindowPath()));

        });
    }
    onRefreshTitle() {
        this.forceUpdate();
    }
    render() {
        pushURL(this.props.url);

        const route = getRoute(this.props.url);

        var title = route.component.title();

        return <html>
            <head>
                <title>{title}</title>
                <style>{stylesheetStr}</style>
                <link rel="stylesheet" type="text/css" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </head>
            <body>
                <route.component params={route.params} title={title} />
                <script async={true} src="/frontend.js" />
            </body>
        </html>;
    }
}

export default connect(function(state) {
    return {
        url: state.route.url
    };
})(URLView);
