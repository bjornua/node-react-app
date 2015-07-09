"use strict";

import {createClass} from "react";
import {RouteHandler} from "react-router";

var page = createClass({
    displayName: "page",
    render: function () {
        return <div className="dh-mainpage">
            <RouteHandler/>
        </div>;
    }
});

module.exports = page;
