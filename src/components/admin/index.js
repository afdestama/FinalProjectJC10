import React from 'react'
import { useSelector } from 'react-redux'

import AdmHeader from './admheader'

const AdminPages = () => {

    const role = useSelector(state => state.auth.role)
    const adminName = useSelector(state => state.auth.name)

    if (role === 'admin') {
        return (
            <div>
                <AdmHeader />
            </div>
        )
    } else {
        return (
            <div className='text-center'>
                <h5>Hayoo mau ngapain ? Login dulu min 😊</h5>
            </div>
        )

    }

}

export default AdminPages
