// EVENTS
import Immutable from "immutable";
import React from "react";
import { connect } from "react-redux";

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

const handlers = {
    REQUEST_CREATED: (state, action) => state.set(action.url, Immutable.fromJS({url: action.url, status: "CREATED"})),
    REQUEST_SENT:    (state, action) => state.setIn([action.url, "status"], "SENT"),
    REQUEST_FAILED:  (state, action) => state.setIn([action.url, "status"], "FAILED"),
    REQUEST_COMPLETED: function (state, action) {
        const {url, payload} = action;
        const status = "COMPLETED";
        const payloadIM = Immutable.fromJS(payload);

        return state.mergeIn([url], {status, payload: payloadIM});
    }
}

export function reducer (state=initialState, action) {
    const handler = handlers[action.type];

    if (handler === undefined) {
        return state;
    }
    return handler(state, action);
}


export function createContainer(url, {success} = {}) {
    const Success = success;

    class AsyncContainer extends React.Component {
        constructor(...args) {
            super(...args);
            this.props.load();
        }
        render() {
            // console.log(this.props);
            switch(this.props.status) {
                case "COMPLETED":
                    return <Success {...this.props.ownProps} payload={this.props.payload} />;
            }
            return <div>{this.props.status}</div>;
        }
    }

    return connect(
        function(state, ownProps) {
            console.log(ownProps);
            return {
                status: state.getIn(["async", url, 'status']),
                payload: state.getIn(["async", url, 'payload']),
                ownProps: ownProps
            };
        }, function (dispatch) {
            return {
                load: () => dispatch(request.create(url))
            };
        }
    )(AsyncContainer);
}
