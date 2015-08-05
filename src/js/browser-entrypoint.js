"use strict";

import * as React from "react";
import Handler from "./main";

function render() {
    React.render(
        <Handler url={window.location.pathname} />,
        window.document
    );
}

render();
