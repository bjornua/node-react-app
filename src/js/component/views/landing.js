"use strict";

import React from "react";
import Page from "./wrappers/page";


class Component extends React.Component {
    render() {
        return <Page title="Landing page" className="dh-maxw35">
            <div>
                <h1>Get your home cleaned today</h1>
                <form className="dh-maxw35 pure-form pure-form-stacked pure-g">
                    <fieldset className="pure-group">
                        <input type="text" placeholder="Zip code" className="pure-input-1"/>
                        <input type="text" placeholder="City" className="pure-input-1"/>
                        <input type="text" placeholder="Street" className="pure-input-1"/>
                        <input type="text" placeholder="Street Number" className="pure-input-1"/>
                        <input type="submit" value="Find cleaning" className="pure-button pure-button-primary pure-input-1" />
                    </fieldset>
                </form>
            </div>
        </Page>;
    }
}

const View = Object.freeze({
    "name": "landing",
    "path": "/",
    "component": Component
});

export default View;
