"use strict";

import React from "react";
import {getApp} from "./env";
import BrowserView from "./browser-component";
import {getWindowPath} from "./browser-component";
import { Provider } from "react-redux";
import oboe from "oboe";
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
            .flip().toList();

        created.forEach(function (url) {
            store.dispatch(actions.request.send(url));

            oboe(url).done(function (things) {
                store.dispatch(actions.request.complete(url, things));
            }).fail(function () {
                store.dispatch(actions.request.fail(url));
            });

            
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
