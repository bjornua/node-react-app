"use strict";

import React from "react";
import Page from "../wrappers/page";
import Immutable from "immutable";
import { createContainer } from "../../lib/async";


class RedditFeed extends React.Component {
    render() {
        const { payload } = this.props;

        const pictures = payload.getIn(["data", "children"])
            .map(val => { console.log(val.toJS()); return val; })
            .map(val => val.get("data"))
            .filter(val => val.get("domain") === "i.imgur.com")
            .map(val => val.getIn(["url"]))
            .map(function(url) {
                return <img style={{width: "50%", height: "10em"}} src={url} />;
            });

        return <div>
            {pictures.toJS()}
        </div>;
    }
}
const RedditFeed2 = createContainer(
    "https://www.reddit.com/r/pics/new/.json",
    {
        success: RedditFeed
    }
);

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