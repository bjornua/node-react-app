"use strict";

import React from "react";
import Page from "../wrappers/page";
import { connect } from "react-redux";
import Immutable from "immutable";
import * as actions from "./action";

class NotFound extends React.Component {
    render() {


        const pictures = Immutable.Range(0, 10).map(function (val) {
            return <div key={val}>{val}</div>;
        });

        this.props.setTitle("Picture feed");
        return <Page>
            <div>
                <h1>Picture Feed</h1>
                <div>
                    {pictures.toJS()}
                </div>
            </div>
        </Page>;
    }
}


export default NotFound;


var redditPictures = async(
    function (id) {

    }
}

function getState(dispatch, state) {
    dispatch(action.request.create("
    dispatch(actions.request.create("https://www.reddit.com/r/pics/new.json"));

    if (state.get("
}

getState(dispatch, state.async)

redditPictures("gifs").createAction();
redditPictures("gifs").reducer(state, action);


export default connectAsync(
    function(state) {
        var pictures.get("async", "http://reddit
        return {
            pictures: pictures
        };

})(NotFound);


/*
asyncVar = {
    'status': 'WAITING' | 'FAILED' | 'COMPLETED',
    'payload': undefined | something
}
*/