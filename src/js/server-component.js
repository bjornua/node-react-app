"use strict";

import React from "react";
import {getRoute} from "./urls";
import MainApp from "./main-component";
import { connect } from "react-redux";

const stylesheetStr = String(require("../less/main.less"));


class ServerView extends React.Component {
    render() {
        let title = "";
        function setTitle (newTitle) {
            title = newTitle;
        }

        var content = React.renderToString(
            <MainApp url={this.props.url} setTitle={setTitle} />
        );


        return <html>
            <head>
                <title>{title}</title>
                <style>{stylesheetStr}</style>
                <link rel="stylesheet" type="text/css" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </head>
            <body>
                <div id="app_container" dangerouslySetInnerHTML={{__html: content}} />
                <script async={true} src="/frontend.js" />
            </body>
        </html>;
    }
}

export default connect(function(state) {
    return {
        url: state.getIn(["route", "url"])
    };
})(ServerView);
