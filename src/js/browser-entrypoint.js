"use strict";

import React from "react";
import {getApp} from "./env";
import BrowserView from "./browser-component";
import {getWindowPath} from "./browser-component";
import { Provider } from "react-redux";
import request from "superagent";
import * as actions from "./action";


function render(store) {
    React.render(
        <Provider store={store}>
            {() => <BrowserView />}
        </Provider>,
        document.getElementById("app_container")
    );

}
function fetcher(store) {
    function update() {
        const async = store.getState().get("async");
        const created = async
            .filter((val) => val.get('status') === 'CREATED')
            .flip().toSet();

        created.forEach(function (url) {
            store.dispatch(actions.request.send(url));

            request.get(url)
                .end(function (err, res) {
                    if (err !== null) {
                        store.dispatch(actions.request.fail(url));
                        console.error(url);
                        console.error(err);
                        return;
                    }
                    store.dispatch(actions.request.complete(url, res.body));
                })
                // .on('error', error => {
                // console.error(error);
            // });

            
        });
        
    };
    store.subscribe(update);
    update();

}

(function main() {
    const store = getApp(getWindowPath());
    fetcher(store);
    render(store);
})();
