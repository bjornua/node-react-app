import Immutable from "immutable";

export const async = require("../lib/async").reducer;


export function route(state=Immutable.Map(), action) {
    if (action.type !== "SET_URL") {
        return state;
    }
    return state.set("url", action.url);
}
