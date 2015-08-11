

export function route(state={}, action) {
    if (action.type = 'SET_URL') {
        return {
            ...state,
            url: action.url
        };
    }
    return state;
}
