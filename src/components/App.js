import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import axios from 'axios'


import { keepLogin, onLoadList } from '../actions/index'

import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'

import AdminPages from './admin/index'
import Upload from './admin/upload'
import ManageVideo from './admin/managevideo'
import MovieDetail from './moviedetail'
import List from './List'
import Genre from './genre'
import Director from './Director'
import Actor from './actor'
import searchResult from './searchresult'
import Costumers from './admin/costumers'

const App = () => {

  const [check, setCheck] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    let userStorage = JSON.parse(localStorage.getItem('userData'))

    if (userStorage) {
      //kirim ke redux 
      dispatch(keepLogin(userStorage))
    }
    setCheck(true)

  }, [dispatch])

  if (check) {
    return (

      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/admin' component={AdminPages} />
          <Route path='/upload' component={Upload} />
          <Route path='/costumers' component={Costumers} />
          <Route path='/manage' component={ManageVideo} />
          <Route exact path='/movie/:id' component={MovieDetail} />
          <Route path='/browse/my-list' component={List} />
          <Route path='/browse/genre/:id' component={Genre} />
          <Route path='/browse/director/:id' component={Director} />
          <Route path='/browse/cast/:id' component={Actor} />
          <Route path='/search' component={searchResult} />
        </Switch>
      </BrowserRouter>

    )
  } else {
    return null
  }
}

export default App;
