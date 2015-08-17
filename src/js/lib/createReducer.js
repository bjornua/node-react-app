import Immutable, { Map, List } from 'immutable';

function validateReducerOutput(state) {
    if (!Map.isMap(state) && !List.isList(state)) {
        throw new TypeError('Reducers must return Immutable objects.');
    }
}

export default function createReducer(initialState, handlers) {
    handlers = Immutable.fromJS(handlers);

    return (state = initialState, action) => {
        if (!Map.isMap(state) && !List.isList(state)) {
            state = Immutable.fromJS(state);
        }

        return handlers.map(function (handler, key) {
            const stateOld = state.get(key);
            const stateNew = handler(stateOld, action);
            validateReducerOutput(stateNew);
            return stateNew;
        });
    };
}