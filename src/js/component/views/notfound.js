"use strict";

import React from "react";
import Page from "./wrappers/page";

export const handles = "notfound";
export const path = "/";


export default class View extends React.Component {
    static initialTitle() {
        return "Not found";
    }

    render() {
        return <Page title="Not Found">
            <div>
                <h1>Page not found</h1>
                <div className="dh-maxw35">
                    <p>The page you are looking for does not exist</p>
                    <p>
                        {
                            //<strong>{this.get(navigationStore, "url")}</strong>}
                        }
                    </p>
                    <p>This usually happens when:</p>
                    <ul>
                        <li>The page has been removed at some point.</li>
                        <li>The link you clicked was mistyped.</li>
                        <li>You mistyped the address.</li>
                    </ul>
                    <p>We are sorry about the inconvenience.</p>
                </div>
            </div>
        </Page>;
    }
}
