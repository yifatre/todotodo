const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { logout } from "../store/actions/user.action.js"
import { LoginSignUp } from "./LoginSignup.jsx"



export function AppHeader() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const user = useSelector(storeState => storeState.loggedInUser)
    const [todoProgress, setTodoProgress] = useState(({ total: todos.length, done: todos.filter(todo => todo.isDone === true).length }))

    useEffect(() => {
        setTodoProgress(({ total: todos.length, done: todos.filter(todo => todo.isDone === true).length }))
    }, [todos])
    useEffect(() => {
        document.documentElement.style.setProperty('--done-count', `${todoProgress.done / todoProgress.total}fr`)
        document.documentElement.style.setProperty('--undone-count', `${1 - todoProgress.done / todoProgress.total}fr`)
    }, [todoProgress])

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logged out successfully')
            })
            .catch(err => {
                showErrorMsg('Oops try again')
            })
    }


    return <header className="app-header">
        Todotodo
        {user ? <section>
            <span> {/*to={`/user/${user._id}`}*/}
                Hello {user.fullName}
            </span>
            <div className="progress grid">
                <div className="done"></div>
                <div className="undone"></div>
            </div>
            <button onClick={onLogout}>Logout</button>
        </section> : <LoginSignUp />
        }
    </header >
}