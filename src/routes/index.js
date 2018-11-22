import React from 'react';
import {Main} from "./Main";
import {Detailed} from './Detailed'
import {Redirect, Route, Switch} from 'react-router-dom'

export default () =>
  <Switch>
    <Route exact path='/' component={Main}/>
    <Route exact path='/detailed/:address'
           render={({match}) => <Detailed address={match.params.address}/>}/>
    <Redirect path="*" to="/"/>
  </Switch>
