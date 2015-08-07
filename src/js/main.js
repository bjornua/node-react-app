"use strict";

import React from "react";
import {getRoute} from "./urls";
import Marty from "marty";


export default class URLView extends React.Component {
    constructor(props) {
        super(props);
    }
    onRefreshTitle() {
        this.forceUpdate();
    }
    render() {
        const route = getRoute(this.props.url);

        var title = route.component.title();

        return <html>
            <head>
                <title>{title}</title>
                <link rel="stylesheet" type="text/css" href="/style.css" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </head>
            <body>
                <route.component params={route.params} title={title} />
                <script async={true} src="/frontend.js" />
            </body>
        </html>;
    }
}

const view = Marty.createContainer(URLView, {
    listenTo: "navigationStore",
    fetch() {
        return {url: this.app.navigationStore.state.url};
    }
});

export default view;
