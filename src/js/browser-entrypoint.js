"use strict";

import * as React from "react";
import * as routes from "./urls";
import * as Router from "react-router";

// var env = require("./env");

// var asyncSpawner = require("./store/async").spawner;

// var dispatcher = env.createDispatcher(
//     window.document.location.pathname
// );

// var render;
// var update = function () {
//     // dispatcher = asyncSpawner(dispatcher);
//     render();
// };

// render = function () {
//     React.render(env.createElement({
//         dispatcher: dispatcher,
//         window: window,
//         onDispatch: function (action, payload) {
//             dispatcher = dispatcher.dispatch(action, payload);
//             update();
//         }
//     }), window.document);
// };

// update();

Router.run(routes, Router.HistoryLocation, function (root) {
    React.render(
        React.createElement(root),
        window.document
    );
});
