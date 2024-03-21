import { todoService } from "../../services/todo.service.js"
import { REMOVE_TODO, SAVE_TODO, SET_TODOS, store } from "../store.js"

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(filterBy)
        .then(todos => store.dispatch({ type: REMOVE_TODO, todoId }))
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todoId) {
    return todoService.save(filterBy)
        .then(todos => store.dispatch({ type: SAVE_TODO, todoId }))
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}