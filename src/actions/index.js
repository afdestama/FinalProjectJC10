/*
ACTION CREATOR
*/


import axios from 'axios'

const urlApi = 'http://localhost:8000/'

export const onLoginUser = (email, password) => {
    return (dispatch) => {
        axios.get(urlApi + `auth/login`, {
            params: {
                email,
                password
            }
        }).then(res => {
            // console.log(res.data)
            if (res.data.status === '404') {
                console.log(res.data.message)
            } else if (res.data.status === '401') {
                console.log(res.data.message)
            } else {
                let { id, name, email, role } = res.data.result

                //Menyimpan data di local storage *ps: untuk sementara 
                localStorage.setItem('userData', JSON.stringify({ id, name, email, role }))

                //dispatch ke reducer
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            id,
                            name,
                            email,
                            role
                        }
                    }
                )
            }
        })
    }
}

export const keepLogin = (objUser) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            name: objUser.name,
            email: objUser.email,
            role: objUser.role
        }
    }
}

export const onLogOut = () => {
    localStorage.removeItem('userData')
    return {
        type: 'LOGOUT_SUCCESS',
    }
}



export const onSearch = (input) => {

    return {

        type: 'SEARCH_DONE',
        payload: {
            input: input
        }

    }
}
