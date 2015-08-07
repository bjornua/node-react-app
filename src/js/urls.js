/*global require, module */




import Views from "./component/views";


const views = {};
for (let view of Views) {
    views[view[0]] = {path: view[1], method: "get", component: view[2]};
}
Object.freeze(views);


const routes = {};
for (let view in views) {
    if (view !== "notfound") {
        console.assert(views[view].path !== undefined);
        routes[view] = views[view];
    }
}

import Router from "routr";
const router = new Router(routes);


export function makePath (view, params) {
    var path = router.makePath(view, params);
    console.log(path);
    return path;
}

export function getRoute (url) {
    const route = router.getRoute(url);

    if (route === null) {
        return {
            component: views.notfound.component,
            params: {}
        };
    }

    return {
        component: route.config.component,
        params: route.params
    };
}



/*var Routes = (
    React.createElement(Route, {
            handler: require("./component/main")
        },
        React.createElement(Route, {
                handler: require("./component/wrappers/base")
            },
            React.createElement(Route, {
                    handler: require("./component/wrappers/page")
                },
                React.createElement(NotFoundRoute, {
                        handler: require("./component/notfound")
                    }
                )
            )
        )
    )
);

module.exports = Routes;*/
/*
r.add("/timer/", "timer", require("./component/timer"));
r.add("/user/signin/", "user_signin", require("./component/signin"));
r.add("/user/create/", "user_create", require("./component/create_user"));
r.add("/user/home/", "user_home", require("./component/user_home"));
r.add("/google_images/", "google_images", require("./component/images"));
r.add("<path:path>", "404", require("./component/notfound"));

module.exports.match = r.match;
module.exports.build = r.build;
*/
