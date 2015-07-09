"use strict";

import {createActionCreators} from "marty";
import * as constants from "./constants";


module.exports = createActionCreators({
  setView: function (key, params) {
    if (params === undefined) {
        params = {};
    }
    this.dispatch(constants.setView, key, params);
  },
  setURL: function (url) {
    this.dispatch(constants.setURL, url);
  },
  setTitle: function (newTitle) {
    this.dispatch(constants.setTitle, newTitle);
  }
});
