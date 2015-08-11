"use strict";

import React from "react";
import Handler from "./main";
import * as actions from "./action";
import * as reducers from "./reducers";

import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux';


export function getApp (url) {
    const appReducers = combineReducers(reducers);

    const loggedAppReducers = (a, b) => {
        console.log(b);
        return appReducers(a, b);
    };

    let store = createStore(loggedAppReducers);
    store.dispatch(actions.setURL(url));

    return <Provider store={store}>
        {() => <Handler />}
    </Provider>;
}
