import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import AdmHeader from '../../components/admin/admheader'


const Costumers = () => {
    const role = useSelector(state => state.auth.role)
    const [data, setdata] = useState([])
    const [history, sethistory] = useState([])

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        axios.get('http://localhost:8000/admin/request')
            .then(res => {
                setdata(res.data)
                axios.get('http://localhost:8000/admin/history')
                    .then(res => {
                        sethistory(res.data)
                    })
            })
    }

    const accept = (paket) => {
        // console.log(paket)

        var today = new Date();
        var start = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var date = today.getDate()
        var month = (today.getMonth() + 1)
        var year = today.getFullYear()
        var end = date + '-' + month + '-' + year


        if (paket === 1) {
            date = (today.getDate() + 7)
            end = year + '-' + month + '-' + date
        }

        if (paket === 2) {
            month = (today.getMonth() + 1)
            end = year + '-' + month + '-' + date

        }

        if (paket === 3) {
            year = (today.getFullYear() + 1)
            end = year + '-' + month + '-' + date

        }

        console.log(start)

        axios.post('http://localhost:8000/admin/approve', {
            users_id: data.map(v => v.users_id),
            start_time: start,
            end_time: end
        })
            .then(
                alert('DONE')
            )
        getData()

    }


    const render = () => {
        if (isNaN(data)) {
            return data.map(v => {
                return (

                    <tr key={v.id}>
                        <th scope="row">{v.id}</th>
                        <td>{v.users_id}</td>
                        <td>{v.paket === 1 ? 'Weekly' : null}{v.paket === 2 ? 'Monthly' : null}{v.paket === 3 ? 'Yearly' : null}</td>
                        <td>{v.amount}</td>
                        <td>{v.status === 0 ? 'Users' : 'Premium'}</td>
                        <td>
                            <img style={{ width: '45px' }} src={v.bukti_pembayaran} />
                        </td>
                        <td>
                            <button
                                className='btn btn-outline-warning'
                                onClick={() => accept(v.paket)}>
                                Accept
                        </button>
                        </td>
                    </tr>

                )
            })
        } else {
            return (
                <tr>
                    <td className="text=center">Not Found</td>
                </tr>
            )
        }
    }

    const renderHistory = () => {
        if (isNaN(history)) {
            return history.map(v => {
                return (

                    <tr key={v.id}>
                        <th scope="row">{v.id}</th>
                        <td>{v.users_id}</td>
                        <td>{v.paket === 1 ? 'Weekly' : null}{v.paket === 2 ? 'Monthly' : null}{v.paket === 3 ? 'Yearly' : null}</td>
                        <td>{v.amount}</td>
                        <td>{v.status === 0 ? 'Users' : 'Premium'}</td>
                        <td>
                            <img style={{ width: '45px' }} src={v.bukti_pembayaran} />
                        </td>

                    </tr>

                )
            })
        } else {
            return (
                <tr>
                    <td className="text=center">Not Found</td>
                </tr>
            )
        }
    }

    if (role === 'admin') {
        return (
            <div>
                <AdmHeader />
                <div className='container'>
                    {/* RENDERING LIST DATA */}
                    <h3 className='display-5 text-center mt-5'>Costumers Verification</h3>
                    <table className='table'>
                        <thead className="thead-dark text-center">
                            <tr>
                                <th scope="col">Subs ID</th>
                                <th scope="col">User ID</th>
                                <th scope="col">Paket</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Status</th>
                                <th scope="col">Bukti</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {render()}
                        </tbody>
                    </table>
                </div>

                {/* RENDERING HISTORY DATA */}

                <div className='container'>
                    <h3 className='display-5 text-center mt-5'>Verification History</h3>
                    <table className='table'>
                        <thead className="thead-dark text-center">
                            <tr>
                                <th scope="col">Subs ID</th>
                                <th scope="col">User ID</th>
                                <th scope="col">Paket</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Status</th>
                                <th scope="col">Bukti</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {renderHistory()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Costumers
