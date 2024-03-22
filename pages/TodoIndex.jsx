const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { loadTodos, saveTodo, removeTodo } from "../store/actions/todo.actions.js"

export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())

    useEffect(() => {
        console.log('filterBy', filterBy)
        loadTodos(filterBy)
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onToggleDone(todo) {
        console.log('todo', todo)
        saveTodo(todo)
            .then(savedTodo => showSuccessMsg(`Marked as ${saveTodo.isDone}`))
            .catch(err => {
                console.log('err', err)
                showErrorMsg(`Cannot mark as ${todo.isDone}`)
            })
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    return <section>
        <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <TodoList todos={todos} onToggleDone={onToggleDone} onRemoveTodo={onRemoveTodo} />
    </section>
}