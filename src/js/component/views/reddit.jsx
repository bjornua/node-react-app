"use strict";

import React from "react";
import Page from "../wrappers/page";
import { connect } from "react-redux";
import Immutable from "immutable";
import * as actions from "../../action";


function createContainer({success} = {}) {
    const url = "https://www.reddit.com/r/pics/new/.json";
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
                load: () => dispatch(actions.request.create(url))
            };
        }
    )(AsyncContainer);
}

class RedditFeed extends React.Component {
    render() {
        console.log('Loaded Feed');
        return <pre>
            {JSON.stringify(this.props.payload.toJS(), null, ' ')}
        </pre>;
    }
}
const RedditFeed2 = createContainer({
    success: RedditFeed
});

class Reddit extends React.Component {
    render() {
        this.props.setTitle("Picture feed");
        return (
            <Page>
                <div>
                    <h1>Picture Feed</h1>
                    <RedditFeed2 />
                </div>
            </Page>
        );
    }
}

export default Reddit;