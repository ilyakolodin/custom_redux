const ACTIONS = {
    ADD_EVENT: 'ADD_EVENT',
    REMOVE_EVENT: 'REMOVE_EVENT',
    SORT_EVENT: 'SORT_EVENT',
    SUCCESS_LOGIN: 'SUCCESS_LOGIN',
}
const createStore = (reducer) => {
    let state = reducer(undefined, {type: '__INIT'})
    let subscribers = []
    return {
        getState: () => state,
        dispatch: action => {
            state = reducer(state, action)
            subscribers.forEach((callback) => callback())
        },
        subscribe: (callback) => subscribers.push(callback)
    }
}

const addEvent = (value) => {
    return {
        type: ACTIONS.ADD_EVENT,
        payload: value
    };
}

const removeEvent = (value) => {
    return {
        type: ACTIONS.REMOVE_EVENT,
        payload: value
    };
}

const sortEvent = () => {
    return {
        type: ACTIONS.SORT_EVENT,
    };
}

const reducerEvents = (state, action) => {
    const initialStateEvents = {
        eventsWorld: [
            'Событие 1'
        ]
    }

    if (state === undefined) {
        state = initialStateEvents;
    }
    if (action.type === ACTIONS.ADD_EVENT) {
        const newPartState = [...state.eventsWorld]
        newPartState.push(action.payload)
        return {
            ...state,
            eventsWorld: newPartState
        }
    }
    else if (action.type === ACTIONS.REMOVE_EVENT) {
        const newPartState = [...state.eventsWorld].filter((item) => {
                return item !== action.payload;
            });
        return {
            ...state,
            eventsWorld: newPartState
        }
    }
    else if (action.type === ACTIONS.SORT_EVENT) {
        const newPartState = [...state.eventsWorld].sort()
        return {
            ...state,
            eventsWorld: newPartState
        }
    } else {
        return state;
    }
}

const reducerLogin = (state, action) => {
    const initialStateUsers = {
        users: [
            'Пользователь 1'
        ]
    }

    if (state === undefined) {
        state = initialStateUsers;
    }
    if (action.type === ACTIONS.SUCCESS_LOGIN) {
        return {
            ...state,
            users: action.payload
        }
    } else {
        return state;
    }
}

const combineReducers = (reducersMap) => {
    return (state, action) => {
        const nextState = {}
        //find out how it works
        Object.entries(reducersMap).forEach(([key, reducer]) => {
            nextState[key] = reducer(state ? state[key] : state, action)
        })
        return nextState
    }
}

const rootReducer = combineReducers({
    reducerEventsState: reducerEvents,
    reducerUsersState: reducerLogin
})

function render() {
    console.log(store.getState());
}

const store = createStore(rootReducer)
store.subscribe(render)

store.dispatch(addEvent("Event"));
store.dispatch(addEvent("Event 3"));
store.dispatch(addEvent("Event 2"));

store.dispatch(removeEvent("Event"));
store.dispatch(sortEvent());

