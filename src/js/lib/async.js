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
            type: "REQUEST_SUCCESS",
            url: "http://www.google.com/"
        }
    }
}


function reducer (state={}, action) {

    switch (action.type) {
        case "REQUEST_CREATED":
            return 
    }



    return state;
}



