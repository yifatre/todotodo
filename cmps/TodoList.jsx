const { useState } = React

import { utilService } from "../services/util.service.js"
import { TodoEdit } from "./TodoEdit.jsx"
import { TodoPreview } from "./TodoPreview.jsx"

export function TodoList({ todos, onToggleDone, onRemoveTodo }) {
    const [isNewLine, setIsNewLine] = useState(false)
    function onAddLine() {
        setIsNewLine(true)
    }

    return <ul className="todo-list clean-list grid">
        {todos.map(todo => <li className="grid" key={todo._id}>
            <TodoPreview todo={todo} onToggleDone={onToggleDone} />
            <button onClick={() => onRemoveTodo(todo._id)}>✕</button>
        </li>)}
        {isNewLine && <li><TodoEdit setIsNewLine={setIsNewLine} /></li>}
        <li><button onClick={onAddLine}>+</button></li>
    </ul>
}