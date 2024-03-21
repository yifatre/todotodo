const { createStore, compose } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SAVE_TODO = 'SAVE_TODO'

const initialState = {
    todos: [],
    isLoading: false,
    // loggedInUser: userService.getLoggedinUser()
}

export function appReducer(state = initialState, action = {}) { // {type,  payload}
    switch (action.type) {
        case SET_TODOS: return { ...state, todos: action.todos }



        default: return state
    }
}



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store
