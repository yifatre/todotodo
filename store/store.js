import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux

// -TODOS
export const SET_TODOS = 'SET_TODOS'
export const GET_TODO = 'GET_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// USER
export const SET_USER = 'SET_USER'


const initialState = {
    todos: [],
    isLoading: false,
    loggedInUser: userService.getLoggedinUser()
}

export function appReducer(state = initialState, action = {}) { // {type,  payload}
    switch (action.type) {
        case SET_TODOS: return { ...state, todos: action.todos }

        case REMOVE_TODO: return { ...state, todos: state.todos.filter(todo => todo._id !== action.todoId) }

        case ADD_TODO: return { ...state, todos: [...state.todos, action.todo] }

        case UPDATE_TODO: return { ...state, todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo) }


        case SET_USER: return { ...state, loggedInUser: action.user }



        default: return state
    }
}



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store
