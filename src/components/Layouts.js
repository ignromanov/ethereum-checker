import React from 'react';
import {Col, Container, Navbar, NavbarBrand, Row} from 'reactstrap'
import AddAddress from './AddAddress'

export function Layouts(props) {
  return (
    <>
      <Navbar color="light" light expand="md" fixed='top' role='navigation'>
        <NavbarBrand href="/">Ethereum checker</NavbarBrand>
      </Navbar>
      <Container fluid>
        <Row>
          <Col className='main'>
            <AddAddress/>
            
          </Col>
        </Row>
      </Container>
    </>
  )
}