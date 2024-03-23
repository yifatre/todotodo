const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { logout } from "../store/actions/user.action.js"
import { LoginSignUp } from "./LoginSignup.jsx"



export function AppHeader() {
    const dispatch = useDispatch()
    // const todosCount = useSelector(storeState => ({ total: storeState.todos.total, done: storeState.todos.done }))
    const user = useSelector(storeState => storeState.loggedInUser)

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
            {/* <div className="progress" style={{ width: '6rem' }}>
                a
                <div className="done" style={{ width: `${todosCount.done / todosCount.total * 100}%` }}>b</div>
            </div> */}
            <button onClick={onLogout}>Logout</button>
        </section> : <LoginSignUp />
        }
    </header >
}