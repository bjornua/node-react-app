"use strict";

import React from "react";
import {getRoute} from "./urls";

export default class URLView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const route = getRoute(this.props.url);
        return <route.component params={route.params} />;

    }
}
