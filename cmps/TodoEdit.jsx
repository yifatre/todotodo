const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { todoService } from "../services/todo.service.js"
import { loadTodos, saveTodo, removeTodo } from "../store/actions/todo.actions.js"

export function TodoEdit({ setIsNewLine }) {
    const { todoId } = useParams()
    const [todo, setTodo] = useState(todoService.getEmptyTodo())

    useEffect(() => {
        if (todoId)
            todoService.getById(todoId)
    }, [])

    // useEffect(() => {
    //     // console.log('todo', todo)
    // }, [todo])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'checkbox') value = target.checked
        setTodo(prevTodo => ({ ...prevTodo, [field]: value }))
    }

    function onSave(ev) {
        ev.preventDefault()
        console.log('todo from save', todo)
        saveTodo(todo)
        setIsNewLine(false)
    }


    return <form className="todo-edit" onSubmit={onSave}>
        <input type="checkbox" name="isDone" id="" checked={todo.isDone} onChange={handleChange} />
        <input type="text" name="txt" placeholder="To do..." value={todo.txt} onChange={handleChange} />
        <button>Save</button>
    </form>
}