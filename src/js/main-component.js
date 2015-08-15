"use strict";

import React from "react";
import {getRoute} from "./urls";


export default class MainApp extends React.Component {
    render() {
        const {url, setTitle} = this.props;
        const {Component, params} = getRoute(url);
        
        return <Component params={params} setTitle={setTitle} />;
    }
}