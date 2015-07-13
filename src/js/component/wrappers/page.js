"use strict";

import React from "react";
import {RouteHandler} from "react-router";

export default class Page extends React.Component {
    render() {
        return <div className="dh-mainpage">
            <RouteHandler/>
        </div>;
    }
}
