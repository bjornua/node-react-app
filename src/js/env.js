"use strict";



import React from "react";
import * as actions from "./action";
import * as reducers from "./reducers";

import { createStore, combineReducers } from "redux";

import createReducer from "./lib/createReducer";

function log (varName, obj) {
    const objPrint = JSON.stringify(obj, null, '    ');
    console.log ("%s = %s", varName, objPrint);
}

export function getApp (url, Handler) {

    const appReducers = createReducer({}, reducers);

    const loggedAppReducers = (a, b) => {
        log("action", b);
        return appReducers(a, b);
    };

    let store = createStore(loggedAppReducers);
    store.subscribe(function () {
        const obj = store.getState().toJS();
        log("store", obj);
    });

    store.dispatch(actions.setURL(url));

    return store;

}
