import React, {Component} from 'react';
import {Col, Container, Navbar, NavbarBrand, Row} from 'reactstrap'
import AddAddress from './AddAddress'
import AddressesList from './AddressesList'

const Layouts = (props) => (
  <>
    <Navbar color="light" light expand="md" fixed='top' role='navigation'>
      <NavbarBrand href="/">Ethereum checker</NavbarBrand>
    </Navbar>
    <Container fluid>
      <Row>
        <Col className='main'>
          <AddAddress/>
          <AddressesList/>
        </Col>
      </Row>
    </Container>
  </>
)

export default Layouts