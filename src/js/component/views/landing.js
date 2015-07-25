"use strict";

import React from "react";
import Page from "./wrappers/page";


class Component extends React.Component {
    render() {
        return <Page title="Landing page">
            <div>
                <h1>Find your cleaner today</h1>
                <div className="dh-maxw35">
                    <input type="text" placeholder="What is your address" />
                </div>
            </div>
        </Page>;
    }
}

const View = Object.freeze({
    "name": "landing",
    "path": "/",
    "component": Component
});

export default View;
