const { useState, useEffect, useRef } = React

import { utilService } from "../services/util.service.js"


export function TodoFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'date') value = new Date(value).valueOf()
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onChangeIsDone(changeTo) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, isDone: changeTo }))
    }

    return <section className="todo-filter grid">
        <label htmlFor="txt">Search:</label>
        <input type="search" name="txt" id="txt" value={filterByToEdit.txt} onChange={handleChange} placeholder="Enter text to search here" />

        Created before: <input type="date" name="createdAt" id="createdAt" value={utilService.getFormattedDate(filterByToEdit.createdAt)} onChange={handleChange} />
        <div className="flex">
            Show:
            <button onClick={() => onChangeIsDone(true)} className={`btn-pill ${filterByToEdit.isDone ? 'selected' : ''}`} >Done</button>
            <button onClick={() => onChangeIsDone(false)} className={`btn-pill ${filterByToEdit.isDone === false ? 'selected' : ''}`} >Undone</button>
            <button onClick={() => onChangeIsDone(undefined)} className={`btn-pill ${filterByToEdit.isDone === undefined ? 'selected' : ''}`} >All</button>
        </div>
    </section>
}