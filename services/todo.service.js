import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo,
    getDefaultFilter,
    getTotalCount,
    getDoneCount
}

function query(filterBy = {}) {
    // console.log('query filterBy', filterBy)
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            // const total = todos.length
            // const done = todos.filter(todo => todo.isDone === true).length
            // console.log('todos', todos)
            if (filterBy.createdAt) {
                todos = todos.filter(todo => todo.createdAt < filterBy.createdAt)
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }
            if (filterBy.isDone !== undefined) {
                console.log('11', 11)
                todos = todos.filter(todo => todo.isDone === filterBy.isDone)
            }
            // console.log('todoAfterFilter', todos)
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

function getTotalCount() {
    return query()
        .then(todos => todos.length)
}

function getDoneCount() {
    return query({ isDone: true })
        .then(todos => todos.length)
}


function getDefaultFilter() {
    return {
        txt: '',
        isDone: undefined,
        createdAt: Date.now()
    }
}

// const todo = { _id, txt, isDone, createdAt }
_createTodos()
function _createTodos() {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!todos || !todos.length) {
        todos = [
            { _id: 1, txt: "Buy groceries", isDone: false, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 2, txt: "Finish project proposal", isDone: false, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 3, txt: "Call mom", isDone: true, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 4, txt: "Go for a run", isDone: false, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) },
            { _id: 5, txt: "Read book chapter", isDone: true, createdAt: getRandomDate(new Date(2022, 0, 1), new Date()) }
        ]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).valueOf()
}