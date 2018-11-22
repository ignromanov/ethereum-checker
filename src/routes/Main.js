import React from 'react'
import AddAddress from './../components/AddAddress'
import AddressesList from './../components/AddressesList'

export const Main = (props) =>
  <>
    <AddAddress {...props}/>
    <AddressesList {...props}/>
  </>