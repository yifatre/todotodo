const { useState, useEffect } = React
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { logout } from "../store/actions/user.action.js"
import { LoginSignUp } from "./LoginSignup.jsx"



export function AppHeader() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [todoProgress, setTodoProgress] = useState({ done: 1, total: 3 })
    console.log('user', user)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logged out successfully')
            })
            .catch(err => {
                showErrorMsg('Oops try again')
            })
    }

    function getDoneTodosPercent() {
        const doneTodosCount = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)

        return (doneTodosCount / todos.length) * 100 || 0
    }

    return <header className="app-header grid">
        <div className="logo flex">
            <img src="../assets/img/logo.png" alt="" />
            <h1>Todotodo</h1>
        </div>
        {user ? <section className="user-hello grid">
            <span> {/*to={`/user/${user._id}`}*/}
                Hello&nbsp;
                <Link to="/user" >
                    {user.fullName}
                </Link>
            </span>
            {todos && <div className="progress">
                <div className="done" style={{width:`${getDoneTodosPercent()}%`}}></div>
                <span className="percents">{`${getDoneTodosPercent().toFixed(2)}%`}</span>
            </div>}
            <button className="btn-pill" onClick={onLogout}>Logout</button>
        </section> : <LoginSignUp />
        }
    </header >
}