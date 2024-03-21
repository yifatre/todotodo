import { storageService } from "./async-storage.service"

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }
            if (filterBy.isDone !== undefined) {
                todos.filter(todo => todo.isDone === filterBy.isDone)
            }
            return todos
        })
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) return storageService.put(STORAGE_KEY, todo)
    return storageService.post(STORAGE_KEY, todo)
}

function getEmptyTodo() {
    return {
        txt: '',
        isDone: false
    }
}



function getDefaultFilter() {
    return {
        txt: '',
        isDone: undefined,
        createdAt: Date.now()
    }
}

// const todo = { _id, txt, isDone, createdAt }