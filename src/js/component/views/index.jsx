import NotFound from "./notfound";
import Landing from "./landing";
import Reddit from "./reddit";

const routes = Object.freeze([
    ["notfound", null, NotFound],
    ["landing", "/user/", Landing],
    ["reddit", "/reddit/", Reddit]
]);

export default routes;
