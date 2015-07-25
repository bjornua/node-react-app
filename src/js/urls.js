/*global require, module */




import Views from "./component/views";
const views = {};
for (let view of Views) {
    views[view.handles] = {path: view.path, component: view.default};
}
Object.freeze(views);

const routes = {};
for (let name in views) {
    console.assert(views[name].path !== undefined);
    routes[name] = views[name];
}
Object.freeze(routes);

import Router from "routr";
const router = new Router(routes);


export function makePath (component, params) {
    return router.makePath(component.handles, params);
}

export function getRoute (url) {
    const route = router.getRoute(url);

    if (route === null) {
        return views.notfound;
    }

    return {
        component: views[route.name],
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
