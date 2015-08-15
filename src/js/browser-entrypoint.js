"use strict";

import React from "react";
import {getApp} from "./env";
import BrowserView from "./browser-component";
import {getWindowPath} from "./browser-component";

function render() {
    React.render(
        getApp(getWindowPath(), BrowserView),
        document.getElementById("app_container")
    );
}

render();
