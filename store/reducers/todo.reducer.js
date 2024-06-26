// -TODOS
export const SET_TODOS = 'SET_TODOS'
export const GET_TODO = 'GET_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

const initialState = {
    todos: null,
}

export function todoReducer(state = initialState, action = {}) { // {type,  payload}
    switch (action.type) {
        case SET_TODOS: return { ...state, todos: action.todos }

        case REMOVE_TODO: return { ...state, todos: state.todos.filter(todo => todo._id !== action.todoId) }

        case ADD_TODO: return { ...state, todos: [...state.todos, action.todo] }

        case UPDATE_TODO: return { ...state, todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo) }




        default: return state
    }
}