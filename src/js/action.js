"use strict";

import {createActionCreators} from "marty";
import constants from "./constants";


const actions = createActionCreators({
    setURL: function (url) {
        this.dispatch(constants.setURL, url);
    }
});

export default actions;
