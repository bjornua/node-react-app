"use strict";

import React from "react";
import * as actions from "./action";
import * as reducers from "./reducers";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import createReducer from "./lib/createReducer";

export function getApp (url, Handler) {

    const appReducers = createReducer({}, reducers);

    const loggedAppReducers = (a, b) => {
        console.log("ACTION", b);
        return appReducers(a, b);
    };

    let store = createStore(loggedAppReducers);
    store.subscribe(function () {
        console.log("STATE", store.getState().toJS());
    });

    store.dispatch(actions.setURL(url));
    store.dispatch(actions.request.create("http://google.com"));

    return <Provider store={store}>
        {() => <Handler />}
    </Provider>;
}
