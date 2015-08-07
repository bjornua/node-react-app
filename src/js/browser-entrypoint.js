"use strict";

import React from "react";
import {getApp} from "./env";

function render() {
    React.render(
        getApp(window.location.pathname),
        window.document
    );
}

render();
