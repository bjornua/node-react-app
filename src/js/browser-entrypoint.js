"use strict";

import * as React from "react";
import * as routes from "./urls";
import * as Router from "react-router";

Router.run(routes, Router.HistoryLocation, function (Root) {
    React.render(
        React.createElement(Root),
        window.document
    );
});
