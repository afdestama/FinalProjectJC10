import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Helmet } from 'react-helmet';



import '../assets/subscribe.css'

const Subscribe = () => {

    const id = useSelector(state => state.auth.id)
    const name = useSelector(state => state.auth.name)
    const [select, setSelect] = useState({
        namaPaket: '',
        haritahun: '',
        paket: '',
        amount: ''
    })
    const [bukti, setBukti] = useState('')
    const [toggle, setToggle] = useState(false)

    function Select1() {
        setSelect({ ...select, namaPaket: 'Weekly', paket: 1, amount: 29000, haritahun: 'week' })
        setToggle(true)
    }

    function Select2() {
        setSelect({ ...select, namaPaket: 'Monthly', paket: 2, amount: 49000, haritahun: 'month' })
        setToggle(true)
    }

    function Select3() {
        setSelect({ ...select, namaPaket: 'Yearly', paket: 3, amount: 499000, haritahun: 'year' })
        setToggle(true)
    }

    function SelectCancel() {
        setSelect({ ...select, namaPaket: '', paket: '', amount: '', haritahun: '' })
        setToggle(false)
    }

    const confirm = (e) => {
        e.preventDefault()
        var fd = new FormData()
        fd.append('bukti', bukti, bukti.name)
        fd.append('id', id)
        fd.append('paket', select.paket)
        fd.append('amount', select.amount)

        axios.post('http://localhost:8000/admin/subscribe', fd)
            .then(res => {
                console.log(res.data.status)
                alert(res.data.status);
            })
            .catch(err => {
                console.log(err)
            })

        for (var pair of fd.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }

    const detail = () => {
        if (toggle) {
            return (
                <div>
                    <Helmet>
                        <style>
                            {`
                body {
                    background-color: #141414;
        
                }
                `}
                        </style>
                    </Helmet>

                    <div className="pricing">
                        <div className="container">
                            <h1 className="text-center text-white mt-5 mb-5">Choose the plan that’s right for you</h1>
                            <div className="row">
                                {/*< !--Free Tier -->*/}
                                <div className="col-lg-4">
                                    <div className="card mb-5 mb-lg-0">
                                        <div className="card-body">
                                            <h5 className="card-title text-muted text-uppercase text-center">{select.namaPaket}</h5>
                                            <h6 className="card-price text-center">Rp {select.amount}<span className="period">/{select.haritahun}</span></h6>
                                            <hr />
                                            <ul className="fa-ul">
                                                <li><span className="fa-li"><i className="fas fa-check"></i></span>HD available</li>
                                                <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited movies and TV shows</li>
                                                <li><span className="fa-li"><i className="fas fa-check"></i></span>Watch on your laptop, TV, phone and tablet</li>
                                                <li><span className="fa-li"><i className="fas fa-check"></i></span>Cancel anytime</li>
                                            </ul>
                                            <button style={{ backgroundColor: '#ED690A', color: 'white' }} className="btn btn-block text-uppercase" onClick={() => SelectCancel()}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                {/*< !--Plus Tier -->*/}
                                <div className="col-lg-8">
                                    <div className="card mb-5 mb-lg-0" style={{ height: 417 }}>
                                        <div className="card-body mt-1">
                                            <h5 className="text-center">Terima Kasih, Silahkan Transfer ke Rekening </h5>
                                            <ul className="mt-3">
                                                <li style={{ listStyleType: 'none' }}>
                                                    <img src="https://upload.wikimedia.org/wikipedia/id/thumb/e/e0/BCA_logo.svg/472px-BCA_logo.svg.png" alt="" width='100' height='20' /> BCA
                                                </li>
                                                <li style={{ listStyleType: 'none' }}>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_BRI.png" alt="" width='100' height='20' /> BRI
                                                </li>
                                                <li style={{ listStyleType: 'none' }}>
                                                    <img src="https://3.bp.blogspot.com/-e1fOq9uUk8M/V15O0WHiIMI/AAAAAAAAAJA/IpxPlLevxLsjisy2I625Yvz-eNzgc6xfgCKgB/s1600/Logo%2BBank%2BBNI%2BPNG.png" alt="" width='100' height='20' /> BNI
                                                </li>
                                                <li style={{ listStyleType: 'none' }}>
                                                    <img src="https://www.bankmandiri.co.id/image/layout_set_logo?img_id=31567&t=1564908593501" alt="" width='100' height='20' /> Mandiri
                                                </li>
                                            </ul>
                                            <hr />
                                            <div className="col-sm-5 ml-4">

                                                <h6>Upload Bukti Transaksi : </h6>
                                                <input type="file" placeholder='Upload poster' className="form-control" onChange={e => setBukti(e.target.files[0])} required autoFocus />

                                            </div>

                                            <button style={{ backgroundColor: '#ED690A', color: 'white', marginTop: '22px' }} className="btn btn-block text-uppercase" onClick={confirm}>Confirm Payment</button>

                                        </div>
                                    </div>
                                </div>
                                {/*< !--Pro Tier -->*/}

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    console.log(select)



    if (!toggle) {
        return (
            <div>
                <Helmet>
                    <style>
                        {`
                body {
                    background-color: #141414;
                }
                `}
                    </style>
                </Helmet>
                <div className="pricing">
                    <div className="container">
                        <h1 className="text-center text-white mt-5 mb-5">Choose the plan that’s right for you</h1>
                        <div className="row">
                            {/*< !--Free Tier -->*/}
                            <div className="col-lg-4">
                                <div className="card mb-5 mb-lg-0">
                                    <div className="card-body">
                                        <h5 className="card-title text-muted text-uppercase text-center">Weekly</h5>
                                        <h6 className="card-price text-center">Rp 29.000<span className="period">/week</span></h6>
                                        <hr />
                                        <ul className="fa-ul">
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>HD available</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited movies and TV shows</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Watch on your laptop, TV, phone and tablet</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Cancel anytime</li>
                                        </ul>
                                        <button style={{ backgroundColor: '#ED690A', color: 'white' }} className="btn btn-block text-uppercase" onClick={Select1}>Select</button>
                                    </div>
                                </div>
                            </div>
                            {/*< !--Plus Tier -->*/}
                            <div className="col-lg-4">
                                <div className="card mb-5 mb-lg-0">
                                    <div className="card-body">
                                        <h5 className="card-title text-muted text-uppercase text-center">Monthly</h5>
                                        <h6 className="card-price text-center">Rp 49.000<span className="period">/month</span></h6>
                                        <hr />
                                        <ul className="fa-ul">
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>HD available</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited movies and TV shows</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Watch on your laptop, TV, phone and tablet</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Cancel anytime</li>
                                        </ul>
                                        <button style={{ backgroundColor: '#ED690A', color: 'white' }} className="btn btn-block text-uppercase" onClick={Select2}>Select</button>

                                    </div>
                                </div>
                            </div>
                            {/*< !--Pro Tier -->*/}
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-muted text-uppercase text-center">Yearly</h5>
                                        <h6 className="card-price text-center">Rp 499.000<span className="period">/year</span></h6>
                                        <hr />
                                        <ul className="fa-ul">
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>HD available</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited movies and TV shows</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Watch on your laptop, TV, phone and tablet</li>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>Cancel anytime</li>
                                        </ul>
                                        <button style={{ backgroundColor: '#ED690A', color: 'white' }} className="btn btn-block text-uppercase" onClick={Select3}>Select</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {detail()}
            </div>
        )
    }
}


export default Subscribe
