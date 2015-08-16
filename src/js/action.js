
export const request = require("./lib/async").request;


export function setURL (url) {
    return {
        type: 'SET_URL',
        url
    };
}
