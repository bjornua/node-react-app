"use strict";

import Marty from "marty";
import constants from "../constants";

class NavigationStore extends Marty.Store {
    constructor(options) {
        super(options);
        this.state = {url: "/user/"};
        this.handlers = {
            setURL: constants.setURL
        };
    }
    setURL(url) {
        this.state.url = url;
        this.hasChanged();
    }
}

export default NavigationStore;
