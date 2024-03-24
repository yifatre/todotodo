import { userService } from "../../services/user.service.js"

// USER
export const SET_USER = 'SET_USER'


const initialState = {
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) { // {type,  payload}
    switch (action.type) {
        case SET_USER: return { ...state, loggedInUser: action.user }



        default: return state
    }
}