// EVENTS


# Action
request = {
    create: function (url) {
        return {
            type: "REQUEST_CREATED"
            url: "http://www.google.com/"
        }
    },
    send: function (url) {
        return {
            type: "REQUEST_SENT",
            url: "http://www.google.com/"
        }
    },
    fail: function (url) {
        return {
            type: "REQUEST_FAILED",
            url: "http://www.google.com/"
        }
    },
    complete: function (url) {
        return {
            type: "REQUEST_COMPLETED",
            url: "http://www.google.com/"
        }
    }
}

const initialState = Immutable.Map();

function reducer (state={}, action) {
    switch (action.type) {
        case "REQUEST_CREATED":
        case "REQUEST_SENT":
        case "REQUEST_FAILED":
        case "REQUEST_COMPLETED":
            var current = state.set(;
            return 
    }



    return state;
}



