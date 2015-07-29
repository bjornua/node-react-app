"use strict";

import React from "react";
import Page from "./wrappers/page";


class Component extends React.Component {
    render() {
        return <Page title="Landing page" className="dh-maxw35">
            <div>
                <h1>Get your home cleaned today</h1>
                <form className="dh-maxw35 pure-form pure-form-stacked">
                    <fieldset className="pure-group">
{/*}                        <input type="text" placeholder="Post nummer" className="pure-input-1"/>
                        <input type="text" placeholder="By" className="pure-input-1"/>
                        <input type="text" placeholder="Gade" className="pure-input-1"/>
                        <input type="text" placeholder="Gadenummer" className="pure-input-1"/>
{*/}
                        <input type="text" placeholder="Where do you live?" className="pure-input-1"/>
                        <input type="submit" value="Find cleaning" className="pure-button pure-button-primary pure-input-1" />
                    </fieldset>
                </form>
            </div>
        </Page>;
    }
}

export default Component;
