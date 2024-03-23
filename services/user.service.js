import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

const activities = { add: 'Added a todo', remove: 'Remove a todo', done: 'Marked a todo as done', undone: 'Marked a todo as undone' }

export const userService = {
    login,
    logout,
    signUp,
    getLoggedinUser,
    addActivity,
    getEmptyCredentials
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            // if (user && user.password !== password) return _setLoggedinUser(user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signUp({ username, password, fullName }) {
    const user = { username, password, fullName }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullName: user.fullName }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullName: ''
    }
}

function addActivity(type) {
    return { txt: activities[type], at: Date.now() }
}

// const user = {
//     _id: '',
//     username: 'peteron',
//     password: 'peter1',
//     fullName: 'Peter Pan',
//     prefs: {},
//     activities: [{ txt: 'Added a Todo', at: 1523873242735 }]
// }