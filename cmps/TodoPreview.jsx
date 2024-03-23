import { utilService } from "../services/util.service.js"

const { Fragment } = React
export function TodoPreview({ todo, onToggleDone }) {

    function handleChange({ target }) {
        onToggleDone({ ...todo, isDone: target.checked })
    }

    return <Fragment>
        <input type="checkbox" name="isdone" id={todo._id} checked={todo.isDone} onChange={handleChange} />
        <label htmlFor={todo._id}><span className={todo.isDone ? 'done' : ''}>{todo.txt}</span>{utilService.getFormattedDate(todo.createdAt, true)}</label>
    </Fragment>
}