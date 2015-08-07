"use strict";

import React from "react";
import Marty from "marty";
import Handler from "./main";

import actions from "./action";

class Application extends Marty.Application {
    constructor(options) {
        super(options);
        this.register("action", actions);

        this.dispatcher.register(function (action) {
          console.log(action.type, action.arguments);
        });
        this.register("navigationStore", require("./store/navigation"));
    }
}


export function getApp (url) {
    const app = new Application();

    return<Marty.ApplicationContainer app={app}>
            <Handler />
        </Marty.ApplicationContainer>;

}
