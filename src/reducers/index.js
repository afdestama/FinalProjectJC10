import { combineReducers } from 'redux'

const init = {
    id: '',
    name: '',
    email: '',
    role: '',
}

const initSearch = {
    input: ''
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role
            }

        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                id: "",
                name: "",
                email: "",
                role: ""

            }

        default:
            return state

    }
}

const SearchReducer = (state = initSearch, action) => {
    switch (action.type) {
        case 'SEARCH_DONE':
            return {
                ...state,
                input: action.payload.input
            }

        default:
            return state
    }
}

const reducers = combineReducers(
    {
        auth: AuthReducer,
        search: SearchReducer
    }
)

export default reducers