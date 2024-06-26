import { AppHeader } from "./cmps/AppHeader.jsx"
import { TodoApp } from "./pages/TodoIndex.jsx"
import { TodoDetails } from "./cmps/TodoDetails.jsx"
import { TodoEdit } from "./cmps/TodoEdit.jsx"
import { TodoList } from "./cmps/TodoList.jsx"
import { store } from "./store/store.js"
import { UserProfile } from "./pages/UserProfile.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux



export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section className="app grid">
                        <AppHeader />
                        <main className='main-layout grid'>
                            <Routes>
                                <Route path="/user" element={<UserProfile />} />
                                <Route element={<TodoApp />} path="/" >
                                    <Route path="/todo" element={<TodoList />} />
                                    <Route path="/todo/:todoId" element={<TodoDetails />} />
                                    <Route path="/todo/edit/" element={<TodoEdit />} />
                                    <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                                </Route>
                            </Routes>
                        </main>
                    </section>
                </Router>
            </Provider>

        )
    }
}