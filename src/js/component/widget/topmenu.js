"use strict";

import React from "react";
import Link from "./link";
// var MenuStore = require("../../store/menu");
import action from "../../action";

export default class Topmenu extends React.Component {
    render() {
        const self = this;


        // var menu = this.get(MenuStore).map(function (item, key) {
        //     var isActive = false; //this.store(RouterStore).key === item[1].dest;
        //     return React.createElement("li", {
        //             key: key,
        //             className: isActive ? "pure-menu-selected" : ""
        //         },
        //         this.createElement(link, {dest: item.get("dest")}, item.get("title"))
        //     );
        // }, this);
        return <ul>
            <li className="dh-menu-icon">,
                <Link callback={function () { self.dispatch(action.sidemenuShow); }}>
                    <img src="/image/menu.png" />
                </Link>
            </li>
        </ul>;
    }
}
