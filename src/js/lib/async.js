// EVENTS
import Immutable from "immutable";

export const request = {
    create: function (url) {
        return {
            type: "REQUEST_CREATED",
            url
        }
    },
    send: function (url) {
        return {
            type: "REQUEST_SENT",
            url
        }
    },
    fail: function (url) {
        return {
            type: "REQUEST_FAILED",
            url
        }
    },
    complete: function (url, payload) {
        return {
            type: "REQUEST_COMPLETED",
            url,
            payload
        }
    }
}

const initialState = Immutable.Map();

const Request = Immutable.Record({
    url: undefined,
    status: undefined,
    payload: undefined
});


const handlers = {
    REQUEST_CREATED: (state, action) => state.set(action.url, Request({url: action.url, status: "CREATED"})),
    REQUEST_SENT:    (state, action) => state.setIn([action.url, "status"], "SENT"),
    REQUEST_FAILED:  (state, action) => state.setIn([action.url, "status"], "FAILED"),
    REQUEST_COMPLETED: function (state, action) {
        const {url, payload} = action;
        const status = "COMPLETED";
        return state.mergeIn([url], {status, payload});
    }
}

export function reducer (state=initialState, action) {
    const handler = handlers[action.type];

    if (handler === undefined) {
        return state;
    }
    return handler(state, action);
}