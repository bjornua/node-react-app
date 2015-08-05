"use strict";
import React from "react";

export default class Main extends React.Component {
    render() {
        return <html>
            <head>
                <title>{this.props.title}</title>
                <link rel="stylesheet" type="text/css" href="/style.css" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </head>
            <body>
                {this.props.children}
                <script async={true} src="/script.js" />
            </body>
        </html>;
    }
}
