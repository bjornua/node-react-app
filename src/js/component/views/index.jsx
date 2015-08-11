import NotFound from "./notfound";
import Landing from "./landing";

const routes = Object.freeze([
    ["notfound", null, NotFound],
    ["landing", "/user/", Landing]
]);

export default routes;
