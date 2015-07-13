"use strict";

import React from "react";
// import Link from "./link";
// import MenuStore from "../../store/menu";
import Immutable from "immutable";

export default class SideMenu extends React.Component {
    // mixins: [env.mixin()],
    render() {
        // const self = this;

        // var menu = this.get(MenuStore);
        // menu = menu.unshift(Immutable.Map({
        //     callback: function () {
        //         self.dispatch(action.sidemenuHide);
        //     },
        //     title: "Close"
        // }));

        // menu = menu.map(function (item, key) {
        //     var isActive = false; //this.store(RouterStore).key === item[1].dest;
        //     var link;
        //     if (item.has("dest")) {
        //         link = this.createElement(Link, {dest: item.get("dest")}, item.get("title"));
        //     } else if (item.has("callback")) {
        //         link = this.createElement(Link, {callback: item.get("callback")}, item.get("title"));
        //     }

        //     return React.createElement("li", {
        //             key: key,
        //             className: isActive ? "pure-menu-selected" : ""
        //         },
        //         link
        //     );
        // }, this);

        var menu = Immutable.Map();
        return <ul className="dh-sidemenu">
            {menu.toJS()}
        </ul>;
    }
}
